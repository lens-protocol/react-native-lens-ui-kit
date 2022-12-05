import Svg, { Path, G } from 'react-native-svg'
import { TouchableHighlight } from 'react-native'

export function CommentIcon({
  iconSize = "16",
  color = "black",
  onPress = () => {},
  width = 16
}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={{width}}
    >
      <Svg
        width={iconSize} height={iconSize} fill={color} viewBox="-50 -50 1200 1200"
      >
        <Path d="m898 300c55.141 0 98.004 44.855 98.004 99.996v300c0 55.141-40.859 104-96 104h-150c-70.43 0-128.07 37.656-185.76 76.02-20.531 13.656-48.238 25.488-60.238 37.32v-113.34h-204c-55.141 0-96-48.863-96-104v-300c0-55.141 40.859-99.996 96-99.996h600m0-96h-600c-110.46 0-204 85.535-204 196v300c0 110.46 93.539 200 204 200h96v150c156 0 262.33-150 354-150h150c110.46 0 204-89.543 204-200v-300c0-110.46-93.551-196-204-196z"/>
      </Svg>
    </TouchableHighlight>
  )
}