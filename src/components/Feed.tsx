import { useState, useEffect, useContext } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { createClient } from '../api'
import {
  ProfileMetadata,
  PublicationsQuery,
  ExtendedPublication,
  PublicationStyles,
  FeedStyles,
  PublicationFetchResults,
  LensContextType
} from '../types'
import {
  configureMirrorAndIpfsUrl,
  filterMimeTypes
} from '../utils'
import { Publication as PublicationComponent } from './'
import {
  ExplorePublicationsDocument,
  PublicationsDocument,
  PaginatedResultInfo,
  PublicationTypes,
  PublicationSortCriteria,
} from '../graphql/generated'
import { LensContext } from '../context'

export function Feed({
  publicationsQuery = {
    name: "explorePublications",
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Comment, PublicationTypes.Mirror],
    publicationSortCriteria: PublicationSortCriteria.Latest,
    limit: 20
  },
  ListHeaderComponent,
  ListFooterComponent,
  feed,
  signedInUser,
  hideLikes = false,
  hideComments = false,
  hideMirrors = false,
  hideCollects = false,
  iconColor,
  infiniteScroll = true,
  onEndReachedThreshold = .65,
  onCollectPress = publication => console.log({ publication }),
  onCommentPress = publication => console.log({ publication }),
  onMirrorPress = publication => console.log({ publication }),
  onLikePress = publication => console.log({ publication }),
  onProfileImagePress = publication => console.log({ publication }),
  publicationStyles,
  styles = baseStyles,
}: {
  publicationsQuery?: PublicationsQuery,
  ListHeaderComponent?: React.FC,
  ListFooterComponent?: React.FC,
  signedInUser?: ProfileMetadata
  feed?: ExtendedPublication[],
  onCollectPress?: (publication: ExtendedPublication) => void,
  onCommentPress?: (publication: ExtendedPublication) => void,
  onMirrorPress?: (publication: ExtendedPublication) => void,
  onLikePress?: (publication: ExtendedPublication) => void,
  onProfileImagePress?: (publication: ExtendedPublication) => void,
  hideLikes?: boolean,
  hideComments?: boolean,
  hideMirrors?: boolean,
  hideCollects?: boolean,
  iconColor?: string,
  infiniteScroll?: boolean,
  onEndReachedThreshold?: number,
  styles?: FeedStyles,
  publicationStyles?: PublicationStyles
}) {
  const [publications, setPublications] = useState<ExtendedPublication[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginatedResultInfo | undefined>()
  const [loading, setLoading] = useState(false)
  const [canPaginate, setCanPaginate] = useState<Boolean>(true)

  const { environment } = useContext<LensContextType>(LensContext)
  const client = createClient(environment)
  
  useEffect(() => {
    fetchPublications()
  }, [])

  async function fetchResponse(cursor?: string) {
    if (publicationsQuery.name === 'explorePublications') {
      try {
        let { data } = await client.query(ExplorePublicationsDocument, {
          request: {
            cursor,
            publicationTypes: publicationsQuery.publicationTypes,
            sortCriteria: publicationsQuery.publicationSortCriteria || PublicationSortCriteria.Latest,
            limit: publicationsQuery.limit
          }
        }).toPromise()
        if (data) {
          const { explorePublications } = data
          let {
            pageInfo,
            items
          } = explorePublications
          return {
            pageInfo, items
          } as PublicationFetchResults
        }
      } catch (err) {
        console.log('Error fetching explorePublications: ', err)
      }
    }
    if (publicationsQuery.name === 'getPublications') {
      let { data } = await client.query(PublicationsDocument, {
        request: {
          profileId: publicationsQuery.profileId,
          cursor,
          publicationTypes: publicationsQuery.publicationTypes
        }
      }).toPromise()
      console.log('data: ', data)

      if (data) {
        const { publications: { pageInfo, items }} = data
        return {
          pageInfo, items
        } as PublicationFetchResults
      }
    }
    if (publicationsQuery.name === 'getComments') {
      try {
        let { data } = await client.query(PublicationsDocument, {
          request: {
            commentsOf: publicationsQuery.publicationId,
            cursor
          }
        }).toPromise()
        if (data) {
          const { publications: { pageInfo, items }} = data
          return {
            pageInfo, items
          } as PublicationFetchResults
        }
      } catch (err) {
        console.log('error fetching comments...', err)
      }
    }
    throw Error('No query defined...')
  }

  async function fetchNextItems() {
    try {
     if (canPaginate && paginationInfo) {
       const { next } = paginationInfo
       if (!next) {
        setCanPaginate(false)
       } else {
        fetchPublications(next)
       }
     }
    } catch (err) {
     console.log('Error fetching next items:', err)
    }
  }

  async function fetchPublications(cursor?: string) {
    try {
      if (
        !feed ||
        feed && cursor
      ) {
        setLoading(true)
        let {
          items,
          pageInfo
        } = await fetchResponse(cursor)
        setPaginationInfo(pageInfo)
        items = filterMimeTypes(items)
        items = configureMirrorAndIpfsUrl(items)
        if (cursor) {
          let newData = [...publications, ...items]
          if (publicationsQuery.publicationSortCriteria === "LATEST") {
            newData = [...new Map(newData.map(m => [m.id, m])).values()]
          }
          setPublications(newData)
        } else {
          setPublications(items)
        }
        setLoading(false)
      } else {
        setPublications(feed)
      }
    } catch (err) {
      console.log('error fetching publications...', err)
    }
  }

  function onEndReached() {
    if (infiniteScroll) {
      fetchNextItems()
    }
  }

  function renderItem({
    item, index
  } : {
    item: ExtendedPublication,
    index: number
  }) {
    return (
      <PublicationComponent
        styles={publicationStyles}
        key={index}
        publication={item}
        signedInUser={signedInUser}
        onCollectPress={onCollectPress}
        onCommentPress={onCommentPress}
        onMirrorPress={onMirrorPress}
        onLikePress={onLikePress}
        hideLikes={hideLikes}
        hideComments={hideComments}
        hideMirrors={hideMirrors}
        hideCollects={hideCollects}
        onProfileImagePress={onProfileImagePress}
        iconColor={iconColor}
      />
    )
  }
  return (
    <View style={styles.container}>
      {
        !loading &&
        publications.length === Number(0) &&
        publicationsQuery.name === 'getComments' && (
          <Text style={styles.noCommentsMessage}>No comments...</Text>
        )
      }
      <FlatList
        data={publications}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        onEndReached={onEndReached}
        keyExtractor={(_, index) => String(index)}
        onEndReachedThreshold={onEndReachedThreshold}
        ListFooterComponent={
          ListFooterComponent ?
          ListFooterComponent :
          loading ? (
            <ActivityIndicator
              style={styles.loadingIndicatorStyle}
            />
          ) : null
        }
      />
    </View>
  )
}

let baseStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingIndicatorStyle : {
    marginVertical: 20
  },
  noCommentsMessage: {
    margin: 20,
    fontSize: 14,
    fontWeight: '500'
  }
})
