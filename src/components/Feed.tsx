import { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { client } from '../api'
import { ProfileMetadata, FeedQuery, ExtendedPublication } from '../types'
import { configureIPFSURL } from '../utils'
import { Publication } from './Publication'
import {
  ExplorePublicationsDocument,
  PublicationsDocument,
  PaginatedResultInfo,
  PublicationTypes,
  PublicationSortCriteria
} from '../graphql/generated'

export function Feed({
  query = {
    name: "explorePublications",
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Comment, PublicationTypes.Mirror],
    sortCriteria: PublicationSortCriteria.Latest,
    limit: 20
  },
  ListHeaderComponent = null,
  ListFooterComponent = null,
  feed = null,
  signedInUser = null,
  hideLikes = false,
  hideComments = false,
  hideMirrors = false,
  hideCollects = false,
  infiniteScroll = true,
  onEndReachedThreshold = .65,
  onCollectPress = publication => console.log({ publication }),
  onCommentPress = publication => console.log({ publication }),
  onMirrorPress = publication => console.log({ publication }),
  onLikePress = publication => console.log({ publication }),
  onProfileImagePress = publication => console.log({ publication }),
  styles = baseStyles,
}: {
  query: FeedQuery,
  ListHeaderComponent: React.FC,
  ListFooterComponent: React.FC,
  signedInUser?: ProfileMetadata
  feed: [],
  onCollectPress: any,
  onCommentPress: any,
  onMirrorPress: any,
  onLikePress: any,
  hideLikes: any,
  onProfileImagePress: any,
  hideComments: boolean,
  hideMirrors: boolean,
  hideCollects: boolean,
  infiniteScroll: boolean,
  onEndReachedThreshold: number,
  styles?: {
    container: {},
    loadingIndicatorStyle: {},
    noCommentsMessage: {}
  }
}) {
  const [publications, setPublications] = useState<any[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginatedResultInfo | undefined>()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchPublications()
  }, [])

  async function fetchResponse(cursor: string = null) {
    if (query.name === 'explorePublications') {
      try {
        let { data: { explorePublications: { pageInfo, items }}} = await client.query(ExplorePublicationsDocument, {
          request: {
            cursor,
            publicationTypes: query.publicationTypes,
            sortCriteria: query.sortCriteria,
            limit: query.limit
          }
        }).toPromise()
        return {
          pageInfo, items
        }
      } catch (err) {
        console.log('Error fetching explorePublications: ', err)
      }
    }
    if (query.name === 'getPublications') {
      let { data: { publications: { pageInfo, items }}} = await client.query(PublicationsDocument, {
        request: {
          profileId: query.profileId,
          cursor,
          publicationTypes: query.publicationTypes
        }
      }).toPromise()
      return {
        pageInfo, items
      }
    }
    if (query.name === 'getComments') {
      try {
        let { data: { publications: { pageInfo, items }}} = await client.query(PublicationsDocument, {
          request: {
            commentsOf: query.publicationId,
            cursor
          }
        }).toPromise()
        return {
          pageInfo, items
        }
      } catch (err) {
        console.log('error fetching comments...', err)
      }
    }
  }

  async function fetchNextItems() {
    try {
     const { next } = paginationInfo
     fetchPublications(next)
    } catch (err) {
     console.log('Error fetching next items:', err)
    }
  }

  async function fetchPublications(cursor: string = null) {
    try {
      if (
        !feed ||
        feed && cursor
      ) {
        setLoading(true)
        let {
          items, pageInfo
        } : {
          items: any[]
          pageInfo: PaginatedResultInfo
        } = await fetchResponse(cursor)   
        setPaginationInfo(pageInfo)
        items = items.filter(item => {
          const { metadata: { media } } = item
          if (media.length) {
            if (media[0].original) {
              if (media[0].original.mimeType === 'image/jpeg') return true
              if (media[0].original.mimeType === 'image/png') return true
              return false
            }
          } else {
            return true
          }
        })
        items = items.map(item => {
          if (item.profileSet) return item
          let { profile } = item
          if (item.mirrorOf) {
            item.originalProfile = profile
            item.stats = item.mirrorOf.stats
            profile = item.mirrorOf.profile
          }
          if (profile.picture && profile.picture.original) {
            const url = configureIPFSURL(profile.picture.original.url)
            if (url) {
              profile.picture.original.url = url
            } else {
              profile.missingAvatar = true
            }
          } else {
            profile.missingAvatar = true
          }

          item.profile = profile
          item.profileSet = true
          return item          
        })

        if (cursor) {
          let newData = [...publications, ...items]
          if (query.sortCriteria === "LATEST") {
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
      <Publication
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
      />
    )
  }
  return (
    <View style={styles.container}>
      {
        !loading &&
        publications.length === Number(0) &&
        query.name === 'getComments' && (
          <Text style={styles.noCommentsMessage}>No comments...</Text>
        )
      }
      <FlatList
        data={publications}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        onEndReached={onEndReached}
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
