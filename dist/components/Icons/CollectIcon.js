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
import Svg, { Path, G } from 'react-native-svg';
import { TouchableHighlight } from 'react-native';
export function CollectIcon(_a) {
    var _b = _a.iconSize, iconSize = _b === void 0 ? "16" : _b, _c = _a.color, color = _c === void 0 ? "black" : _c, _d = _a.onPress, onPress = _d === void 0 ? function () { } : _d, _e = _a.width, width = _e === void 0 ? 16 : _e;
    return (_jsx(TouchableHighlight, __assign({ onPress: onPress, underlayColor: "transparent", style: { width: width } }, { children: _jsx(Svg, __assign({ width: iconSize, height: iconSize, fill: color, viewBox: "-260 -170 1600 1600" }, { children: _jsxs(G, { children: [_jsx(Path, { d: "m862.5 1200c20.738 0 37.5-16.762 37.5-37.5s-16.762-37.5-37.5-37.5h-787.5v-750h1050v750h-112.5c-20.738 0-37.5 16.762-37.5 37.5s16.762 37.5 37.5 37.5h112.5c41.398 0 75-33.602 75-75v-750c0-41.398-33.602-75-75-75h-1050c-41.398 0-75 33.602-75 75v750c0 41.398 33.602 75 75 75z" }), _jsx(Path, { d: "m112.5 225c-20.738 0-37.5-16.762-37.5-37.5s16.762-37.5 37.5-37.5h975c20.738 0 37.5 16.762 37.5 37.5s-16.762 37.5-37.5 37.5z" }), _jsx(Path, { d: "m187.5 75c-20.738 0-37.5-16.762-37.5-37.5s16.762-37.5 37.5-37.5h825c20.738 0 37.5 16.762 37.5 37.5s-16.762 37.5-37.5 37.5z" })] }) })) })));
}
//# sourceMappingURL=CollectIcon.js.map