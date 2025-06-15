export interface CreateOutlayDTO {
  name: string
  date: string
  tags: string[]
  type: string
  price: number
  paymentMethod?: string
  installments: number
}
