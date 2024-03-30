import { FormData } from '../../utils/form'

export const INITIAL_FORM_STATE: FormData = {
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
    required: true,
    error: false,
  },
  paymentMethod: {
    // @ts-ignore
    value: undefined,
    required: true,
    error: false,
  },
}
