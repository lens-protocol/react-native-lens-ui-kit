import { Feed, ProfileHeader } from './'

export function Profile({
  profile,
  ListHeaderComponent = null,
  ListFooterComponent = null,
  feed = null,
  signedInUser = null,
  onCollectPress = publication => console.log({ publication }),
  onCommentPress = publication => console.log({ publication }),
  onMirrorPress = publication => console.log({ publication }),
  onLikePress = publication => console.log({ publication }),
  hideLikes = false,
  hideComments = false,
  hideMirrors = false,
  hideCollects = false,
  infiniteScroll = true,
  onEndReachedThreshold = .7,
  onFollowingPress = null,
  onFollowersPress = null,
  query = null,
  onProfileImagePress = publication => console.log({ publication }),
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
      query={ query ? query : {
        name: "getPublications",
        profileId: profile.id,
        publicationTypes: ["POST", "MIRROR"]
      }}
    />
  )
}
