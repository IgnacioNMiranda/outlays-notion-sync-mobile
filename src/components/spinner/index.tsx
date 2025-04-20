import { Spinner as KittenSpinner, SpinnerProps } from '@ui-kitten/components'
import { View } from 'react-native'

import { spinnerStyles } from './spinner.styles'

export const Spinner = (props: SpinnerProps) => {
  return (
    <View style={[spinnerStyles.container]}>
      <KittenSpinner status={props.status ?? 'basic'} size={props?.size ?? 'small'} />
    </View>
  )
}
