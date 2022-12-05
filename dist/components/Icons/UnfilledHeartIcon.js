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
export function UnfilledHeartIcon(_a) {
    var _b = _a.iconSize, iconSize = _b === void 0 ? "16" : _b, _c = _a.color, color = _c === void 0 ? "black" : _c, _d = _a.onPress, onPress = _d === void 0 ? function () { } : _d, _e = _a.width, width = _e === void 0 ? 16 : _e;
    return (_jsx(TouchableHighlight, __assign({ onPress: onPress, underlayColor: "transparent", style: { width: width } }, { children: _jsx(Svg, __assign({ width: iconSize, height: iconSize, fill: color, viewBox: "0 0 1200 1200" }, { children: _jsx(Path, { d: "m599.93 1038.4c-13.219 0-26.426-4.3828-37.465-13.16l-383.51-304.92c-0.71484-0.5625-1.3945-1.1719-2.0352-1.8164-162.23-162.22-136.75-357.46-27.738-466.47 105.22-105.23 290.81-132.61 449.48 11.539 160.91-146.61 347.74-120.37 453.05-15.078 109.01 109.01 133.28 305.45-31.266 470-0.62109 0.62109-1.2773 1.2188-1.9688 1.7695l-380.91 304.86c-11.074 8.8594-24.363 13.289-37.641 13.289zm-390.02-354.8 382.43 304.07c4.4766 3.5625 10.738 3.5508 15.246-0.035157l379.85-304.01c147.83-148.64 119.46-312.08 30.328-401.2-89.309-89.309-253.23-117.61-402.12 31.27-9.3633 9.375-24.562 9.375-33.938 0-146.46-146.46-309.3-117.02-398.58-27.73-89.117 89.117-118.58 251.43 26.781 397.64zm793.57 17.918h0.11719z" }) })) })));
}
//# sourceMappingURL=UnfilledHeartIcon.js.map