import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native'
import { useContext } from 'react'
import { formatDistanceStrict } from 'date-fns'
import {
  PublicationStyles,
  ExtendedPublication,
  LensContextType,
  ThemeColors
} from '../types'
import { returnIPFSPathorURL } from '../utils'
import { LensContext } from '../context'
import { CommentIcon, MirrorIcon, CollectIcon, UnfilledHeartIcon, FilledHeartIcon } from './'

const width = Dimensions.get('window').width

export function Publication({
  publication,
  signedInUser = null,
  hideLikes = false,
  hideComments = false,
  hideMirrors = false,
  hideCollects = false,
  iconColor,
  onCollectPress = publication => console.log({ publication }),
  onCommentPress = publication => console.log({ publication }),
  onMirrorPress= publication => console.log({ publication }),
  onLikePress = publication => console.log({ publication }),
  onProfileImagePress = publication => console.log({ publication }),
  styles = baseStyles
}: {
  publication: ExtendedPublication,
  signedInUser: any,
  hideLikes: boolean,
  hideComments: boolean,
  hideMirrors: boolean,
  hideCollects: boolean,
  iconColor?: string,
  onCollectPress: (publication: ExtendedPublication) => void,
  onCommentPress:(publication: ExtendedPublication) => void,
  onMirrorPress: (publication: ExtendedPublication) => void,
  onLikePress: (publication: ExtendedPublication) => void,
  onProfileImagePress: (publication: ExtendedPublication) => void,
  styles?: PublicationStyles
}) {
  const { theme } = useContext(LensContext) 
  if (theme) {
    if (theme === 'dark') {
      styles = darkThemeStyles
      iconColor = ThemeColors.lightGray
    }
  }
  return (
    <View
      key={publication.id}
      style={styles.publicationWrapper}
    >
      <View
        style={styles.publicationContainer}
      >
        <View>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => onProfileImagePress(publication)}
          >
          {
            publication?.profile?.picture?.__typename !== 'MediaSet' || publication.profile.missingAvatar ? (
              <View
                style={styles.missingAvatarPlaceholder}
              />
            ) : (
              <Image
                source={{
                  uri: publication?.profile?.picture?.original?.url
                }}
                style={styles.smallAvatar}
              />
            )
          }
          </TouchableHighlight>
        </View>
        <View style={styles.postContentContainer}>
          {
            publication.__typename === 'Mirror' && publication.mirrorOf && (
              <View style={styles.mirrorContainer}>
                <MirrorIcon
                  color="rgba(0, 0, 0, .6)"
                />
                <Text style={styles.mirrorText}>Mirrored by {publication?.originalProfile?.name}</Text>
              </View>
            )
          }
          <View style={styles.postOwnerDetailsContainer}>
            <Text style={styles.postOwnerName}>{publication.profile.name}</Text>
            <Text style={styles.postOwnerHandle}>@{publication.profile.handle}</Text>
            <Text style={styles.timestamp}>• {reduceDate(publication.createdAt)}</Text>
          </View>
          {
            publication.metadata.content && (
              <Text style={styles.postText}>{publication.metadata.content}</Text>
            )
          }
          {
            Number(publication.metadata.media.length) > 0 && (
              <Image 
                resizeMode="contain"
                source={{
                  uri: returnIPFSPathorURL(publication.metadata.media[0].original.url)
                }}
                style={styles.metadataImage}
              />
            )
          }
        </View>
      </View>
      {
        publication.stats && (
          <View style={styles.statsContainer}>
            {
              !hideComments && (
                <View style={styles.statsDetailContainer}>
                  <CommentIcon
                    onPress={() => onCommentPress(publication)}
                    color={iconColor}
                  />
                  <Text style={styles.statsDetailText}>{publication.stats.totalAmountOfComments}</Text>
                </View>
              )
            }
            {
              !hideMirrors && (
                <View style={styles.statsDetailContainer}>
                  <MirrorIcon
                    onPress={() => onMirrorPress(publication)}
                    color={iconColor}
                  />
                  <Text style={styles.statsDetailText}>{publication.stats.totalAmountOfMirrors}</Text>
                </View>
              )
            }
            {
              !hideCollects && (
                <View style={styles.statsDetailContainer}>
                  <CollectIcon
                    onPress={() => onCollectPress(publication)}
                    color={iconColor}
                  />
                  <Text style={styles.statsDetailText}>{publication.stats.totalAmountOfCollects}</Text>
                </View>
              )
            }
            {
              !signedInUser && !hideLikes && (
                <View style={styles.statsDetailContainer}>
                  <UnfilledHeartIcon
                    onPress={() => onLikePress(publication)}
                    color={iconColor}
                  />
                  <Text style={styles.statsDetailText}>{publication.stats.totalUpvotes}</Text>
                </View>
              )
            }
            {
              signedInUser && !hideLikes && (
                <View style={styles.statsDetailContainer}>
                  <FilledHeartIcon
                    onPress={() => onLikePress(publication)}
                    color={iconColor}
                  />
                  <Text style={styles.statsDetailText}>{publication.stats.totalUpvotes}</Text>
                </View>
              )
            }
          </View>
        )
      }
    </View>
  )
}

function reduceDate(date: any) {
  const formattedDate = formatDistanceStrict(new Date(date), new Date())
  const dateArr = formattedDate.split(' ')
  const dateInfo = dateArr[1].charAt(0)
  return `${dateArr[0]}${dateInfo}`
}

const baseStyles = StyleSheet.create({
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

const darkThemeStyles = StyleSheet.create({
  publicationWrapper: {
    borderBottomWidth: 1,
    padding: 20,
    backgroundColor: ThemeColors.black,
    borderBottomColor: ThemeColors.clearWhite
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
    marginBottom: 5,
    color: ThemeColors.white
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
    fontSize: 12,
    color: ThemeColors.white
  },
  postOwnerDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  postOwnerName: {
    fontWeight: '600',
    color: ThemeColors.white
  },
  postOwnerHandle: {
    marginLeft: 4,
    color: ThemeColors.lightGray
  },
  timestamp: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: ThemeColors.lightGray
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
    fontSize: 12,
    marginBottom: 7,
    marginLeft: 5,
    color: ThemeColors.lightGray
  }
})