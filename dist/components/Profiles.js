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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { client, getFollowing } from '../api';
import { ExploreProfilesDocument } from '../graphql/generated';
import { ProfileListItem } from './';
export function Profiles(_a) {
    var _b = _a.onFollowPress, onFollowPress = _b === void 0 ? function () { return null; } : _b, _c = _a.onProfilePress, onProfilePress = _c === void 0 ? function () { return null; } : _c, _d = _a.profileData, profileData = _d === void 0 ? null : _d, _e = _a.onEndReachedThreshold, onEndReachedThreshold = _e === void 0 ? .7 : _e, _f = _a.infiniteScroll, infiniteScroll = _f === void 0 ? true : _f, _g = _a.query, query = _g === void 0 ? {
        name: 'exploreProfiles',
        sortCriteria: 'MOST_FOLLOWERS',
        limit: 25
    } : _g;
    var _h = __read(useState([]), 2), profiles = _h[0], setProfiles = _h[1];
    var _j = __read(useState(true), 2), loading = _j[0], setLoading = _j[1];
    var _k = __read(useState(), 2), paginationInfo = _k[0], setPaginationInfo = _k[1];
    useEffect(function () {
        fetchProfiles();
    }, []);
    function fetchResponse(cursor) {
        if (cursor === void 0) { cursor = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, pageInfo, items, _b, pageInfo, items;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(query.name === 'exploreProfiles')) return [3, 2];
                        return [4, client.query(ExploreProfilesDocument, {
                                request: {
                                    sortCriteria: query.sortCriteria,
                                    cursor: cursor,
                                    limit: query.limit
                                }
                            }).toPromise()];
                    case 1:
                        _a = (_c.sent()).data.exploreProfiles, pageInfo = _a.pageInfo, items = _a.items;
                        return [2, {
                                pageInfo: pageInfo,
                                items: items
                            }];
                    case 2:
                        if (!(query.name === 'getFollowing')) return [3, 4];
                        console.log("query: ", JSON.stringify(query));
                        return [4, client.query(getFollowing, {
                                address: query.ethereumAddress,
                                cursor: cursor,
                                limit: query.limit || 25
                            }).toPromise()];
                    case 3:
                        _b = (_c.sent()).data.following, pageInfo = _b.pageInfo, items = _b.items;
                        items = items.map(function (item) {
                            item.profile.isFollowing = true;
                            return item.profile;
                        });
                        return [2, {
                                pageInfo: pageInfo,
                                items: items
                            }];
                    case 4: return [2];
                }
            });
        });
    }
    function fetchProfiles(cursor) {
        if (cursor === void 0) { cursor = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, items, pageInfo, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (profileData) {
                            setProfiles(profileData);
                            return [2];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (!(!profileData ||
                            profileData && profiles.length)) return [3, 4];
                        setLoading(true);
                        return [4, fetchResponse(cursor)];
                    case 2:
                        _a = _b.sent(), items = _a.items, pageInfo = _a.pageInfo;
                        setPaginationInfo(pageInfo);
                        return [4, Promise.all(items.map(function (profile) {
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
                                        coverPicture.original.url = "https://lens.infura-ipfs.io/ipfs/".concat(hash);
                                    }
                                }
                                else {
                                    profile.missingCover = true;
                                }
                                return profile;
                            }))];
                    case 3:
                        items = _b.sent();
                        setLoading(false);
                        setProfiles(__spreadArray(__spreadArray([], __read(profiles), false), __read(items), false));
                        return [3, 5];
                    case 4:
                        setProfiles(profileData);
                        _b.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        err_1 = _b.sent();
                        console.log("Error fetching profiles... ", err_1);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    }
    function onEndReached() {
        if (infiniteScroll) {
            fetchNextItems();
        }
    }
    function fetchNextItems() {
        return __awaiter(this, void 0, void 0, function () {
            var next;
            return __generator(this, function (_a) {
                try {
                    next = paginationInfo.next;
                    fetchProfiles(next);
                }
                catch (err) {
                    console.log('Error fetching next items: ', err);
                }
                return [2];
            });
        });
    }
    function renderItem(_a) {
        var item = _a.item, index = _a.index;
        return (_jsx(ProfileListItem, { onProfilePress: onProfilePress, profile: item, onFollowPress: onFollowPress, isFollowing: item.isFollowing }, index));
    }
    return (_jsx(FlatList, { renderItem: renderItem, data: profiles, onEndReached: onEndReached, onEndReachedThreshold: onEndReachedThreshold, ListFooterComponent: loading ? (_jsx(ActivityIndicator, { style: styles.loadingIndicatorStyle })) : null }));
}
var styles = StyleSheet.create({
    loadingIndicatorStyle: {
        marginVertical: 20
    }
});
//# sourceMappingURL=Profiles.js.map