# React Native Lens UI Kit 🌿 (alpha)

![React Native Lens](header.jpg)

A React Native UI kit for Lens Protocol. Get started building with as little as 2 lines of code. Mix and match components to supercharge your mobile development workflow.

## Getting started 🚀

### Prerequisites

First, install and configure [React Native SVG](https://github.com/software-mansion/react-native-svg).

### Installation

```sh
@lens-protocol/react-native-lens-ui-kit
```

# Components 🍃

## Feed

A feed of posts from Lens.

```javascript
import { Feed } from 'react-native-lens-ui-kit'

<Feed />
```

### Default props

```
query = {
  name: "explorePublications",
  publicationTypes: ["POST", "COMMENT", "MIRROR"],
  sortCriteria: "LATEST",
  limit: 20
}
ListHeaderComponent = null
ListFooterComponent = null
feed = null
signedInUser = null
hideLikes = false
hideComments = false
hideMirrors = false
hideCollects = false
infiniteScroll = true
onEndReachedThreshold = .65

# Functions
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress = publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
onProfileImagePress = profile => console.log({ profile })
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

```javascript
import { Profiles } from 'react-native-lens-ui-kit'

<Profiles />
```

### Default Props

```
query = {
  name: 'getFollowing',
  sortCriteria: 'MOST_FOLLOWERS',
  limit: 25
}
profileData = null
onEndReachedThreshold = .7
infiniteScroll = true

# Functions
onFollowPress = profile => console.log({ profile })
onProfilePress = profile => console.log({ profile })
```

### Query options for `Profiles`

__exploreProfiles (default)__    
[exploreProfiles](./src/graphql/exploreProfiles.graphql)

__getFollowing__    
[getFollowing](./src/graphql/getFollowing.graphql)


## Profile

Renders an individual profile

```javascript
import { Profile } from 'react-native-lens-ui-kit'

<Profile
  profile={profile}
/>
```

### Default props

```
profile (required)
ListHeaderComponent = null
ListFooterComponent = null
feed = null
signedInUser = null
hideLikes = false
hideComments = false
hideMirrors = false
hideCollects = false
infiniteScroll = true
onEndReachedThreshold = .65
onProfileImagePress

# Functions
onFollowingPress = profile => console.log({ profile })
onFollowersPress = profile => console.log({ profile })
onProfileImagePress = publication => console.log({ publication })
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress = publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
```

### Styles
publicationStyles = [PublicationStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L137)     
headerStyles = [ProfileHeaderStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L157)     
feedStyles = [FeedStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L188)

## Profile Header

Renders a profile header component.

```javascript
import { ProfileHeader } from 'react-native-lens-ui-kit'

<ProfileHeader
  profile={profile}
  // or profileId={profileId}
/>
```

### Default props

```
profileId = null
profile = null
onFollowingPress = profile => console.log({ profile })
onFollowersPress = profile => console.log({ profile })
```

### Styles 
[ProfileHeaderStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L157)

## Publication

Renders an individual publication.

```javascript
import { Publication } from 'react-native-lens-ui-kit'

<Publication
  publication={publication}
/>
```

### Default props

```
publication = undefined (required)
signedInUser = null
hideLikes = false
hideComments = false
hideMirrors = false
hideCollects = false

# Functions
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress= publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
onProfileImagePress = publication => console.log({ publication })
```

### Styles 
[PublicationStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L137)

## ProfileListItem

Renders a list item for a profile overview.

```javascript
import { ProfileListItem } from 'react-native-lens-ui-kit'

<ProfileListItem
  profile={profile}
/>
```

### Default props

```
profile (required)
isFollowing
onProfilePress
onFollowPress
```

### Styles    
[ProfileListItemStyles](https://github.com/lens-protocol/react-native-lens-ui-kit/blob/main/src/types.ts#L173)

# Roadmap

Currently this project is in Alpha.

### Beta Roadmap

- Custom styling / layout (temporary implementation in place, want to make it more granular)
- More query options (easy contribution, help wanted)
- Authentication
- Migrate the example application to Expo (easy contribution, help wanted)
- Custom components

### V1 Roadmap

- Theming
- More rich content types (video, gif, audio)
- Better TypeScript support

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