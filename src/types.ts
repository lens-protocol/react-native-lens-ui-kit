import {
  PublicationTypes,
  PublicationSortCriteria,
  ProfileSortCriteria,
  Profile,
  Post,
  Comment,
  Mirror,
  PaginatedResultInfo,
  PublicationMetadataFilters
} from './graphql/generated'

export type PublicationsQuery = {
  name?: string;
  publicationSortCriteria?: PublicationSortCriteria,
  publicationTypes?: PublicationTypes[],
  limit?: number;
  profileId?: number;
  handle?: string;
  publicationId?: number;
  cursor?: string;
  metadata?: PublicationMetadataFilters;
}

export type ProfilesQuery = {
  name?: string;
  profileSortCriteria?: ProfileSortCriteria;
  limit?: number;
  ethereumAddress?: string;
  cursor?: string;
}

export enum Theme {
  light = 'light',
  dark = 'dark'
}

export enum Environment {
  testnet = 'testnet',
  mainnet = 'mainnet',
  sandbox = 'sandbox',
}

export interface LensContextType {
  environment: Environment;
  theme: Theme;
  IPFSGateway: string;
}

export enum ThemeColors {
  black = '#131313',
  white = '#ffffff',
  lightGray = 'rgba(255, 255, 255, .6)',
  clearWhite = 'rgba(255, 255, 255, .15)',
  darkGray = '#202020'
}

export enum SearchType {
  profile = 'profile',
  publication = 'publication'
}

export enum AutoCapitalizeOptions {
  characters = 'characters',
  words = 'words',
  sentences = 'sentences',
  none = 'none'
}

/* Lens specific */
export enum MetadataDisplayType {
  number = 'number',
  string = 'string',
  date = 'date',
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

export type ExtendedPublication = ExtendedComment | ExtendedMirror | ExtendedPost

export interface PublicationFetchResults {
  pageInfo: PaginatedResultInfo;
  items: ExtendedPublication[];
}

/* Styles */
export type PublicationStyles = {
  publicationWrapper: {},
  publicationContainer: {},
  userProfileContainer: {},
  missingAvatarPlaceholder: {},
  smallAvatar: {},
  postContentContainer: {},
  postText: {},
  metadataImage: {},
  statsContainer: {},
  statsDetailContainer: {},
  statsDetailText: {},
  postOwnerDetailsContainer: {},
  postOwnerName: {},
  postOwnerHandle: {},
  timestamp: {},
  activityIndicatorContainer: {},
  mirrorContainer: {},
  mirrorText: {},
  video: {},
  videoContainer: {}
}

export type ProfileHeaderStyles = {
  container: {},
  blankHeader: {},
  headerImage: {},
  avatar: {},
  followButton: {},
  followingButton: {},
  followingButtonText: {},
  followButtonText: {},
  userDetails: {},
  name: {},
  handle: {},
  bio: {},
  profileStats: {},
  statsData: {},
  statsHeader: {},
  profileFollowingData: {},
  profileFollowerData: {}
}

export type ProfileListItemStyles = {
  container: {},
  avatarContainer: {},
  avatar: {},
  profileName: {},
  profileHandle: {},
  profileBio: {},
  infoContainer: {},
  followButtonContainer: {},
  followButton: {},
  followingButton: {},
  followButtonText: {},
  followingButtonText: {},
}

export type FeedStyles = {
  container: {},
  loadingIndicatorStyle: {},
  noCommentsMessage: {}
}

export type SearchStyles = {
  containerStyle: {},
  inputContainerStyle: {},
  inputWrapperStyle: {},
  inputStyle: {},
  loadingIndicatorStyle : {}
}
