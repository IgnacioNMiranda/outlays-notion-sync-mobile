import { IndexPath } from '@ui-kitten/components'
import { cloneDeep } from 'lodash'

interface FieldData<FieldValue> {
  value: FieldValue
  required: boolean
  error: boolean
}

export interface FormData {
  name: FieldData<string>
  customDate: FieldData<Date>
  tags: FieldData<IndexPath[]>
  price: FieldData<string>
  paymentMethod: FieldData<IndexPath>
  isCredit: FieldData<boolean>
}

export const getUpdatedFormState = (formData: FormData) => {
  const newFormData = cloneDeep<FormData>(formData)

  Object.keys(newFormData).forEach((key: keyof FormData) => {
    if (newFormData[key].required) {
      const isInvalidString = typeof newFormData[key].value === 'string' && !newFormData[key].value
      const isInvalidArray =
        typeof newFormData[key].value === 'object' &&
        Array.isArray(newFormData[key].value) &&
        !(newFormData[key].value instanceof Date) &&
        !(newFormData[key].value as IndexPath[]).length
      const isUndefined = typeof newFormData[key].value === 'undefined'

      if (isInvalidString || isInvalidArray || isUndefined) {
        newFormData[key].error = true
      }
    }
  })

  return {
    hasErrors: Object.keys(formData).some((key: keyof FormData) => {
      if (formData[key].required && !formData[key].value && typeof formData[key].value !== 'boolean') return true
    }),
    values: newFormData,
  }
}

export const resetForm = (formData: FormData, initialState: FormData) => {
  const newFormData = cloneDeep<FormData>(formData)

  Object.keys(formData).forEach((key: keyof FormData) => {
    newFormData[key].value = initialState[key].value
    newFormData[key].error = initialState[key].error
  })

  return newFormData
}
