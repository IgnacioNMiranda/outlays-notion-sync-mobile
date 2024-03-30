import { Spinner as KittenSpinner, SpinnerProps } from '@ui-kitten/components'
import { View } from 'react-native'
import { spinnerStyles } from './spinner.styles'
import { RenderProp } from '@ui-kitten/components/devsupport'

export const Spinner = (props: SpinnerProps) => {
  return (
    <View style={[spinnerStyles.container]}>
      <KittenSpinner size={props?.size ?? 'small'} />
    </View>
  )
}