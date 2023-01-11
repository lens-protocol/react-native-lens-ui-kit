import {
  PublicationTypes,
  PublicationSortCriteria,
  ProfileSortCriteria,
  Profile,
  Post,
  Comment,
  Mirror,
  PaginatedResultInfo,
  PublicationMetadataFilters,
} from "../graphql/generated";

export type FeedQuery = {
  name: string;
  sortCriteria?: PublicationSortCriteria;
  publicationTypes?: PublicationTypes[];
  limit?: number;
  profileId?: number;
  publicationId?: number;
  cursor?: string;
  metadata?: PublicationMetadataFilters;
};

export type ProfilesQuery = {
  name: string;
  sortCriteria?: ProfileSortCriteria;
  limit?: number;
  ethereumAddress?: string;
  cursor?: string;
};

export enum Theme {
  light = "light",
  dark = "dark",
}

export enum Environment {
  testnet = "testnet",
  mainnet = "mainnet",
  sandbox = "sandbox",
}

export interface LensContextType {
  environment?: Environment;
  theme?: Theme;
}

export enum ThemeColors {
  black = "#131313",
  white = "#ffffff",
  lightGray = "rgba(255, 255, 255, .6)",
  clearWhite = "rgba(255, 255, 255, .15)",
}

/* Lens specific */
export enum MetadataDisplayType {
  number = "number",
  string = "string",
  date = "date",
}

export interface SignatureContext {
  signature?: string;
}

export interface GenericMetadata {
  /**
   * The metadata version.
   */
  version: string;

  /**
   * The metadata id can be anything but if your uploading to ipfs
   * you will want it to be random.. using uuid could be an option!
   */
  metadata_id: string;
  /**
   *  Signed metadata to validate the owner
   */
  signatureContext?: SignatureContext;
  /**
   * This is the appId the content belongs to
   */
  appId?: string;
}

export interface AttributeData {
  displayType?: MetadataDisplayType;
  traitType?: string;
  value: string;
  key: string;
}

export interface ProfileMetadata extends GenericMetadata {
  name?: string;
  bio?: string;
  cover_picture?: string;
  attributes: AttributeData[];
}

export interface ExtendedProfile extends Profile {
  missingAvatar?: boolean;
  missingCover?: boolean;
}

export interface ExtendedPost extends Post {
  profile: ExtendedProfile;
  profileSet?: boolean;
  originalProfile?: ExtendedProfile;
}

export interface ExtendedComment extends Comment {
  profile: ExtendedProfile;
  profileSet?: boolean;
  originalProfile?: ExtendedProfile;
}

export interface ExtendedMirror extends Mirror {
  profile: ExtendedProfile;
  profileSet?: boolean;
  originalProfile?: ExtendedProfile;
}

export type ExtendedPublication =
  | ExtendedComment
  | ExtendedMirror
  | ExtendedPost;

export interface PublicationFetchResults {
  pageInfo: PaginatedResultInfo;
  items: ExtendedPublication[];
}

/* Styles */
export type PublicationStyles = {
  publicationWrapper: {};
  publicationContainer: {};
  missingAvatarPlaceholder: {};
  smallAvatar: {};
  postContentContainer: {};
  postText: {};
  metadataImage: {};
  statsContainer: {};
  statsDetailContainer: {};
  statsDetailText: {};
  postOwnerDetailsContainer: {};
  postOwnerName: {};
  postOwnerHandle: {};
  timestamp: {};
  activityIndicatorContainer: {};
  mirrorContainer: {};
  mirrorText: {};
};

export type ProfileHeaderStyles = {
  container: {};
  blankHeader: {};
  headerImage: {};
  avatar: {};
  userDetails: {};
  name: {};
  handle: {};
  bio: {};
  profileStats: {};
  statsData: {};
  statsHeader: {};
  profileFollowingData: {};
  profileFollowerData: {};
};

export type ProfileListItemStyles = {
  container: {};
  avatarContainer: {};
  avatar: {};
  profileName: {};
  profileHandle: {};
  profileBio: {};
  infoContainer: {};
  followButtonContainer: {};
  followButton: {};
  followingButton: {};
  followButtonText: {};
  followingButtonText: {};
};

export type FeedStyles = {
  container: {};
  loadingIndicatorStyle: {};
  noCommentsMessage: {};
};
