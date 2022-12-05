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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { client } from '../api';
import { configureIPFSURL } from '../utils';
import { Publication } from './Publication';
import { ExplorePublicationsDocument, PublicationsDocument } from '../graphql/generated';
export function Feed(_a) {
    var _b = _a.query, query = _b === void 0 ? {
        name: "explorePublications",
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        sortCriteria: "LATEST",
        limit: 20
    } : _b, _c = _a.ListHeaderComponent, ListHeaderComponent = _c === void 0 ? null : _c, _d = _a.ListFooterComponent, ListFooterComponent = _d === void 0 ? null : _d, _e = _a.feed, feed = _e === void 0 ? null : _e, _f = _a.signedInUser, signedInUser = _f === void 0 ? null : _f, _g = _a.hideLikes, hideLikes = _g === void 0 ? false : _g, _h = _a.hideComments, hideComments = _h === void 0 ? false : _h, _j = _a.hideMirrors, hideMirrors = _j === void 0 ? false : _j, _k = _a.hideCollects, hideCollects = _k === void 0 ? false : _k, _l = _a.infiniteScroll, infiniteScroll = _l === void 0 ? true : _l, _m = _a.onEndReachedThreshold, onEndReachedThreshold = _m === void 0 ? .65 : _m, _o = _a.onCollectPress, onCollectPress = _o === void 0 ? function (publication) { return console.log({ publication: publication }); } : _o, _p = _a.onCommentPress, onCommentPress = _p === void 0 ? function (publication) { return console.log({ publication: publication }); } : _p, _q = _a.onMirrorPress, onMirrorPress = _q === void 0 ? function (publication) { return console.log({ publication: publication }); } : _q, _r = _a.onLikePress, onLikePress = _r === void 0 ? function (publication) { return console.log({ publication: publication }); } : _r, _s = _a.onProfileImagePress, onProfileImagePress = _s === void 0 ? function (publication) { return console.log({ publication: publication }); } : _s;
    var _t = __read(useState([]), 2), publications = _t[0], setPublications = _t[1];
    var _u = __read(useState(), 2), paginationInfo = _u[0], setPaginationInfo = _u[1];
    var _v = __read(useState(false), 2), loading = _v[0], setLoading = _v[1];
    useEffect(function () {
        fetchPublications();
    }, []);
    function fetchResponse(cursor) {
        if (cursor === void 0) { cursor = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, pageInfo, items, err_1, _b, pageInfo, items, _c, pageInfo, items, err_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(query.name === 'explorePublications')) return [3, 4];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4, client.query(ExplorePublicationsDocument, {
                                request: {
                                    cursor: cursor,
                                    publicationTypes: query.publicationTypes,
                                    sortCriteria: query.sortCriteria,
                                    limit: query.limit
                                }
                            }).toPromise()];
                    case 2:
                        _a = (_d.sent()).data.explorePublications, pageInfo = _a.pageInfo, items = _a.items;
                        return [2, {
                                pageInfo: pageInfo,
                                items: items
                            }];
                    case 3:
                        err_1 = _d.sent();
                        console.log('Error fetching explorePublications: ', err_1);
                        return [3, 4];
                    case 4:
                        if (!(query.name === 'getPublications')) return [3, 6];
                        return [4, client.query(PublicationsDocument, {
                                request: {
                                    profileId: query.profileId,
                                    cursor: cursor,
                                    publicationTypes: query.publicationTypes
                                }
                            }).toPromise()];
                    case 5:
                        _b = (_d.sent()).data.publications, pageInfo = _b.pageInfo, items = _b.items;
                        return [2, {
                                pageInfo: pageInfo,
                                items: items
                            }];
                    case 6:
                        if (!(query.name === 'getComments')) return [3, 10];
                        _d.label = 7;
                    case 7:
                        _d.trys.push([7, 9, , 10]);
                        return [4, client.query(PublicationsDocument, {
                                request: {
                                    commentsOf: query.publicationId,
                                    cursor: cursor
                                }
                            }).toPromise()];
                    case 8:
                        _c = (_d.sent()).data.publications, pageInfo = _c.pageInfo, items = _c.items;
                        return [2, {
                                pageInfo: pageInfo,
                                items: items
                            }];
                    case 9:
                        err_2 = _d.sent();
                        console.log('error fetching comments...', err_2);
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    }
    function fetchNextItems() {
        return __awaiter(this, void 0, void 0, function () {
            var next;
            return __generator(this, function (_a) {
                try {
                    next = paginationInfo.next;
                    fetchPublications(next);
                }
                catch (err) {
                    console.log('Error fetching next items:', err);
                }
                return [2];
            });
        });
    }
    function fetchPublications(cursor) {
        if (cursor === void 0) { cursor = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, items, pageInfo, newData, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!(!feed ||
                            feed && cursor)) return [3, 2];
                        setLoading(true);
                        return [4, fetchResponse(cursor)];
                    case 1:
                        _a = _b.sent(), items = _a.items, pageInfo = _a.pageInfo;
                        setPaginationInfo(pageInfo);
                        items = items.filter(function (item) {
                            var media = item.metadata.media;
                            if (media.length) {
                                if (media[0].original) {
                                    if (media[0].original.mimeType === 'image/jpeg')
                                        return true;
                                    if (media[0].original.mimeType === 'image/png')
                                        return true;
                                    return false;
                                }
                            }
                            else {
                                return true;
                            }
                        });
                        items = items.map(function (item) {
                            if (item.profileSet)
                                return item;
                            var profile = item.profile;
                            if (item.mirrorOf) {
                                item.originalProfile = profile;
                                item.stats = item.mirrorOf.stats;
                                profile = item.mirrorOf.profile;
                            }
                            if (profile.picture && profile.picture.original) {
                                var url = configureIPFSURL(profile.picture.original.url);
                                if (url) {
                                    profile.picture.original.url = url;
                                }
                                else {
                                    profile.missingAvatar = true;
                                }
                            }
                            else {
                                profile.missingAvatar = true;
                            }
                            item.profile = profile;
                            item.profileSet = true;
                            return item;
                        });
                        if (cursor) {
                            newData = __spreadArray(__spreadArray([], __read(publications), false), __read(items), false);
                            if (query.sortCriteria === "LATEST") {
                                newData = __spreadArray([], __read(new Map(newData.map(function (m) { return [m.id, m]; })).values()), false);
                            }
                            setPublications(newData);
                        }
                        else {
                            setPublications(items);
                        }
                        setLoading(false);
                        return [3, 3];
                    case 2:
                        setPublications(feed);
                        _b.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        err_3 = _b.sent();
                        console.log('error fetching publications...', err_3);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    }
    function onEndReached() {
        if (infiniteScroll) {
            fetchNextItems();
        }
    }
    function renderItem(_a) {
        var item = _a.item, index = _a.index;
        return (_jsx(Publication, { publication: item, signedInUser: signedInUser, onCollectPress: onCollectPress, onCommentPress: onCommentPress, onMirrorPress: onMirrorPress, onLikePress: onLikePress, hideLikes: hideLikes, hideComments: hideComments, hideMirrors: hideMirrors, hideCollects: hideCollects, onProfileImagePress: onProfileImagePress }, index));
    }
    return (_jsxs(View, __assign({ style: styles.container }, { children: [!loading &&
                publications.length === Number(0) &&
                query.name === 'getComments' && (_jsx(Text, __assign({ style: styles.noCommentsMessage }, { children: "No comments..." }))), _jsx(FlatList, { data: publications, ListHeaderComponent: ListHeaderComponent, renderItem: renderItem, onEndReached: onEndReached, onEndReachedThreshold: onEndReachedThreshold, ListFooterComponent: ListFooterComponent ?
                    ListFooterComponent :
                    loading ? (_jsx(ActivityIndicator, { style: styles.loadingIndicatorStyle })) : null })] })));
}
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingIndicatorStyle: {
        marginVertical: 20
    },
    noCommentsMessage: {
        margin: 20,
        fontSize: 14,
        fontWeight: '500'
    }
});
//# sourceMappingURL=Feed.js.map