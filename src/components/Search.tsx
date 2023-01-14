import {
  View,
  StyleSheet,
  TextInput,
  FlatList
} from 'react-native'
import {
  useState,
  useCallback,
  useContext
} from 'react'
import {
  SearchType,
  AutoCapitalizeOptions
} from '../types'
import { createClient } from '../api'
import { ProfileListItem, SearchIcon } from './'
import { debounce } from '../utils'
import {
  SearchProfilesDocument, SearchRequestTypes, PaginatedResultInfo
} from '../graphql/generated'
import { LensContext } from '../context'
import { LensContextType, ExtendedProfile } from '../types'

export function Search({
  type = SearchType.profile,
  styles = baseStyles,
  placeholder = 'Search',
  autoCapitalize = AutoCapitalizeOptions.none,
  selectionColor = '#b0b0b0',
  onFollowPress  = profile => console.log({ profile }),
  onProfilePress = profile => console.log({ profile }),
} : {
  type?: SearchType,
  styles?: any,
  placeholder?: string,
  autoCapitalize?: AutoCapitalizeOptions,
  selectionColor?: string,
  onFollowPress?: (profile: ExtendedProfile, profiles: ExtendedProfile[]) => void,
  onProfilePress?: (profile: ExtendedProfile) => void,
}) {
  const [searchString, updateSearchString] = useState<string>('')
  const [paginationInfo, setPaginationInfo] = useState<PaginatedResultInfo | undefined>()
  const [profiles, setProfiles] = useState<any[]>([])

  let [searchType, setSearchType] = useState(type)

  const { environment } = useContext<LensContextType>(LensContext)
  const client = createClient(environment)

  async function fetchProfiles() {}

  async function fetchPublications() {}

  async function searchProfiles(value: string) {
    try {
      const { data } = await client.query(SearchProfilesDocument, {
        request: {
          query: value,
          type: SearchRequestTypes.Profile
        }
      }).toPromise()
      if (data && data.search.__typename === 'ProfileSearchResult') {
        let items = data.search.items as ExtendedProfile[]
        items = items.map(profile => {
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
        setProfiles(items)
      }
    } catch (err) {
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

  async function searchPublications(item: string) {}

  const onChangeText = (value:string) => {
    updateSearchString(value)
    if (searchType === SearchType.profile) {
      searchProfiles(value)
    } else {
      searchPublications(value)
    }
  }

  const callback = useCallback(debounce(onChangeText, 300), []);

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
        />
    </View>
  )
}

const baseStyles = StyleSheet.create({
  containerStyle: {},
  inputContainerStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
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
  }
})

const darkThemeStyles = StyleSheet.create({

})