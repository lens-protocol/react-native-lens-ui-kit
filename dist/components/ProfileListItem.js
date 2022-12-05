var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
export function ProfileListItem(_a) {
    var _b, _c;
    var profile = _a.profile, onProfilePress = _a.onProfilePress, onFollowPress = _a.onFollowPress, isFollowing = _a.isFollowing;
    return (_jsx(TouchableHighlight, __assign({ activeOpacity: 0.8, onPress: function () { return onProfilePress(profile); }, underlayColor: "transparent" }, { children: _jsxs(View, __assign({ style: styles.container }, { children: [_jsx(View, __assign({ style: styles.avatarContainer }, { children: _jsx(Image, { source: {
                            uri: ((_c = (_b = profile === null || profile === void 0 ? void 0 : profile.picture) === null || _b === void 0 ? void 0 : _b.original) === null || _c === void 0 ? void 0 : _c.url) || "https://source.unsplash.com/random/200x200?sig=1"
                        }, style: styles.avatar }) })), _jsxs(View, __assign({ style: styles.infoContainer }, { children: [_jsx(Text, __assign({ style: styles.profileName }, { children: profile.name || profile.handle })), _jsx(Text, __assign({ style: styles.profileHandle }, { children: profile.handle })), _jsx(Text, __assign({ style: styles.profileBio }, { children: profile.bio && profile.bio.substring(0, 150) }))] })), _jsx(View, __assign({ style: styles.followButtonContainer }, { children: _jsx(TouchableHighlight, __assign({ underlayColor: "transparent", onPress: function () { return onFollowPress(profile); }, activeOpacity: 0.6 }, { children: renderFollowButton(isFollowing) })) }))] })) }), profile.id));
}
var styles = StyleSheet.create({
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
        maxWidth: 200
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
        paddingVertical: 7,
        marginTop: 3,
        backgroundColor: 'black'
    },
    followingButton: {
        borderWidth: 1,
        borderRadius: 34,
        paddingHorizontal: 17,
        paddingVertical: 7,
        marginTop: 3
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
});
function renderFollowButton(isFollowing) {
    if (isFollowing) {
        return (_jsx(View, __assign({ style: styles.followingButton }, { children: _jsx(Text, __assign({ style: styles.followingButtonText }, { children: "Following" })) })));
    }
    else {
        return (_jsx(View, __assign({ style: styles.followButton }, { children: _jsx(Text, __assign({ style: styles.followButtonText }, { children: "Follow" })) })));
    }
}
//# sourceMappingURL=ProfileListItem.js.map