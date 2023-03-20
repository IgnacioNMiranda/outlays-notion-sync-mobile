import { IndexPath, Text } from '@ui-kitten/components'
import { useState } from 'react'
import { View, StyleSheet, GestureResponderEvent, Alert, TouchableHighlight } from 'react-native'
import { useQuery } from 'react-query'
import { getData } from '../services/notion/common'
import { DateInput } from './DateInput'
import { Input } from './Input'
import { Select } from './Select'
import { FormData, getUpdatedFormState, resetForm } from '../utils/form'

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

const INITIAL_FORM_STATE: FormData = {
  name: {
    value: '',
    required: true,
    error: false,
  },
  customDate: {
    value: undefined,
    required: false,
    error: false,
  },
  tags: {
    value: [],
    required: true,
    error: false,
  },
  price: {
    value: '',
    required: true,
    error: false,
  },
  paymentMethod: {
    value: undefined,
    required: true,
    error: false,
  },
}

export const Form = () => {
  const { data } = useQuery('data', getData)

  const [values, setValues] = useState<FormData>(INITIAL_FORM_STATE)

  const onDateChange = (selectedDate: Date) => {
    setValues({ ...values, customDate: { ...values.customDate, value: selectedDate } })
  }

  const onPriceChange = (price: string) => {
    const sanitizedPrice = price.match(/\d+/)
    const finalPrice = (sanitizedPrice ?? '').toString()
    setValues({ ...values, price: { ...values.price, value: finalPrice, error: !finalPrice } })
  }

  const [isSubmitPress, setIsSubmitPress] = useState(false)
  const onSubmitPress = (e: GestureResponderEvent) => {
    const formState = getUpdatedFormState(values)
    setValues(formState.values)
    if (!formState.hasErrors) {
      const sanitizedValues = {
        ...values,
        tags: values.tags.value.map((tagIndex) => data.tags[tagIndex.row]),
        price: Number(values.price),
        paymentMethod: values.paymentMethod?.value && data.paymentMethods[values.paymentMethod.value.row],
      }
      Alert.alert('Submitted!')
      // @TODO: call API
      const resettedFormValues = resetForm(values, INITIAL_FORM_STATE)
      setValues(resettedFormValues)
    }
  }

  return (
    <View style={formStyles.container}>
      <Input
        value={values.name.value}
        label="Name"
        style={inputStyles.container}
        onChangeText={(text) => {
          setValues({ ...values, name: { ...values.name, value: text, error: !text } })
        }}
        required
        hasError={values.name.error}
      />
      <DateInput
        label="Custom Date"
        date={values.customDate.value}
        onChange={onDateChange}
        style={{ marginBottom: 20 }}
      />
      <Select
        onSelect={(tags: IndexPath[]) => {
          setValues({ ...values, tags: { ...values.tags, value: tags, error: !tags.length } })
        }}
        options={data?.tags ?? []}
        selectedIndex={values.tags.value}
        style={{ marginBottom: 20, borderRadius: 2 }}
        label="Tags"
        placeholder="Select Tags"
        required
        hasError={values.tags.error}
        multiSelect
      />
      <Input
        value={values.price.value}
        label="Price"
        style={inputStyles.container}
        onChangeText={onPriceChange}
        keyboardType="number-pad"
        required
        hasError={values.price.error}
      />
      <Select
        onSelect={(paymentMethod: IndexPath) =>
          setValues({
            ...values,
            paymentMethod: { ...values.paymentMethod, value: paymentMethod, error: !paymentMethod },
          })
        }
        options={data?.paymentMethods ?? []}
        selectedIndex={values.paymentMethod.value}
        style={{ marginBottom: 20, borderRadius: 2 }}
        label="Payment Method"
        placeholder="Select Payment Method"
        hasError={values.paymentMethod.error}
        required
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
