import { Datepicker, Text } from '@ui-kitten/components'
import { View, Appearance, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { dateInputStyles } from './date-input.styles'

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
  const colorSchema = Appearance.getColorScheme()
  const styles = StyleSheet.compose(dateInputStyles.container, style)

  return (
    <View style={styles}>
      {label && (
        <Text
          style={{
            color: colorSchema === 'dark' ? 'white' : 'black',
            fontWeight: 'bold',
            fontFamily: 'Sono',
            fontSize: 15,
            marginBottom: 5,
          }}
        >
          {label} {required ? '(required)' : ''}
        </Text>
      )}
      <Datepicker size="small" date={date} style={{ borderRadius: 3, backgroundColor: 'white' }} onSelect={onChange} />
    </View>
  )
}
