import { useState, useEffect, useContext } from 'react'
import {
  FlatList, ActivityIndicator, StyleSheet
} from 'react-native'
import { createClient } from '../api'
import { ProfilesQuery, ExtendedProfile, LensContextType } from '../types'
import {
  Profile,
  ExploreProfilesDocument,
  FollowingDocument,
  ProfileSortCriteria,
  PaginatedResultInfo,
  DoesFollowDocument
} from '../graphql/generated'
import {
  ProfileListItem
} from './'
import { LensContext } from '../context'

export function Profiles({
  onFollowPress  = profile => console.log({ profile }),
  onProfilePress = profile => console.log({ profile }),
  profileData = null,
  onEndReachedThreshold = .7,
  infiniteScroll = true,
  signedInUserAddress = null,
  query = {
    name: 'exploreProfiles',
    sortCriteria: ProfileSortCriteria.MostFollowers,
    limit: 25
  }
} : {
  onFollowPress: (profile: ExtendedProfile, profiles: ExtendedProfile[]) => void,
  onProfilePress: (profile: ExtendedProfile) => void,
  profileData: ExtendedProfile[] | null,
  onEndReachedThreshold: number,
  infiniteScroll: boolean,
  query: ProfilesQuery,
  signedInUserAddress?: string | null
}) {
  const [profiles, setProfiles] = useState<ExtendedProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [paginationInfo, setPaginationInfo] = useState<PaginatedResultInfo | undefined>()
  const context = useContext(LensContext)
  const { environment } = context as { environment: LensContextType['environment'] } || 'mainnet'
  const client = createClient(environment)
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchResponse(cursor = null) {
    if (query.name === 'exploreProfiles') {
      try {
        let { data } = await client.query(ExploreProfilesDocument, {
          request: {
            sortCriteria: query.sortCriteria,
            cursor,
            limit: query.limit
          }
        }).toPromise()
        if (data && data.exploreProfiles) {
         let { exploreProfiles: { pageInfo, items } } = data
         if (signedInUserAddress) {
           const requestData = items.map(i => ({
             followerAddress: signedInUserAddress,
               profileId: i.id
             }))
             const response = await client.query(DoesFollowDocument, {
               request: {
                 followInfos: requestData
               }
             }).toPromise()
             items = items.map((item, index) => {
               item.isFollowing = response?.data?.doesFollow[index].follows || false
               return item
             })
          }
          return {
            pageInfo, items,
          }
      }
      } catch (err) {
        console.log('Error fetching profiles: ', err)
      }
    }
    if (query.name === 'getFollowing') {     
      let { data }  = await client.query(FollowingDocument, {
        request: {
          address: query.ethereumAddress,
          cursor,
          limit: query.limit || 25
        }
      }).toPromise()
      if (data) {
        let  { following } = data
        let { pageInfo, items } : {
          pageInfo: PaginatedResultInfo,
          items: any
        } = following
        if (signedInUserAddress) {
          const requestData = items.map((i: any) => ({
            followerAddress: signedInUserAddress,
            profileId: i.profile.id
          }))
          const response = await client.query(DoesFollowDocument, {
            request: {
              followInfos: requestData
            }
          }).toPromise()
          items = items.map((item: any, index: number) => {
            item.profile.isFollowing = response?.data?.doesFollow[index].follows
            return item.profile
          })
        } else {
          items = items.map((item: any) => {
            return item.profile
          })
        }
        return {
          pageInfo, items
        }
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
        } = await fetchResponse(cursor) as {
          items: ExtendedProfile[], pageInfo: PaginatedResultInfo
        }
        setPaginationInfo(pageInfo)
        items = await Promise.all(items.map(profile => {
          let { picture, coverPicture } = profile
          if (picture && picture.__typename === 'MediaSet') {
            if (picture.original) {
              if (picture.original.url.startsWith('ipfs://')) {
                let result = picture.original.url.substring(7, picture.original.url.length)
                picture.original.url = `https://lens.infura-ipfs.io/ipfs/${result}`
              }
            } else {
              profile.missingAvatar = true
            }
          }
          if (coverPicture && coverPicture.__typename === 'MediaSet') {
            if (coverPicture.original.url) {
              if (coverPicture.original.url.startsWith('ipfs://')) {
                let hash = coverPicture.original.url.substring(7, coverPicture.original.url.length)
                coverPicture.original.url = `https://lens.infura-ipfs.io/ipfs/${hash}`
              }
            } else {
              profile.missingCover = true
            }
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
     if (paginationInfo) {
      const { next } = paginationInfo
      fetchProfiles(next)
     }
    } catch (err) {
     console.log('Error fetching next items: ', err)
    }
  }

  function renderItem({ item, index } : {
    item: Profile,
    index: number
  }) {
    return (
      <ProfileListItem
        key={index}
        onProfilePress={onProfilePress}
        profile={item}
        onFollowPress={(profile: ExtendedProfile) => onFollowPress(profile, profiles)}
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