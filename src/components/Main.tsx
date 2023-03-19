import { Text, View } from 'react-native'
import Constants from 'expo-constants'

export const Main = () => {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1, backgroundColor: '#000' }}>
      <Text style={{ color: 'white' }}>Outlays Sync</Text>
    </View>
  )
}
