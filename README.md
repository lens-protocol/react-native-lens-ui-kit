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

# Functions
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress = publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
onProfileImagePress = profile => console.log({ profile })

# Styles
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

# Functions
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

# Functions
onFollowingPress = profile => console.log({ profile })
onFollowersPress = profile => console.log({ profile })
onProfileImagePress = publication => console.log({ publication })
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress = publication => console.log({ publication })
onLikePress = publication => console.log({ publication })

# Styles
headerStyles
feedStyles
publicationStyles
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

styles = StyleSheet.create({
  blankHeader: {
    height: 120,
    backgroundColor: 'black'
  },
  headerImage: {
    width: '100%',
    height: 120
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    marginLeft: 25
  },
  userDetails: {
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
  },
  handle: {
    fontSize: 14,
  },
  bio: {
    marginTop: 10,
    color: 'rgba(0, 0, 0, .5)'
  },
  profileStats: {
    flexDirection: 'row',
    marginTop: 15
  },
  statsData: {
    fontWeight: '600',
    fontSize: 16,
  },
  statsHeader: {
    marginLeft: 3,
    opacity: .7
  },
  profileFollowingData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileFollowerData: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
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

# Functions
onCollectPress = publication => console.log({ publication })
onCommentPress = publication => console.log({ publication })
onMirrorPress= publication => console.log({ publication })
onLikePress = publication => console.log({ publication })
onProfileImagePress = publication => console.log({ publication })

# Styles
styles = StyleSheet.create({
  publicationWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .05)',
    padding: 20
  },
  publicationContainer: {
    flexDirection: 'row',
  },
  missingAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postContentContainer: {
    flexShrink: 1,
    paddingLeft: 15
  },
  postText: {
    flexShrink: 1,
    marginTop: 7,
    marginBottom: 5
  },
  metadataImage: {
    marginTop: 10,
    flex: 1,
    width: width - 100,
    height: width - 100,
  },
  statsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    paddingLeft: 20,
  },
  statsDetailContainer: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center'
  },
  statsDetailText: {
    marginLeft: 10,
    fontSize: 12
  },
  postOwnerDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  postOwnerName: {
    fontWeight: '600'
  },
  postOwnerHandle: {
    marginLeft: 4,
    color: 'rgba(0, 0, 0, .5)'
  },
  timestamp: {
    marginLeft: 4,
    color: 'rgba(0, 0, 0, .5)',
    fontSize: 12,
    fontWeight: '600'
  },
  activityIndicatorContainer: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  mirrorContainer: {
    flexDirection: 'row'
  },
  mirrorText: {
    fontWeight: '600',
    color: 'rgba(0, 0, 0, .6)',
    fontSize: 12,
    marginBottom: 7,
    marginLeft: 5
  }
})
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

# Styles
styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .06)'
  },
  avatarContainer: {
    padding: 5
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  profileName: {
    fontWeight: '600',
    fontSize: 16,
    maxWidth: 200
  },
  profileHandle: {
    marginTop: 3,
    axWidth: 200
  },
  profileBio: {
    maxWidth: 200,
    marginTop: 15,
    color: 'rgba(0, 0, 0, .5)'
  },
  infoContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
    maxWidth: 200,
  },
  followButtonContainer: {
    flex: 1,
    alignItems: 'flex-end', 
    paddingRight: 20
  },
  followButton: {
    borderWidth: 1,
    borderRadius: 34,
    paddingHorizontal: 17,
    paddingVertical:7,
    marginTop: 3,
    backgroundColor: 'black',
  },
  followingButton: {
    borderWidth: 1,
    borderRadius: 34,
    paddingHorizontal: 17,
    paddingVertical:7,
    marginTop: 3,
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white'
  },
  followingButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'black'
  }
})
```

# Roadmap

Currently this project is in Alpha.

### Beta Roadmap

- Custom styling / layout (temporary implementation in place, want to make it more granular)
- More query options (easy contribution, help wanted)
- Authentication
- Migrate the example application to Expo (easy contribution, help wanted)

### V1 Roadmap

- Theming
- More rich content types (video, gif, audio)
- Better TypeScript support

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