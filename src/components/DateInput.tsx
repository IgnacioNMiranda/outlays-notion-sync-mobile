import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { View, Text, Appearance } from 'react-native'

export const DateInput = ({ label = '' }: { label?: string }) => {
  const colorSchema = Appearance.getColorScheme()
  const [date, setDate] = useState(new Date(Date.now()))

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  return (
    <View style={{ width: '100%' }}>
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
          {label}
        </Text>
      )}
      <DateTimePicker
        value={date}
        display="default"
        mode="date"
        style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row-reverse' }}
        onChange={onChange}
      />
    </View>
  )
}
