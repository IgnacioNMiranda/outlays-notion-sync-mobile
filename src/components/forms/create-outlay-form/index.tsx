import { useState } from 'react'
import { View, GestureResponderEvent, Alert, ScrollView } from 'react-native'
import { Button, Text } from '@ui-kitten/components'

import { INITIAL_FORM_STATE } from './initial-state'
import { formStyles, inputStyles, submitButtonStyles } from './create-outlay-form.styles'
import { useOutlaySchema } from '../../../hooks/data/use-outlays-schema'
import { CreateOutlayDTO } from '../../../dtos/create-outlay-dto'
import { useCreateOutlay } from '../../../hooks/data/use-create-outlay'
import { useInvalidateData } from '../../../hooks/data/use-invalidate-data'
import { CreateOutlayFormData, getUpdatedFormState } from '../../../utils/form'
import { DateInput } from '../../inputs/date-input'
import { TextInput } from '../../inputs/text-input'
import { Spinner } from '../../spinner'
import { Select } from '../../inputs/select'

export const CreateOutlayForm = () => {
  const { createOutlay } = useCreateOutlay()
  const { availableTags, availablePaymentMethods, availableTypes } = useOutlaySchema()
  const { invalidateOutlays, invalidateSpentMoney } = useInvalidateData()

  const [formData, setFormData] = useState<CreateOutlayFormData>(INITIAL_FORM_STATE)

  const onTextInputChange = (key: keyof CreateOutlayFormData, value: string) => {
    setFormData({ ...formData, [key]: { ...formData[key], value, error: !value } })
  }

  const onDateChange = (selectedDate: Date) => {
    setFormData({ ...formData, date: { ...formData.date, value: selectedDate } })
  }

  const onPriceChange = (price: string) => {
    const sanitizedPrice = price.match(/^\d+$/)
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

    if (!formState.hasErrors && !!availableTags && !!availablePaymentMethods) {
      const date = formData.date.value.toISOString().split('T')[0]

      const typeValue = formData.type?.value && availableTypes[formData.type.value.row]

      const body: CreateOutlayDTO = {
        name: formData.name.value,
        date,
        tags: formData.tags.value.map((tagIndex) => availableTags[tagIndex.row]),
        price: Number(formData.price.value),
        paymentMethod:
          typeValue === 'Refund'
            ? undefined
            : formData.paymentMethod?.value && availablePaymentMethods[formData.paymentMethod.value.row],
        installments: Number(formData.installments.value),
        type: typeValue,
      }

      try {
        setIsSubmitting(true)

        const outlayData = await createOutlay(body)

        if (outlayData.data) {
          Alert.alert(`'${body.name}' outlay submitted!`)
          setFormData(INITIAL_FORM_STATE)
          setIsSubmitting(false)

          // refetch outlay data
          await Promise.all([invalidateOutlays(), invalidateSpentMoney()])
        } else {
          Alert.alert(`'${outlayData.error}'. Try again later.`)
          setIsSubmitting(false)
        }
      } catch (error) {
        if (error instanceof Error) Alert.alert(`'${error.message}'. Try again later.`)
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
            onTextInputChange('name', text)
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
          onSelect={(tags) => {
            if ('length' in tags)
              setFormData({ ...formData, tags: { ...formData.tags, value: tags, error: !tags.length } })
          }}
          options={availableTags ?? []}
          selectedIndex={formData.tags.value}
          style={{ marginBottom: 20, borderRadius: 2 }}
          label="Tags"
          placeholder="Select Tags"
          required
          hasError={formData.tags.error}
          multiSelect
        />
        <Select
          onSelect={(type) => {
            if (!('length' in type))
              setFormData({
                ...formData,
                type: { ...formData.type, value: type, error: !type },
              })
          }}
          options={availableTypes ?? []}
          selectedIndex={formData.type.value}
          style={{ marginBottom: 20, borderRadius: 2 }}
          label="Type"
          placeholder="Select Type"
          hasError={formData.type.error}
          required
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
        {availableTypes[formData.type?.value?.row] !== 'Refund' && (
          <Select
            onSelect={(paymentMethod) => {
              if (!('length' in paymentMethod))
                setFormData({
                  ...formData,
                  paymentMethod: { ...formData.paymentMethod, value: paymentMethod, error: !paymentMethod },
                })
            }}
            options={availablePaymentMethods ?? []}
            selectedIndex={formData.paymentMethod.value}
            style={{ marginBottom: 20, borderRadius: 2 }}
            label="Payment Method"
            placeholder="Select Payment Method"
            hasError={formData.paymentMethod.error}
            required
          />
        )}

        {formData.paymentMethod?.value &&
          availablePaymentMethods?.[formData.paymentMethod.value.row].includes('Credit') &&
          formData.type?.value?.toString() !== 'Refund' &&
          availableTypes[formData.type?.value?.row] !== 'Refund' && (
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
        {/* @ts-ignore using Spinner as-is actually works */}
        <Button
          onPress={onSubmitPress}
          style={[submitButtonStyles.container]}
          activeOpacity={1}
          disabled={isSubmitting}
          status="basic"
          {...(isSubmitting ? { accessoryLeft: Spinner } : {})}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  )
}
