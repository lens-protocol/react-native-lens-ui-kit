import Svg, { Path, G } from 'react-native-svg'
import { TouchableHighlight } from 'react-native'

export function CollectIcon({
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
        width={iconSize} height={iconSize} fill={color} viewBox="-260 -170 1600 1600"
      >
        <G>
          <Path d="m862.5 1200c20.738 0 37.5-16.762 37.5-37.5s-16.762-37.5-37.5-37.5h-787.5v-750h1050v750h-112.5c-20.738 0-37.5 16.762-37.5 37.5s16.762 37.5 37.5 37.5h112.5c41.398 0 75-33.602 75-75v-750c0-41.398-33.602-75-75-75h-1050c-41.398 0-75 33.602-75 75v750c0 41.398 33.602 75 75 75z"/>
          <Path d="m112.5 225c-20.738 0-37.5-16.762-37.5-37.5s16.762-37.5 37.5-37.5h975c20.738 0 37.5 16.762 37.5 37.5s-16.762 37.5-37.5 37.5z"/>
          <Path d="m187.5 75c-20.738 0-37.5-16.762-37.5-37.5s16.762-37.5 37.5-37.5h825c20.738 0 37.5 16.762 37.5 37.5s-16.762 37.5-37.5 37.5z"/>
        </G>
      </Svg>
    </TouchableHighlight>
  )
}