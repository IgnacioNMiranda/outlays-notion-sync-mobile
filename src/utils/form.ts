import { IndexPath } from '@ui-kitten/components'
import { cloneDeep } from 'lodash'

interface FieldData<FieldValue> {
  value: FieldValue
  required: boolean
  error: boolean
}

export interface FormData {
  name: FieldData<string>
  date: FieldData<Date>
  tags: FieldData<IndexPath[]>
  price: FieldData<string>
  paymentMethod: FieldData<IndexPath>
  installments: FieldData<string>
}

export const getUpdatedFormState = (formData: FormData) => {
  const newFormData = cloneDeep<FormData>(formData)

  Object.keys(newFormData).forEach((key) => {
    const formKey = key as keyof FormData
    if (newFormData[formKey].required) {
      const isInvalidString = typeof newFormData[formKey].value === 'string' && !newFormData[formKey].value
      const isInvalidArray =
        typeof newFormData[formKey].value === 'object' &&
        Array.isArray(newFormData[formKey].value) &&
        !(newFormData[formKey].value instanceof Date) &&
        !(newFormData[formKey].value as IndexPath[]).length
      const isUndefined = typeof newFormData[formKey].value === 'undefined'

      if (isInvalidString || isInvalidArray || isUndefined) {
        newFormData[formKey].error = true
      }
    }
  })

  return {
    hasErrors: Object.keys(formData).some((key) => {
      const formKey = key as keyof FormData

      if (formData[formKey].required && !formData[formKey].value && typeof formData[formKey].value !== 'boolean')
        return true
    }),
    formData: newFormData,
  }
}
