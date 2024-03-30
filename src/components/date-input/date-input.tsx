import { Datepicker } from '@ui-kitten/components'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { dateInputStyles } from './date-input.styles'
import { Text } from '../text/text'

export const DateInput = ({
  label = '',
  date,
  onChange,
  style,
  required = false,
}: {
  label?: string
  date: Date
  onChange: (selectedDate: Date) => void
  style?: StyleProp<ViewStyle>
  required?: boolean
}) => {
  const styles = StyleSheet.compose(dateInputStyles.container, style)

  return (
    <View style={styles}>
      {label && <Text fontWeight="bold" label={`${label} ${required ? '(required)' : ''}`} />}
      <Datepicker size="small" date={date} style={{ borderRadius: 3, backgroundColor: 'white' }} onSelect={onChange} />
    </View>
  )
}
