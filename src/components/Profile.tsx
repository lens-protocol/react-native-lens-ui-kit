import { Feed, ProfileHeader } from './'

export function Profile({
  profile,
  ListHeaderComponent = null,
  ListFooterComponent = null,
  feed = null,
  signedInUser = null,
  hideLikes = false,
  hideComments = false,
  hideMirrors = false,
  hideCollects = false,
  infiniteScroll = true,
  onEndReachedThreshold = .65,
  query = {
    name: "getPublications",
    profileId: profile.id,
    publicationTypes: ["POST", "MIRROR"]
  },
  onFollowingPress = profile => console.log({ profile }),
  onFollowersPress = profile => console.log({ profile }),
  onProfileImagePress = publication => console.log({ publication }), 
  onCollectPress = publication => console.log({ publication }),
  onCommentPress = publication => console.log({ publication }),
  onMirrorPress = publication => console.log({ publication }),
  onLikePress = publication => console.log({ publication })
}) {
  const HeaderComponent = ListHeaderComponent ?
  ListHeaderComponent : (
    <ProfileHeader
      profile={profile}
      onFollowingPress={onFollowingPress}
      onFollowersPress={onFollowersPress}
    />
  )
  return (
    <Feed
      ListFooterComponent={ListFooterComponent}
      feed={feed}
      signedInUser={signedInUser}
      onCollectPress={onCollectPress}
      onCommentPress={onCommentPress}
      onMirrorPress={onMirrorPress}
      onLikePress={onLikePress}
      hideLikes={hideLikes}
      hideComments={hideComments}
      hideMirrors={hideMirrors}
      hideCollects={hideCollects}
      infiniteScroll={infiniteScroll}
      onEndReachedThreshold={onEndReachedThreshold}
      ListHeaderComponent={HeaderComponent}
      onProfileImagePress={onProfileImagePress}
      query={query}
    />
  )
}
