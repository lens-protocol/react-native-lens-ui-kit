import {
  MediaOutput,
  PublicationTypes,
  PublicationSortCriteria,
  ProfileSortCriteria,
  Profile,
  Post,
  Comment,
  Mirror,
  PaginatedResultInfo
} from './graphql/generated'

export type FeedQuery = {
  name: string;
  publicationTypes?: PublicationTypes[],
  sortCriteria?: PublicationSortCriteria,
  limit?: number;
  profileId?: number;
  publicationId?: number;
  cursor?: string;
}

export type ProfilesQuery = {
  name: string;
  sortCriteria: ProfileSortCriteria;
  limit?: number;
  ethereumAddress?: string;
  cursor?: string;
}

export interface Props {
  Comp: React.ComponentType;
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

interface MetadataMedia {
  item: string;
  /**
   * This is the mime type of media
   */
  type: string;
}

export interface MetadataAttribute {
  displayType?: MetadataDisplayType;
  traitType?: string;
  value: string;
}

export interface Metadata extends GenericMetadata {
  description?: string;
  content?: string;
  external_url?: string | null;
  name: string;
  attributes: MetadataAttribute[];
  image?: string | null;
  imageMimeType?: string | null;
  media?: MediaOutput[];
  animation_url?: string;
  locale: string;
  tags?: string[];
  contentWarning?: PublicationContentWarning;
  mainContentFocus: PublicationMainFocus;
}

export enum PublicationContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}

export enum PublicationMainFocus {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  ARTICLE = 'ARTICLE',
  TEXT_ONLY = 'TEXT_ONLY',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  EMBED = 'EMBED',
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
  mirrorText: {}
}

export type ProfileHeaderStyles = {
  container: {},
  blankHeader: {},
  headerImage: {},
  avatar: {},
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
  followingButtonText: {}
}

export type FeedStyles = {
  container: {},
  loadingIndicatorStyle: {},
  noCommentsMessage: {}
}