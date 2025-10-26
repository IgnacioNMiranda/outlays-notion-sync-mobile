export interface CreateOutlayDTO {
  name: string
  date: string
  tags: string[]
  refund?: number
  price: number
  paymentMethod?: string
  installments: number
}
