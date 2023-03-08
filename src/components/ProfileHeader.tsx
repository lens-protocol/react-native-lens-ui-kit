import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  Text
} from "react-native";
import { createClient } from "../api";
import { ProfileDocument } from "../graphql/generated";
import {
  ExtendedProfile,
  ProfileHeaderStyles,
  LensContextType,
  ThemeColors,
  Theme,
} from "../types";
import { LensContext } from "../context";

export function ProfileHeader({
  profileId,
  profile: user,
  handle,
  isFollowing,
  onFollowPress = (profile) => console.log({ profile }),
  onFollowingPress = (profile) => console.log({ profile }),
  onFollowersPress = (profile) => console.log({ profile }),
  styles = baseStyles,
}: {
  profileId?: string;
  profile?: ExtendedProfile;
  handle?: string,
  isFollowing?: boolean,
  onFollowPress?: (profile: ExtendedProfile) => void;
  onFollowingPress?: (profile: ExtendedProfile) => void;
  onFollowersPress?: (profile: ExtendedProfile) => void;
  styles?: ProfileHeaderStyles;
}) {
  const [fetchedProfile, setFetchedProfile] = useState<any | null>(null)
  const { environment, theme, IPFSGateway } = useContext<LensContextType>(LensContext)
  const client = createClient(environment)
  if (theme === "dark") {
    styles = darkThemeStyles
  }
  useEffect(() => {
    if (!profile) {
      fetchProfile()
    }
  })

  async function fetchProfile() {
    try {
      if (profileId) {
        const { data } = await client
          .query(ProfileDocument, {
            request: {
              profileId,
            },
          })
          .toPromise();
        if (data) {
          const { profile: userProfile } = data;
          setFetchedProfile(userProfile);
        }
      }
      if (handle) {
        if (!handle.includes('.lens')) {
          handle = handle + '.lens'
        }
        const { data } = await client
          .query(ProfileDocument, {
            request: {
              handle,
            }
          })
         .toPromise()
        if (data) {
          const { profile: userProfile } = data;
          setFetchedProfile(userProfile);
        }
      }
    } catch (err) {
      console.log("error fetching profile: ", err);
    }
  }
  if (!user && !fetchedProfile) return null;
  const profile = user || fetchedProfile;
  let { picture, coverPicture } = profile;
  if (picture?.uri) {
    picture.original = {
      url: picture.uri,
    };
  } else if (picture?.original) {
    if (picture.original.url.startsWith("ipfs://")) {
      let result = picture.original.url.substring(
        7,
        picture.original.url.length
      );
      profile.picture.original.url = `${IPFSGateway}/${result}`;
    }
    if (picture.original.url.startsWith("ar://")) {
      let result = picture.original.url.substring(
        5,
        picture.original.url.length
      );
      profile.picture.original.url = `${IPFSGateway}/${result}`;
    }
  } else {
    profile.missingAvatar = true;
  }
  if (coverPicture?.original.url) {
    if (coverPicture.original.url.startsWith("ipfs://")) {
      let hash = coverPicture.original.url.substring(
        7,
        coverPicture.original.url.length
      );
      profile.coverPicture.original.url = `${IPFSGateway}/${hash}`;
    }
    if (coverPicture.original.url.startsWith("ar://")) {
      let result = coverPicture.original.url.substring(
        5,
        coverPicture.original.url.length
      );
      profile.coverPicture.original.url = `https://arweave.net/${result}`;
    }
  } else {
    profile.missingCover = true;
  }

  return (
    <View style={styles.container}>
      {profile.missingCover ? (
        <View style={styles.blankHeader} />
      ) : (
        <Image
          style={styles.headerImage}
          source={{ uri: profile.coverPicture.original.url }}
        />
      )}
      {profile.missingAvatar ? (
        <View />
      ) : (
        <Image
          style={styles.avatar}
          source={{ uri: profile.picture.original.url }}
        />
      )}
      {
        renderFollowButton(isFollowing, theme)
      }
      <View style={styles.userDetails}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.handle}>@{profile.handle}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <View style={styles.profileStats}>
          <TouchableHighlight
            onPress={() => onFollowingPress(profile)}
            underlayColor="transparent"
          >
            <View style={styles.profileFollowingData}>
              <Text style={styles.statsData}>
                {profile.stats.totalFollowing}
              </Text>
              <Text style={styles.statsHeader}>Following</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => onFollowersPress(profile)}
            underlayColor="transparent"
          >
            <View style={styles.profileFollowerData}>
              <Text style={styles.statsData}>
                {profile.stats.totalFollowers}
              </Text>
              <Text style={styles.statsHeader}>Followers</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );

  function renderFollowButton(isFollowing?: boolean, theme?: Theme) {
    if (!isFollowing) {
      return (
        <TouchableHighlight
          underlayColor={theme === Theme.dark ? 'rgba(255, 255, 255, .85)' : 'rgba(0, 0, 0, .85)'}
          onPress={() => onFollowPress(profile)}
          style={styles.followButton}
        >
          <Text
            style={styles.followButtonText}
          >
            Follow
          </Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          underlayColor={theme === Theme.dark ? 'rgba(255, 255, 255, .85)' : 'rgba(0, 0, 0, .85)'}
          onPress={() => onFollowPress(profile)}
          style={styles.followingButton}
        >
          <Text
            style={styles.followingButtonText}
          >
            Following
          </Text>
        </TouchableHighlight>
      )
    }
  }
}

const baseStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .045)',
    paddingBottom: 3
  },
  blankHeader: {
    height: 120,
    backgroundColor: "black",
  },
  headerImage: {
    width: "100%",
    height: 120,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    marginLeft: 25,
  },
  followButton: {
    backgroundColor: ThemeColors.black,
    width: 110,
    position: 'absolute',
    top: 128,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 30
  },
  followButtonText: {
    color: ThemeColors.white,
    fontWeight: '600'
  },
  followingButton: {
    borderWidth: 1,
    borderColor: ThemeColors.black,
    width: 110,
    position: 'absolute',
    top: 128,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 30
  },
  followingButtonText: {
    color: ThemeColors.black
  },
  userDetails: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 20,
  },
  handle: {
    fontSize: 14,
  },
  bio: {
    marginTop: 10,
    color: "rgba(0, 0, 0, .5)",
  },
  profileStats: {
    flexDirection: "row",
    marginTop: 15,
  },
  statsData: {
    fontWeight: "600",
    fontSize: 16,
  },
  statsHeader: {
    marginLeft: 3,
    opacity: 0.7,
  },
  profileFollowingData: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileFollowerData: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});

const darkThemeStyles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.black,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, .05)',
  },
  blankHeader: {
    height: 120,
    backgroundColor: "black",
  },
  headerImage: {
    width: "100%",
    height: 120,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -55,
    marginLeft: 25,
  },
  followButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 110,
    position: 'absolute',
    top: 128,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 30
  },
  followButtonText: {
    color: ThemeColors.black,
    fontWeight: '600'
  },
  followingButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .2)',
    width: 110,
    position: 'absolute',
    top: 128,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 30
  },
  followingButtonText: {
    color: ThemeColors.white
  },
  userDetails: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 20,
    color: ThemeColors.white,
  },
  handle: {
    fontSize: 14,
    color: ThemeColors.lightGray,
  },
  bio: {
    marginTop: 10,
    color: "white",
  },
  profileStats: {
    flexDirection: "row",
    marginTop: 15,
  },
  statsData: {
    fontWeight: "600",
    fontSize: 16,
    color: ThemeColors.lightGray,
  },
  statsHeader: {
    marginLeft: 3,
    color: ThemeColors.white,
  },
  profileFollowingData: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileFollowerData: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
