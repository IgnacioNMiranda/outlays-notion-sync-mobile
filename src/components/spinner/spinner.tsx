import { Spinner as KittenSpinner, SpinnerProps } from '@ui-kitten/components'
import { View } from 'react-native'
import { spinnerStyles } from './spinner.styles'

export const Spinner = ({ size = 'small' }: SpinnerProps) => {
  return (
    <View style={[spinnerStyles.container]}>
      <KittenSpinner size={size} />
    </View>
  )
}
