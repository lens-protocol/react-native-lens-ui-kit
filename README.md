# React Native Lens UI Kit 🌿 (alpha)

![React Native Lens](https://arweave.net/eDVHKj0nvAhYzUUXCU9vqVDY1N_PES8uik53xjQeLWo)

A React Native UI kit for [Lens Protocol](https://lens.xyz/). Get started building with as little as 2 lines of code. Mix and match components to supercharge your mobile development workflow.

Example app codebase located [here](https://github.com/dabit3/dabit3-react-native-lens-example)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#prerequisites)
- [Components](#components)
  - [Feed](#feed)
  - [Profiles](#profiles)
  - [Profile Header](#profile-header)
  - [Publication](#ublication)
  - [ProfileListItem](#profilelistitem)
  - [LensProvider](#lensprovider)
- [Roadmap](#roadmap)
  - [Beta Roadmap](#beta-roadmap)
  - [V1 Roadmap](#v1-roadmap)

## Getting started 🚀

### Prerequisites

First, install and configure [React Native SVG](https://github.com/software-mansion/react-native-svg).

### Installation

```sh
npm install @lens-protocol/react-native-lens-ui-kit
```

# Components 🍃

## Feed

A feed of posts from Lens.

```tsx
import { Feed } from "@lens-protocol/react-native-lens-ui-kit";

<Feed />;
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

**explorePublications (default)**  
[explorePublications](./src/graphql/explorePublications.graphql)

**getPublications**  
[getPublications](./src/graphql/getPublications.graphql)

**getComments**  
[getPublications](./src/graphql/getPublications.graphql)

## Profiles

A list of profiles

```tsx
import { Profiles } from "@lens-protocol/react-native-lens-ui-kit";

<Profiles />;
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
signedInUserAddress=null

# Functions
onFollowPress = (profile, profiles) => console.log({ profile })
onProfilePress = profile => console.log({ profile })
```

### Query options for `Profiles`

**exploreProfiles (default)**  
[exploreProfiles](./src/graphql/exploreProfiles.graphql)

**getFollowing**  
[getFollowing](./src/graphql/getFollowing.graphql)

## Profile

Renders an individual profile

```tsx
import { Profile } from "@lens-protocol/react-native-lens-ui-kit";

<Profile profile={profile} />;
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

```tsx
import { ProfileHeader } from "@lens-protocol/react-native-lens-ui-kit";

<ProfileHeader
  profile={profile}
  // or profileId={profileId}
/>;
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

```tsx
import { Publication } from "@lens-protocol/react-native-lens-ui-kit";

<Publication publication={publication} />;
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

```tsx
import { ProfileListItem } from "@lens-protocol/react-native-lens-ui-kit";

<ProfileListItem profile={profile} />;
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
  Environment,
} from "@lens-protocol/react-native-lens-ui-kit";

<LensProvider environment={Environment.mainnet} theme={Theme.dark}>
  <App />
</LensProvider>;
```

# Roadmap

Currently this project is in Alpha.

### Beta Roadmap

- Search
- Custom styling / layout (temporary implementation in place, want to make it more granular)
- More query options (easy contribution, help wanted)
- Authentication
- Custom components
- Support video
- Support gifs
- Gallery view for Feed

### V1 Roadmap

- Improved theme-ing
- Better TypeScript support
- Support audio
