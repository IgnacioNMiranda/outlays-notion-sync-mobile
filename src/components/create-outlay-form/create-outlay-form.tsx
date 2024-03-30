import { IndexPath, Button } from '@ui-kitten/components'
import { useState } from 'react'
import { View, GestureResponderEvent, Alert, ScrollView } from 'react-native'
import { useMutation, useQuery } from 'react-query'
import { getSchema } from '../../services/notion/get-schema'
import { DateInput } from '../date-input/date-input'
import { TextInput } from '../text-input/text-input'
import { Select } from '../select/select'
import { FormData, getUpdatedFormState } from '../../utils/form'
import { CreateOutlayDTO } from '../../dtos/create-outlay-dto'
import { createOutlay } from '../../services/outlays/create-outlay'
import { Spinner } from '../spinner/spinner'
import { INITIAL_FORM_STATE } from './initial-state'
import { formStyles, inputStyles, submitButtonStyles } from './create-outlay-form.styles'

export const CreateOutlayForm = () => {
  const createOutlayMutation = useMutation('create-outlay', createOutlay)
  const { data } = useQuery('data', getSchema)

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE)

  const onDateChange = (selectedDate: Date) => {
    setFormData({ ...formData, date: { ...formData.date, value: selectedDate } })
  }

  const onPriceChange = (price: string) => {
    const sanitizedPrice = price.match(/^-?\d*$/)
    const finalPrice = (sanitizedPrice ?? '').toString()
    setFormData({ ...formData, price: { ...formData.price, value: finalPrice, error: !finalPrice } })
  }

  const onInstallmentsChange = (installments: string) => {
    const sanitizedInstallments = installments.match(/\d+/)
    const finalInstallments = (sanitizedInstallments ?? '').toString()
    setFormData({
      ...formData,
      installments: { ...formData.installments, value: finalInstallments, error: !finalInstallments },
    })
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmitPress = async (_e: GestureResponderEvent) => {
    const formState = getUpdatedFormState(formData)
    setFormData(formState.formData)

    if (!formState.hasErrors) {
      const date = formData.date.value.toISOString().split('T')[0]

      const body: CreateOutlayDTO = {
        name: formData.name.value,
        date,
        tags: formData.tags.value.map((tagIndex) => data.tags[tagIndex.row]),
        price: Number(formData.price.value),
        paymentMethod: formData.paymentMethod?.value && data.paymentMethods[formData.paymentMethod.value.row],
        installments: Number(formData.installments.value),
      }

      try {
        setIsSubmitting(true)

        const outlayData = await createOutlayMutation.mutateAsync(body)

        if (outlayData.data) {
          Alert.alert(`'${body.name}' outlay submitted!`)
          setFormData(INITIAL_FORM_STATE)
        } else {
          Alert.alert(`'${outlayData.error}'. Try again later.`)
        }
      } catch (error) {
        if (error instanceof Error) Alert.alert(`'${error.message}'. Try again later.`)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <View style={formStyles.container}>
      <ScrollView>
        <TextInput
          value={formData.name.value}
          label="Name"
          style={inputStyles.container}
          onChangeText={(text) => {
            setFormData({ ...formData, name: { ...formData.name, value: text, error: !text } })
          }}
          required
          hasError={formData.name.error}
        />
        <DateInput
          required
          label="Date"
          date={formData.date.value}
          onChange={onDateChange}
          style={{ marginBottom: 20 }}
        />
        <Select
          onSelect={(tags: IndexPath[]) => {
            setFormData({ ...formData, tags: { ...formData.tags, value: tags, error: !tags.length } })
          }}
          options={data?.tags ?? []}
          selectedIndex={formData.tags.value}
          style={{ marginBottom: 20, borderRadius: 2 }}
          label="Tags"
          placeholder="Select Tags"
          required
          hasError={formData.tags.error}
          multiSelect
        />
        <TextInput
          value={formData.price.value}
          label="Price"
          style={inputStyles.container}
          onChangeText={onPriceChange}
          keyboardType="number-pad"
          required
          hasError={formData.price.error}
        />
        <Select
          onSelect={(paymentMethod: IndexPath) =>
            setFormData({
              ...formData,
              paymentMethod: { ...formData.paymentMethod, value: paymentMethod, error: !paymentMethod },
            })
          }
          options={data?.paymentMethods ?? []}
          selectedIndex={formData.paymentMethod.value}
          style={{ marginBottom: 20, borderRadius: 2 }}
          label="Payment Method"
          placeholder="Select Payment Method"
          hasError={formData.paymentMethod.error}
          required
        />
        {formData.paymentMethod?.value && data.paymentMethods[formData.paymentMethod.value.row].includes('Credit') && (
          <TextInput
            value={formData.installments.value}
            label="Installments"
            style={inputStyles.container}
            onChangeText={onInstallmentsChange}
            keyboardType="number-pad"
            required
            hasError={formData.installments.error}
          />
        )}
        <Button
          onPress={onSubmitPress}
          style={[submitButtonStyles.container]}
          activeOpacity={1}
          disabled={isSubmitting}
          status="basic"
          accessoryLeft={isSubmitting && Spinner}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  )
}
