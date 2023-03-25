import { Spinner as KittenSpinner, SpinnerProps } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'

const spinnerStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const Spinner = ({ size = 'small' }: SpinnerProps) => {
  return (
    <View style={[spinnerStyles.container]}>
      <KittenSpinner size={size} />
    </View>
  )
}
