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

interface FormData {
  name: string
  customDate: Date
  tags: IndexPath[]
  price: string
  paymentMethod: IndexPath
}

const INITIAL_FORM_STATE: FormData = {
  name: '',
  customDate: undefined,
  tags: [],
  price: '',
  paymentMethod: undefined,
}
const tags = ['Apple', 'Banana']
const paymentMethods = ['Transfer', 'National Credit', 'International Credit']

export const Form = () => {
  const [values, setValues] = useState<FormData>(INITIAL_FORM_STATE)

  const onDateChange = (selectedDate: Date) => {
    setValues({ ...values, customDate: selectedDate })
  }

  const onPriceChange = (price: string) => {
    const sanitizedPrice = price.match(/\d+/)
    if (sanitizedPrice) setValues({ ...values, price: sanitizedPrice.toString() })
  }

  const [isSubmitPress, setIsSubmitPress] = useState(false)
  const onSubmitPress = (e: GestureResponderEvent) => {
    const sanitizedValues = {
      ...values,
      tags: values.tags.map((tagIndex) => tags[tagIndex.row]),
      price: Number(values.price),
      paymentMethod: paymentMethods[values.paymentMethod.row],
    }
    Alert.alert('Submitted!')
    // @TODO: call API
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
        options={tags}
        selectedIndex={values.tags}
        style={{ marginBottom: 20, borderRadius: 2 }}
        label="Tags"
        placeholder="Select Tags"
        multiSelect
      />
      <Input
        value={values.price}
        label="Price"
        style={inputStyles.container}
        onChangeText={onPriceChange}
        keyboardType="number-pad"
      />
      <Select
        onSelect={(paymentMethod: IndexPath) => setValues({ ...values, paymentMethod })}
        options={paymentMethods}
        selectedIndex={values.paymentMethod}
        style={{ marginBottom: 20, borderRadius: 2 }}
        label="Payment Method"
        placeholder="Select Payment Method"
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
