export const getStatusError = (status: number) => {
  switch (status) {
    case 403:
      return 'Unauthorized'

    case 400:
      return 'Fields wrongly formatted'
    default:
      return 'Unexpected Error.'
  }
}
