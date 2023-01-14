import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native'
import {
  useState,
  useCallback,
  useContext,
  useEffect
} from 'react'
import {
  SearchType,
  AutoCapitalizeOptions,
  ProfilesQuery
} from '../types'
import { createClient } from '../api'
import { ProfileListItem, SearchIcon } from './'
import { debounce, formatProfilePictures } from '../utils'
import {
  SearchProfilesDocument,
  SearchRequestTypes,
  PaginatedResultInfo,
  ExploreProfilesDocument,
  ProfileSortCriteria
} from '../graphql/generated'
import { LensContext } from '../context'
import { LensContextType, ExtendedProfile } from '../types'

export function Search({
  type = SearchType.profile,
  styles = baseStyles,
  placeholder = 'Search',
  autoCapitalize = AutoCapitalizeOptions.none,
  selectionColor = '#b0b0b0',
  infiniteScroll = true,
  ListFooterComponent,
  baseQuery = {
    sortCriteria: ProfileSortCriteria.MostFollowers,
    limit: 25
  },
  onEndReachedThreshold = .65,
  onFollowPress  = profile => console.log({ profile }),
  onProfilePress = profile => console.log({ profile })
} : {
  type?: SearchType,
  styles?: any,
  placeholder?: string,
  autoCapitalize?: AutoCapitalizeOptions,
  selectionColor?: string,
  ListFooterComponent?: React.FC,
  baseQuery?: ProfilesQuery,
  infiniteScroll?: boolean,
  onEndReachedThreshold?: number,
  onFollowPress?: (profile: ExtendedProfile, profiles: ExtendedProfile[]) => void,
  onProfilePress?: (profile: ExtendedProfile) => void
}) {
  const [searchString, updateSearchString] = useState<string>('')
  const [paginationInfo, setPaginationInfo] = useState<PaginatedResultInfo | undefined>()
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [canPaginate, setCanPaginate] = useState<boolean>(true)
  let [searchType, setSearchType] = useState(type)

  const { environment } = useContext<LensContextType>(LensContext)
  const client = createClient(environment)

  useEffect(() => {
    if (searchType = SearchType.profile) {
      fetchProfiles()
    } else {
      fetchPublications()
    }
  }, [])

  async function fetchProfiles(cursor?: string) {
    setLoading(true)
    try {
      const { data } = await client.query(ExploreProfilesDocument, {
        request: {
          sortCriteria: baseQuery.sortCriteria || ProfileSortCriteria.MostFollowers,
          limit: baseQuery.limit,
          cursor
        }
      }).toPromise()
      if (data && data.exploreProfiles.__typename === 'ExploreProfileResult') {
        let {
          items, pageInfo
        } = data.exploreProfiles as any
        setPaginationInfo(pageInfo)
        items = formatProfilePictures(items)
        if (cursor) {
          let newData = [...profiles, ...items]
          setProfiles(newData)
        } else {
          setProfiles(items)
        }
        setLoading(false)
      }
    } catch (err) {
      console.log('error fetching profiles...:', err)
    }
  }

  async function fetchPublications() {}

  function onEndReached() {
    if (loading) return
    if (infiniteScroll) {
      fetchNextItems()
    }
  }

  async function fetchNextItems() {
    try {
     if (canPaginate && paginationInfo) {
       const { next } = paginationInfo
       if (!next) {
        setCanPaginate(false)
       } else {
         if (searchType === SearchType.profile) {
           if (searchString) {
            searchProfiles(searchString, next)
           } else {
            fetchProfiles(next)
           }
         } else {

         }
       }
     }
    } catch (err) {
     console.log('Error fetching next items:', err)
    }
  }

  async function searchProfiles(value: string, cursor?: string) {
    try {
      setLoading(true)
      const { data } = await client.query(SearchProfilesDocument, {
        request: {
          query: value,
          type: SearchRequestTypes.Profile,
          cursor
        }
      }).toPromise()
      if (data && data.search.__typename === 'ProfileSearchResult') {
        setPaginationInfo(data.search.pageInfo)
        let items = data.search.items as ExtendedProfile[]
        items = formatProfilePictures(items)
        if (cursor) {
          let newData = [...profiles, ...items]
          setProfiles(newData)
        } else {
          setProfiles(items)
        }
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log('error searching...', err)
    }
  }

  function renderProfile({ item, index} : {
    item: ExtendedProfile,
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

  function renderPublication({ item, index} : {
    item: ExtendedProfile,
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

  async function searchPublications(item: string) {
  }

  const onChangeText = (value:string) => {
    updateSearchString(value)
    if (searchType === SearchType.profile) {
      searchProfiles(value)
    } else {
      searchPublications(value)
    }
  }

  const callback = useCallback(debounce(onChangeText, 400), []);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.inputContainerStyle}>
        <View style={styles.inputWrapperStyle}>
          <SearchIcon />
          <TextInput
            onChangeText={callback}
            style={styles.inputStyle}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            clearButtonMode='while-editing'
            selectionColor={selectionColor}
          />
        </View>
      </View>
      <FlatList
        data={profiles}
        renderItem={searchType === SearchType.profile ? renderProfile : renderPublication}
        onEndReached={onEndReached}
        initialNumToRender={25}
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

const baseStyles = StyleSheet.create({
  containerStyle: {},
  inputContainerStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 8
  },
  inputWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    paddingLeft: 15,
    backgroundColor: 'rgba(0, 0, 0, .065)',
    borderRadius: 30,
    height: 40,
    paddingRight: 10
  },
  inputStyle: {
    marginLeft: 8,
    flex: 1
  },
  loadingIndicatorStyle : {
    marginVertical: 20
  },
})

const darkThemeStyles = StyleSheet.create({

})