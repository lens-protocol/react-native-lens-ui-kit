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
  ProfileFeedDocument,
  ProfileDocument,
  PaginatedResultInfo,
  PublicationTypes,
  PublicationSortCriteria,
  PaginatedFeedResult,
  FeedItemRoot
} from '../graphql/generated'
import { LensContext } from '../context'

export function Feed({
  profileId,
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
  onEndReachedThreshold = .025,
  onCollectPress = publication => console.log({ publication }),
  onCommentPress = publication => console.log({ publication }),
  onMirrorPress = publication => console.log({ publication }),
  onLikePress = publication => console.log({ publication }),
  onProfileImagePress = publication => console.log({ publication }),
  publicationStyles,
  styles = baseStyles,
}: {
  profileId?: string,
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
  const [publications, setPublications] = useState<ExtendedPublication[] | FeedItemRoot[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginatedResultInfo | undefined>()
  const [loading, setLoading] = useState(false)
  const [canPaginate, setCanPaginate] = useState<Boolean>(true)

  const { environment } = useContext<LensContextType>(LensContext)
  const client = createClient(environment)
  
  useEffect(() => {
    fetchPublications()
  }, [])

  async function fetchResponse(cursor?: string) {
    if (profileId) {
      try {
        let { data } = await client.query(ProfileFeedDocument, {
          request: {
            cursor,
            profileId,
            limit: 50
          }
        }).toPromise()
        if (data) {
          const { feed } = data
          let {
            pageInfo,
            items
          } = feed as PaginatedFeedResult
          const rootItems = items.map(item => item.root)
          return {
            pageInfo, items: rootItems
          }
        }
      } catch (err) {
        console.log('error fetching feed... ', err)
      }
    }
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
      let data
      let id
      if (publicationsQuery.handle) {
        let handle = publicationsQuery.handle
        if (!handle.includes('.lens')) {
          handle = handle + '.lens'
        }
        const { data: profileData } = await client.query(ProfileDocument, {
          request: { handle }
        }).toPromise()
        id = profileData?.profile?.id
      } else {
        id = publicationsQuery.profileId
      }
      let { data: publicationsData } = await client.query(PublicationsDocument, {
        request: {
          profileId: id,
          cursor,
          publicationTypes: publicationsQuery.publicationTypes
        }
      }).toPromise()
      data = publicationsData
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

  let initialNumToRender = 25
  if (publicationsQuery) {
    initialNumToRender = publicationsQuery.limit || 25
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
        initialNumToRender={initialNumToRender}
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
