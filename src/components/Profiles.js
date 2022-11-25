import { useState, useEffect } from 'react'
import {
  FlatList, ActivityIndicator, StyleSheet
} from 'react-native'
import { client, exploreProfiles, getFollowing } from '../api'
import {
  ProfileListItem
} from './'

export function Profiles({
  onFollowPress = () => null,
  onProfilePress = () => null,
  profileData = null,
  onEndReachedThreshold = .7,
  infiniteScroll = true,
  query = {
    name: 'exploreProfiles',
    sortCriteria: 'MOST_FOLLOWERS',
    limit: 25
  }
}) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [paginationInfo, setPaginationInfo] = useState()

  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchResponse(cursor = null) {
    if (query.name === 'exploreProfiles') {
      let { data: { exploreProfiles: { pageInfo, items } }} = await client.query(exploreProfiles, {
        sortCriteria: query.sortCriteria,
        cursor,
        limit: query.limit
      }).toPromise()
      return {
        pageInfo, items,
      }
    }
    if (query.name === 'getFollowing') {
      console.log("query: ", JSON.stringify(query))
      let { data: { following: { pageInfo, items } }} = await client.query(getFollowing, {
        address: query.ethereumAddress,
        cursor,
        limit: query.limit || 25
      }).toPromise()
      items = items.map(item => {
        item.profile.isFollowing = true
        return item.profile
      })
      return {
        pageInfo, items,
      }
    }
  }

  async function fetchProfiles(cursor=null) {
    if (profileData) {
      setProfiles(profileData)
      return
    }
    try {
      if (
        !profileData ||
        profileData && profiles.length
      ) {
        setLoading(true)
        let {
          items, pageInfo
        } = await fetchResponse(cursor)
        setPaginationInfo(pageInfo)
        items = await Promise.all(items.map(profile => {
          let { picture, coverPicture } = profile
          if (picture && picture.original) {
            if (picture.original.url.startsWith('ipfs://')) {
              let result = picture.original.url.substring(7, picture.original.url.length)
              profile.picture.original.url = `https://lens.infura-ipfs.io/ipfs/${result}`
            }
          } else {
            profile.missingAvatar = true
          }
          if (coverPicture && coverPicture.original.url) {
            if (coverPicture.original.url.startsWith('ipfs://')) {
              let hash = coverPicture.original.url.substring(7, coverPicture.original.url.length)
              coverPicture.original.url = `https://lens.infura-ipfs.io/ipfs/${hash}`
            }
          } else {
            profile.missingCover = true
          }
          return profile
          })
        )
        setLoading(false)
        setProfiles([...profiles, ...items])
      } else {
        setProfiles(profileData)
      }
    } catch (err) {
      console.log("Error fetching profiles... ", err)
    }
  }

  function onEndReached() {
    if (infiniteScroll) {
      fetchNextItems()
    }
  }

  async function fetchNextItems() {
    try {
     const { next } = paginationInfo
     fetchProfiles(next)
    } catch (err) {
     console.log('Error fetching next items: ', err)
    }
  }

  function renderItem({ item, index }) {
    return (
      <ProfileListItem
        key={index}
        onProfilePress={onProfilePress}
        profile={item}
        onFollowPress={onFollowPress}
        isFollowing={item.isFollowing}
      />
    )
  }

  return (
    <FlatList
      renderItem={renderItem}
      data={profiles}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            style={styles.loadingIndicatorStyle}
          />
        ) : null
      }
    />
  )
}

const styles = StyleSheet.create({
  loadingIndicatorStyle: {
    marginVertical: 20
  }
})