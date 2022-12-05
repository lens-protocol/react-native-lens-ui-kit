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
export function CommentIcon(_a) {
    var _b = _a.iconSize, iconSize = _b === void 0 ? "16" : _b, _c = _a.color, color = _c === void 0 ? "black" : _c, _d = _a.onPress, onPress = _d === void 0 ? function () { } : _d, _e = _a.width, width = _e === void 0 ? 16 : _e;
    return (_jsx(TouchableHighlight, __assign({ onPress: onPress, underlayColor: "transparent", style: { width: width } }, { children: _jsx(Svg, __assign({ width: iconSize, height: iconSize, fill: color, viewBox: "-50 -50 1200 1200" }, { children: _jsx(Path, { d: "m898 300c55.141 0 98.004 44.855 98.004 99.996v300c0 55.141-40.859 104-96 104h-150c-70.43 0-128.07 37.656-185.76 76.02-20.531 13.656-48.238 25.488-60.238 37.32v-113.34h-204c-55.141 0-96-48.863-96-104v-300c0-55.141 40.859-99.996 96-99.996h600m0-96h-600c-110.46 0-204 85.535-204 196v300c0 110.46 93.539 200 204 200h96v150c156 0 262.33-150 354-150h150c110.46 0 204-89.543 204-200v-300c0-110.46-93.551-196-204-196z" }) })) })));
}
//# sourceMappingURL=CommentIcon.js.map