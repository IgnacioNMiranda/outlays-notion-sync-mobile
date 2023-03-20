import { IndexPath, Text } from '@ui-kitten/components'
import { useState } from 'react'
import { View, StyleSheet, GestureResponderEvent, Alert, TouchableHighlight } from 'react-native'
import { DateInput } from './DateInput'
import { Input } from './Input'
import { Select } from './Select'

const formStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
})
const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
})
const submitButtonStyles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    width: 100,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
  },
})

const INITIAL_FORM_STATE = {
  name: '',
  customDate: undefined,
  tags: [new IndexPath(0), new IndexPath(1)],
  price: '',
  paymentMethod: '',
}

export const Form = () => {
  const [isSubmitPress, setIsSubmitPress] = useState(false)

  const onDateChange = (selectedDate: Date) => {
    setValues({ ...values, customDate: selectedDate })
  }

  const tagOptions = ['Apple', 'Banana']

  const [values, setValues] = useState(INITIAL_FORM_STATE)

  const onSubmitPress = (e: GestureResponderEvent) => {
    Alert.alert(JSON.stringify(values, null, 2))
    setValues(INITIAL_FORM_STATE)
  }

  return (
    <View style={formStyles.container}>
      <Input
        value={values.name}
        label="Name"
        style={inputStyles.container}
        onChangeText={(text) => setValues({ ...values, name: text })}
      />
      <DateInput label="Custom Date" date={values.customDate} onChange={onDateChange} style={{ marginBottom: 20 }} />
      <Select
        onSelect={(tags: IndexPath[]) => setValues({ ...values, tags })}
        items={tagOptions}
        selectedIndex={values.tags}
        style={{ marginBottom: 20, borderRadius: 2 }}
        label="Tags"
        multiSelect
      />
      <Input
        value={values.price}
        label="Price"
        style={inputStyles.container}
        onChangeText={(text) => setValues({ ...values, price: text })}
      />
      <Input
        value={values.paymentMethod}
        label="Payment Method"
        style={inputStyles.container}
        onChangeText={(text) => setValues({ ...values, paymentMethod: text })}
      />
      <TouchableHighlight
        underlayColor="#3E7A85"
        onPress={onSubmitPress}
        style={submitButtonStyles.container}
        activeOpacity={1}
        onHideUnderlay={() => setIsSubmitPress(false)}
        onShowUnderlay={() => setIsSubmitPress(true)}
      >
        <Text style={{ color: isSubmitPress ? 'white' : 'black', fontFamily: 'Sono' }}>Submit</Text>
      </TouchableHighlight>
    </View>
  )
}
