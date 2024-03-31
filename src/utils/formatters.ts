export const formatCurrency = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CLP',
    currencyDisplay: 'symbol',
  })
    .format(num)
    .replace(/CLP\s{1}/, '$')
}
