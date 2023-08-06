# React Native Lens UI Kit 🌿 (alpha)

![React Native Lens](https://arweave.net/3COKWStwD_qjTpZNRGUxKoiyjtyZFqXMyYF-Tekk7zo)

A React Native UI kit for [Lens Protocol](https://lens.xyz/). Get started building with as little as 2 lines of code. Mix and match components to supercharge your mobile development workflow.

Example app codebase located [here](https://github.com/dabit3/dabit3-react-native-lens-example)

> You can also view a video tutorial of how to use the library [here](https://www.youtube.com/watch?v=qs6OE9kef6I)

## Getting started 🚀

### Prerequisites

First, install and configure [React Native SVG](https://github.com/software-mansion/react-native-svg) and [React Native Video](https://github.com/react-native-video/react-native-video) into your Expo or bare React Native project.

### Installation

```sh
npm install @lens-protocol/react-native-lens-ui-kit
```

# Components 🍃

- [Feed](#feed)
- [Profiles](#profiles)
- [Profile](#profile)
- [Profile Header](#profile-header)
- [Publication](#publication)
- [ProfileListItem](#profilelistitem)
- [Search](#search)
- [LensProvider](#lensprovider)

## Feed

A feed of posts from Lens.

```tsx
import { Feed } from '@lens-protocol/react-native-lens-ui-kit'

<Feed />
```

### Options

```
profileId?: string
publicationsQuery?: PublicationsQuery
ListHeaderComponent?: React.FC
ListFooterComponent?: React.FC
signedInUser?: ProfileMetadata
feed?: ExtendedPublication[]
onCollectPress?: (publication: ExtendedPublication) => void
onCommentPress?: (publication: ExtendedPublication) => void
onMirrorPress?: (publication: ExtendedPublication) => void
onLikePress?: (publication: ExtendedPublication) => void
onProfileImagePress?: (publication: ExtendedPublication) => void
hideLikes?: boolean
hideComments?: boolean
hideMirrors?: boolean
hideCollects?: boolean
iconColor?: string
infiniteScroll?: boolean
onEndReachedThreshold?: number
styles?: FeedStyles
publicationStyles?: PublicationStyles
```

### Styles

```
styles = StyleSheet.create({
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
```

### Query options for `Feed`

__explorePublications (default)__    
[explorePublications](./src/graphql/explorePublications.graphql)

__getPublications__    
[getPublications](./src/graphql/getPublications.graphql)

__getComments__    
[getPublications](./src/graphql/getPublications.graphql)

## Profiles

A list of profiles

```tsx
import { Profiles } from '@lens-protocol/react-native-lens-ui-kit'

<Profiles />
```

### Options

```
onFollowPress?: (profile: ExtendedProfile, profiles: ExtendedProfile[]) => void
onProfilePress?: (profile: ExtendedProfile) => void
profileData?: ExtendedProfile[]
onEndReachedThreshold?: number
infiniteScroll?: boolean
profilesQuery?: ProfilesQuery
signedInUserAddress?: string
```

### Query options for `Profiles`

__exploreProfiles (default)__    
[exploreProfiles](./src/graphql/exploreProfiles.graphql)

__getFollowing__    
[getFollowing](./src/graphql/getFollowing.graphql)


## Profile

Renders an individual profile

```tsx
import { Profile } from '@lens-protocol/react-native-lens-ui-kit'

<Profile
  handle="nader.lens"
  // or profileId={profileId}
  // or handle={profile}
/>
```

### Options

```
profile: ExtendedProfile
ListHeaderComponent?: React.FC
ListFooterComponent?: React.FC
feed?: Publication[]
signedInUser?: ProfileMetadata
hideLikes?: boolean
hideComments?: boolean
hideMirrors?: boolean
hideCollects?: boolean
iconColor?: string
infiniteScroll?: boolean
onEndReachedThreshold?: number
headerStyles?: ProfileHeaderStyles
feedStyles?: FeedStyles
publicationStyles?: PublicationStyles
publicationsQuery?: publicationsQuery
onFollowingPress?: (profile: ExtendedProfile) => void
onFollowersPress?: (profile: ExtendedProfile) => void
onProfileImagePress?: (publication: ExtendedPublication) => void
onCollectPress?: (publication: ExtendedPublication) => void
onCommentPress?: (publication: ExtendedPublication) => void
onMirrorPress?: (publication: ExtendedPublication) => void
onLikePress?: (publication: ExtendedPublication) => void
```

### Styles
publicationStyles = [PublicationStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L137)     
headerStyles = [ProfileHeaderStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L157)     
feedStyles = [FeedStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L188)

## Profile Header

Renders a profile header component.

```tsx
import { ProfileHeader } from '@lens-protocol/react-native-lens-ui-kit'

<ProfileHeader
  handle="nader.lens"
  // or profileId={profileId}
  // or profile={profile}
/>
```

### Options

```
profileId?: number
profile?: ExtendedProfile
onFollowingPress?: (profile: ExtendedProfile) => void
onFollowersPress?: (profile: ExtendedProfile) => void
styles?: ProfileHeaderStyles
```

### Styles 
[ProfileHeaderStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L157)

## Publication

Renders an individual publication.

```tsx
import { Publication } from '@lens-protocol/react-native-lens-ui-kit'

<Publication
  publication={publication}
/>
```

### Options

```
publication: ExtendedPublication
signedInUser?: ProfileMetadata
hideLikes?: boolean
hideComments?: boolean
hideMirrors?: boolean
hideCollects?: boolean
iconColor?: string
onCollectPress?: (publication: ExtendedPublication) => void
onCommentPress?:(publication: ExtendedPublication) => void
onMirrorPress?: (publication: ExtendedPublication) => void
onLikePress?: (publication: ExtendedPublication) => void
onProfileImagePress?: (publication: ExtendedPublication) => void
styles?: PublicationStyles
```


### Styles 
[PublicationStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L137)

## ProfileListItem

Renders a list item for a profile overview.

```tsx
import { ProfileListItem } from '@lens-protocol/react-native-lens-ui-kit'

<ProfileListItem
  profile={profile}
/>
```

### Options

```
profile: ExtendedProfile
onProfilePress?: (profile: ExtendedProfile) => void
onFollowPress?: (profile: ExtendedProfile) => void
isFollowing?: boolean
styles?: ProfileListItemStyles
```

### Styles    
[ProfileListItemStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L173)

## Search

A component for searching profiles and publications.

### Options

```
searchType?: SearchType
styles?: SearchStyles
placeholder?: string
autoCapitalize?: AutoCapitalizeOptions
selectionColor?: string
ListFooterComponent?: React.FC
iconColor?: string
profilesQuery?: ProfilesQuery
publicationsQuery?: publicationsQuery
infiniteScroll?: boolean
onEndReachedThreshold?: number
publicationStyles?: PublicationStyles
signedInUser?: ProfileMetadata
hideLikes?: any
hideComments?: boolean
hideMirrors?: boolean
hideCollects?: boolean
onCollectPress?: (publication: ExtendedPublication) => void
onCommentPress?: (publication: ExtendedPublication) => void
onMirrorPress?: (publication: ExtendedPublication) => void
onLikePress?: (publication: ExtendedPublication) => void
onProfileImagePress?: (publication: ExtendedPublication) => void
onFollowPress?: (profile: ExtendedProfile, profiles: ExtendedProfile[]) => void
onProfilePress?: (profile: ExtendedProfile) => void
```

### Usage

```tsx
import { Search } from  '@lens-protocol/react-native-lens-ui-kit'

<Search />

// default is profile search, for publication search:
import { Search, SearchType } from  '@lens-protocol/react-native-lens-ui-kit'

<Search
  searchType={SearchType.publication}
/>
```

## LensProvider

Allows you to pass global configurations to React Native Lens UI Kit.

### Options

```
environment? = 'testnet' | 'mainnet' (default) | 'sandbox'
theme? = 'light' (default) | 'dark
```

### Usage

```tsx
import {
  LensProvider,
  Theme,
  Environment
} from '@lens-protocol/react-native-lens-ui-kit'

<LensProvider
  environment={Environment.mainnet}
  theme={Theme.dark}
>
  <App />
</LensProvider>
```

# Roadmap

Currently this project is in Alpha.

### Beta Roadmap

- Custom styling / layout (temporary implementation in place, want to make it more granular)
- More query options (easy contribution, help wanted)
- Authentication
- Custom components
- Support video
- Gallery view for Feed

### V1 Roadmap

- Improved theme-ing
- Better TypeScript support
- Support audio

### Contribute

To run and develop with the project locally, do the following:

1. Clone the repo:

```sh
git clone git@github.com:lens-protocol/react-native-lens-ui-kit.git
```

2. Install the dependencies

```sh
npm install 

# or use yarn, pnpm, etc..
```

3. Open `watcher.js` and configure the directory of your React Native project (`destDir`).

4. Run the develop scripts:

```sh
npm run dev
```