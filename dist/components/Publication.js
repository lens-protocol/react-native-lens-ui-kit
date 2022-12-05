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
import { View, StyleSheet, Text, Dimensions, Image, TouchableHighlight } from 'react-native';
import { formatDistanceStrict } from 'date-fns';
import { returnIPFSPathorURL } from '../utils';
import { CommentIcon, MirrorIcon, CollectIcon, UnfilledHeartIcon, FilledHeartIcon } from './';
var width = Dimensions.get('window').width;
export function Publication(_a) {
    var publication = _a.publication, _b = _a.signedInUser, signedInUser = _b === void 0 ? null : _b, _c = _a.onCollectPress, onCollectPress = _c === void 0 ? function (publication) { return console.log(publication); } : _c, _d = _a.onCommentPress, onCommentPress = _d === void 0 ? function (publication) { return console.log(publication); } : _d, _e = _a.onMirrorPress, onMirrorPress = _e === void 0 ? function (publication) { return console.log(publication); } : _e, _f = _a.onLikePress, onLikePress = _f === void 0 ? function (publication) { return console.log(publication); } : _f, _g = _a.hideLikes, hideLikes = _g === void 0 ? false : _g, _h = _a.hideComments, hideComments = _h === void 0 ? false : _h, _j = _a.hideMirrors, hideMirrors = _j === void 0 ? false : _j, _k = _a.hideCollects, hideCollects = _k === void 0 ? false : _k, _l = _a.onProfileImagePress, onProfileImagePress = _l === void 0 ? function (publication) { return console.log(publication); } : _l;
    return (_jsxs(View, __assign({ style: styles.publicationWrapper }, { children: [_jsxs(View, __assign({ style: styles.publicationContainer }, { children: [_jsx(View, { children: _jsx(TouchableHighlight, __assign({ underlayColor: 'transparent', onPress: function () { return onProfileImagePress(publication); } }, { children: publication.profile.missingAvatar ? (_jsx(View, { style: styles.missingAvatarPlaceholder })) : (_jsx(Image, { source: {
                                    uri: publication.profile.picture.original.url
                                }, style: styles.smallAvatar })) })) }), _jsxs(View, __assign({ style: styles.postContentContainer }, { children: [publication.mirrorOf && (_jsxs(View, __assign({ style: styles.mirrorContainer }, { children: [_jsx(MirrorIcon, { color: "rgba(0, 0, 0, .6)" }), _jsxs(Text, __assign({ style: styles.mirrorText }, { children: ["Mirrored by ", publication.originalProfile.name] }))] }))), _jsxs(View, __assign({ style: styles.postOwnerDetailsContainer }, { children: [_jsx(Text, __assign({ style: styles.postOwnerName }, { children: publication.profile.name })), _jsxs(Text, __assign({ style: styles.postOwnerHandle }, { children: ["@", publication.profile.handle] })), _jsxs(Text, __assign({ style: styles.timestamp }, { children: ["\u2022 ", reduceDate(publication.createdAt)] }))] })), publication.metadata.content && (_jsx(Text, __assign({ style: styles.postText }, { children: publication.metadata.content }))), Number(publication.metadata.media.length) > 0 && (_jsx(Image, { resizeMode: "contain", source: {
                                    uri: returnIPFSPathorURL(publication.metadata.media[0].original.url)
                                }, style: styles.metadataImage }))] }))] })), publication.stats && (_jsxs(View, __assign({ style: styles.statsContainer }, { children: [!hideComments && (_jsxs(View, __assign({ style: styles.statsDetailContainer }, { children: [_jsx(CommentIcon, { onPress: function () { return onCommentPress(publication); } }), _jsx(Text, __assign({ style: styles.statsDetailText }, { children: publication.stats.totalAmountOfComments }))] }))), !hideMirrors && (_jsxs(View, __assign({ style: styles.statsDetailContainer }, { children: [_jsx(MirrorIcon, { onPress: function () { return onMirrorPress(publication); } }), _jsx(Text, __assign({ style: styles.statsDetailText }, { children: publication.stats.totalAmountOfMirrors }))] }))), !hideCollects && (_jsxs(View, __assign({ style: styles.statsDetailContainer }, { children: [_jsx(CollectIcon, { onPress: function () { return onCollectPress(publication); } }), _jsx(Text, __assign({ style: styles.statsDetailText }, { children: publication.stats.totalAmountOfCollects }))] }))), !signedInUser && !hideLikes && (_jsxs(View, __assign({ style: styles.statsDetailContainer }, { children: [_jsx(UnfilledHeartIcon, { onPress: function () { return onLikePress(publication); } }), _jsx(Text, __assign({ style: styles.statsDetailText }, { children: publication.stats.totalUpvotes }))] }))), signedInUser && !hideLikes && (_jsxs(View, __assign({ style: styles.statsDetailContainer }, { children: [_jsx(FilledHeartIcon, { onPress: function () { return onLikePress(publication); } }), _jsx(Text, __assign({ style: styles.statsDetailText }, { children: publication.stats.totalUpvotes }))] })))] })))] }), publication.id));
}
function reduceDate(date) {
    var formattedDate = formatDistanceStrict(new Date(date), new Date());
    var dateArr = formattedDate.split(' ');
    var dateInfo = dateArr[1].charAt(0);
    return "".concat(dateArr[0]).concat(dateInfo);
}
var styles = StyleSheet.create({
    publicationWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, .05)',
        padding: 20
    },
    publicationContainer: {
        flexDirection: 'row'
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
        borderRadius: 20
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
        height: width - 100
    },
    statsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        paddingLeft: 20
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
        marginBottom: 10
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
});
//# sourceMappingURL=Publication.js.map