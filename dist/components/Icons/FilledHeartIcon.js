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
import { jsx as _jsx } from "react/jsx-runtime";
import Svg, { Path } from 'react-native-svg';
import { TouchableHighlight } from 'react-native';
export function FilledHeartIcon(_a) {
    var _b = _a.iconSize, iconSize = _b === void 0 ? "16" : _b, _c = _a.color, color = _c === void 0 ? "black" : _c, _d = _a.onPress, onPress = _d === void 0 ? function () { } : _d, _e = _a.width, width = _e === void 0 ? 16 : _e;
    return (_jsx(TouchableHighlight, __assign({ onPress: onPress, underlayColor: "transparent", style: { width: width } }, { children: _jsx(Svg, __assign({ width: iconSize, height: iconSize, fill: color, viewBox: "0 0 1200 1200" }, { children: _jsx(Path, { d: "m1003.5 702.07-380.66 304.66c-13.348 10.684-32.312 10.715-45.691 0.074219l-383.27-304.73c-306.86-306.86 97.953-711.67 404.81-404.81 311.57-311.57 716.38 93.238 404.81 404.81z" }) })) })));
}
//# sourceMappingURL=FilledHeartIcon.js.map