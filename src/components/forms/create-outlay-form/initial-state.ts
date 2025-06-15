import { IndexPath } from '@ui-kitten/components'
import { CreateOutlayFormData } from '../../../utils/form'

export const INITIAL_FORM_STATE: CreateOutlayFormData = {
  name: {
    value: '',
    required: true,
    error: false,
  },
  date: {
    value: new Date(),
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
  installments: {
    value: '1',
    required: false,
    error: false,
  },
  paymentMethod: {
    // @ts-ignore
    value: undefined,
    required: false,
    error: false,
  },
  type: {
    // Using IndexPath(0) for now since type options are static
    value: new IndexPath(0),
    required: true,
    error: false,
  },
}
