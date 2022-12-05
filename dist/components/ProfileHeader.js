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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { View, TouchableHighlight, StyleSheet, Image, Text } from 'react-native';
import { client } from '../api';
import { ProfileDocument } from '../graphql/generated';
export function ProfileHeader(_a) {
    var _b = _a.profileId, profileId = _b === void 0 ? null : _b, _c = _a.profile, user = _c === void 0 ? null : _c, _d = _a.onFollowingPress, onFollowingPress = _d === void 0 ? null : _d, _e = _a.onFollowersPress, onFollowersPress = _e === void 0 ? null : _e;
    var _f = __read(useState(), 2), fetchedProfile = _f[0], setFetchedProfile = _f[1];
    useEffect(function () {
        if (!profile) {
            fetchProfile();
        }
    });
    function fetchProfile() {
        return __awaiter(this, void 0, void 0, function () {
            var userProfile, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("FETCHING PROFILE");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, client.query(ProfileDocument, {
                                request: {
                                    profileId: profileId
                                }
                            }).toPromise()];
                    case 2:
                        userProfile = (_a.sent()).data.profile;
                        setFetchedProfile(userProfile);
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('error fetching profile: ', err_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    }
    if (!user && !fetchedProfile)
        return null;
    var profile = user || fetchedProfile;
    var picture = profile.picture, coverPicture = profile.coverPicture;
    if (picture && picture.original) {
        if (picture.original.url.startsWith('ipfs://')) {
            var result = picture.original.url.substring(7, picture.original.url.length);
            profile.picture.original.url = "https://lens.infura-ipfs.io/ipfs/".concat(result);
        }
    }
    else {
        profile.missingAvatar = true;
    }
    if (coverPicture && coverPicture.original.url) {
        if (coverPicture.original.url.startsWith('ipfs://')) {
            var hash = coverPicture.original.url.substring(7, coverPicture.original.url.length);
            profile.coverPicture.original.url = "https://lens.infura-ipfs.io/ipfs/".concat(hash);
        }
    }
    else {
        profile.missingCover = true;
    }
    return (_jsxs(View, { children: [profile.missingCover ? (_jsx(View, { style: styles.blankHeader })) : (_jsx(Image, { style: styles.headerImage, source: { uri: profile.coverPicture.original.url } })), profile.missingAvatar ? (_jsx(View, {})) : (_jsx(Image, { style: styles.avatar, source: { uri: profile.picture.original.url } })), _jsxs(View, __assign({ style: styles.userDetails }, { children: [_jsx(Text, __assign({ style: styles.name }, { children: profile.name })), _jsx(Text, __assign({ style: styles.handle }, { children: profile.handle })), _jsx(Text, __assign({ style: styles.bio }, { children: profile.bio })), _jsxs(View, __assign({ style: styles.profileStats }, { children: [_jsx(TouchableHighlight, __assign({ onPress: onFollowingPress, underlayColor: "transparent" }, { children: _jsxs(View, __assign({ style: styles.profileFollowingData }, { children: [_jsx(Text, __assign({ style: styles.statsData }, { children: profile.stats.totalFollowing })), _jsx(Text, __assign({ style: styles.statsHeader }, { children: "Following" }))] })) })), _jsx(TouchableHighlight, __assign({ onPress: onFollowersPress, underlayColor: "transparent" }, { children: _jsxs(View, __assign({ style: styles.profileFollowerData }, { children: [_jsx(Text, __assign({ style: styles.statsData }, { children: profile.stats.totalFollowers })), _jsx(Text, __assign({ style: styles.statsHeader }, { children: "Followers" }))] })) }))] }))] }))] }));
}
var styles = StyleSheet.create({
    blankHeader: {
        height: 120,
        backgroundColor: 'black'
    },
    headerImage: {
        width: '100%',
        height: 120
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: -50,
        marginLeft: 25
    },
    userDetails: {
        paddingHorizontal: 25,
        paddingVertical: 10
    },
    name: {
        fontWeight: '600',
        fontSize: 20
    },
    handle: {
        fontSize: 14
    },
    bio: {
        marginTop: 10,
        color: 'rgba(0, 0, 0, .5)'
    },
    profileStats: {
        flexDirection: 'row',
        marginTop: 15
    },
    statsData: {
        fontWeight: '600',
        fontSize: 16
    },
    statsHeader: {
        marginLeft: 3,
        opacity: .7
    },
    profileFollowingData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileFollowerData: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
//# sourceMappingURL=ProfileHeader.js.map