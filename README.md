# React Native Lens (alpha)

![React Native Lens](header.jpg)

A React Native UI kit for Lens Protocol.

## Getting started

### Prerequisites

First, install and configure React Native [SVG](https://github.com/software-mansion/react-native-svg).

### Installation

```sh
npm install react-native-lens
```

# Components

## Feed

A feed of posts from Lens.

```javascript
import { Feed } from 'react-native-lens'

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
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress = publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
onProfileImagePress = profile => console.log({ profile })
```

### Query options for `Feed`

__explorePublications (default)__    
[explorePublications](./src/graphql/explorePublications.graphql)

__getPublications__    
[getPublications](./src/graphql/getPublications.graphql)

__getComments__    
[getComments](./src/graphql/getComments.graphql)

## Profiles

A list of profiles

```javascript
import { Profiles } from 'react-native-lens'

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
onFollowPress = profile => console.log({ profile })
onProfilePress = profile => console.log({ profile })
```

### Query options for `Profiles`

__exploreProfiles (default)__    
[exploreProfiles](./src/graphql/exploreProfiles.graphql)

__getFollowing__    
[getPublications](./src/graphql/getFollowing.graphql)


## Profile

Renders an individual profile

```javascript
import { Profile } from 'react-native-lens'

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
onFollowingPress = profile => console.log({ profile })
onFollowersPress = profile => console.log({ profile })
onProfileImagePress = publication => console.log({ publication })
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress = publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
```

## Profile Header

Renders a profile header component.

```javascript
import { ProfileHeader } from 'react-native-lens'

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

## Publication

Renders an individual publication.

```javascript
import { Publication } from 'react-native-lens'

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
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress= publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
onProfileImagePress = publication => console.log({ publication })
```

## ProfileListItem

Renders a list item for a profile overview.

```javascript
import { ProfileListItem } from 'react-native-lens'

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

# Roadmap

Currently this project is in Alpha.

### Beta Roadmap

- Custom styling / layout
- More query options
- Authencication

### V1 Roadmap

- Theming
- More rich content types (video, gif, audio)

### Contribute

To run and develop with the project locally, do the following:

1. Clone the repo:

```sh
git clone git@github.com:lens-protocol/react-native-lens.git
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