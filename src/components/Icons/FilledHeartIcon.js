import Svg, { Path } from 'react-native-svg'
import { TouchableHighlight } from 'react-native'

export function FilledHeartIcon({
  iconSize = "16",
  color = "black",
  onPress = () => {},
  width = 16
}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={{ width }}
    >
      <Svg
        width={iconSize} height={iconSize} fill={color} viewBox="0 0 1200 1200"
      >
        <Path d="m1003.5 702.07-380.66 304.66c-13.348 10.684-32.312 10.715-45.691 0.074219l-383.27-304.73c-306.86-306.86 97.953-711.67 404.81-404.81 311.57-311.57 716.38 93.238 404.81 404.81z"/>
      </Svg>
    </TouchableHighlight>
  )
}