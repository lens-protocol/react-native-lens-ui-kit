import { Feed, ProfileHeader } from './'

export function Profile({
  profile,
  ListHeaderComponent = null,
  ListFooterComponent = null,
  feed = null,
  signedInUser = null,
  onCollectPress = () => {},
  onCommentPress = () => {},
  onMirrorPress= () => {},
  onLikePress = () => {},
  hideLikes = false,
  hideComments = false,
  hideMirrors = false,
  hideCollects = false,
  infiniteScroll = true,
  onEndReachedThreshold = .7,
  onFollowingPress = null,
  onFollowersPress = null,
  query = null,
  onProfileImagePress,
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
