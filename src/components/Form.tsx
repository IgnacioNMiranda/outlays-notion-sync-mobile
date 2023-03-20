import { useRef, useState } from 'react'
import { View, StyleSheet, Text, GestureResponderEvent, Alert, TouchableHighlight } from 'react-native'
import { Input } from './Input'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  input: {
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
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
    },
  })

  const [values, setValues] = useState(INITIAL_FORM_STATE)

  const onSubmitPress = (e: GestureResponderEvent) => {
    Alert.alert(JSON.stringify(values, null, 2))
    setValues(INITIAL_FORM_STATE)
  }

  return (
    <View style={styles.container}>
      <Input
        id="fds"
        value={values.name}
        label="Name"
        style={styles.input}
        onChangeText={(text) => setValues({ ...values, name: text })}
      />
      <Input
        value={values.customDate}
        label="Custom Date"
        style={styles.input}
        onChangeText={(text) => setValues({ ...values, customDate: text })}
      />
      <Input
        value={values.tags}
        label="Tags"
        style={styles.input}
        onChangeText={(text) => setValues({ ...values, tags: text })}
      />
      <Input
        value={values.price}
        label="Price"
        style={styles.input}
        onChangeText={(text) => setValues({ ...values, price: text })}
      />
      <Input
        value={values.paymentMethod}
        label="Payment Method"
        style={styles.input}
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
        <Text style={{ color: isSubmitPress ? 'white' : 'black' }}>Submit</Text>
      </TouchableHighlight>
    </View>
  )
}
