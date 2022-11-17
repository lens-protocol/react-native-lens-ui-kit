import  { useState, useEffect } from 'react'
import {
  View, FlatList, Text, StyleSheet, ActivityIndicator
} from 'react-native'
import { client, getPublications, explorePublications } from '../api'
import { configureIPFSURL } from '../utils'
import { Publication } from './Publication'

export function Feed({
  query = {
    name: "explorePublications",
    publicationTypes: ["POST", "COMMENT", "MIRROR"],
    sortCriteria: "LATEST",
    limit: 25
  },
  ListHeaderComponent = null,
  ListFooterComponent = null,
  feed = null,
  signedInUser = null,
  onCollectPress = () => {},
  onCommentPress = () => {},
  onMirrorPress= () => {},
  onLikePress = () => {},
  hideLikes = false,
  hideComments = false,
  hideMirrors = false,
  hideCollects = false,
  infiniteScroll = true,
  onEndReachedThreshold = .6,
  onProfileImagePress,
}) {
  const [publications, setPublications] = useState([])
  const [paginationInfo, setPaginationInfo] = useState()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchPublications()
  }, [])

  async function fetchResponse(cursor = null) {
    if (query.name === 'explorePublications') {
      try {
        let { data: { explorePublications: { pageInfo, items }}} = await client.query(explorePublications, {
          cursor,
          publicationTypes: query.publicationTypes,
          sortCriteria: query.sortCriteria,
          limit: query.limit
        }).toPromise()
        return {
          pageInfo, items
        }
      } catch (err) {
        console.log('Error fetching explorePublications: ', err)
      }
    }
    if (query.name === 'getPublications') {
      console.log({ query })
      let { data: { publications: { pageInfo, items }}} = await client.query(getPublications, {
        profileId: query.profileId,
        cursor,
        publicationTypes: query.publicationTypes
      }).toPromise()
      return {
        pageInfo, items
      }
    }
    if (query.name === 'getComments') {
      try {
        let { data: { publications: { pageInfo, items }}} = await client.query(getPublications, {
          commentsOf: query.publicationId,
          cursor
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
     console.log('Error fetching next items: ', err)
    }
  }

  async function fetchPublications(cursor = null) {
    try {
      if (
        !feed ||
        feed && publications.length
      ) {
        setLoading(true)
        let {
          items, pageInfo
        } = await fetchResponse(cursor)   
        setPaginationInfo(pageInfo)
        items = items.filter((item) => {
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

  function renderItem({ item, index }) {
    return (
      <Publication
        key={index}
        publication={item}
        signedInUser={signedInUser}
        onCollectPress={onCollectPress}
        onCommentPress={onCommentPress}
        onMirrorPress={onMirrorPress}
        onLikePress={onLikePress}
        hideLike={hideLikes}
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

const styles = StyleSheet.create({
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
