import { Feed, ProfileHeader } from './'
import { PublicationTypes, Publication } from '../graphql/generated'
import { ProfileHeaderStyles, FeedStyles, PublicationStyles, FeedQuery, ExtendedProfile } from '../types'

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
  iconColor,
  infiniteScroll = true,
  onEndReachedThreshold = .65,
  headerStyles,
  feedStyles,
  publicationStyles,
  query = {
    name: "getPublications",
    profileId: profile.id,
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Mirror]
  },
  onFollowingPress = profile => console.log({ profile }),
  onFollowersPress = profile => console.log({ profile }),
  onProfileImagePress = publication => console.log({ publication }), 
  onCollectPress = publication => console.log({ publication }),
  onCommentPress = publication => console.log({ publication }),
  onMirrorPress = publication => console.log({ publication }),
  onLikePress = publication => console.log({ publication }),
} : {
  profile: ExtendedProfile,
  ListHeaderComponent: any,
  ListFooterComponent: React.FC <{}>,
  feed: Publication[],
  signedInUser: any,
  hideLikes: boolean,
  hideComments: boolean,
  hideMirrors: boolean,
  hideCollects: boolean,
  iconColor?: string,
  infiniteScroll: boolean,
  onEndReachedThreshold: number,
  headerStyles: ProfileHeaderStyles,
  feedStyles: FeedStyles,
  publicationStyles: PublicationStyles,
  query: FeedQuery,
  onFollowingPress: any,
  onFollowersPress: any,
  onProfileImagePress: any,
  onCollectPress: any,
  onCommentPress: any,
  onMirrorPress: any,
  onLikePress: any
}) {
  const HeaderComponent = ListHeaderComponent ?
  ListHeaderComponent : (
    <ProfileHeader
      profile={profile}
      onFollowingPress={onFollowingPress}
      onFollowersPress={onFollowersPress}
      styles={headerStyles}
    />
  )
  return (
    <Feed
      styles={feedStyles}
      publicationStyles={publicationStyles}
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
      iconColor={iconColor}
    />
  )
}
