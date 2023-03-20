import { useState } from 'react'
import { View, StyleSheet, Text, GestureResponderEvent, Alert, TouchableHighlight } from 'react-native'
import { DateInput } from './DateInput'
import { Input } from './Input'

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

const INITIAL_FORM_STATE = {
  name: '',
  customDate: '',
  tags: '',
  price: '',
  paymentMethod: '',
}

export const Form = () => {
  const [isSubmitPress, setIsSubmitPress] = useState(false)
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
      <DateInput label="Custom Date" />
      <Input
        value={values.tags}
        label="Tags"
        style={inputStyles.container}
        onChangeText={(text) => setValues({ ...values, tags: text })}
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
