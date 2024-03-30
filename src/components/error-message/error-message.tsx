import { Text } from '../text/text'

export const ErrorMessage = ({
  show,
  required,
  customMessage = '',
}: {
  show: boolean
  required: boolean
  customMessage?: string
}) => {
  return (
    <>
      {show && required && <Text color="#774430" fontWeight="bold" label="This field is required" />}
      {show && !required && customMessage && <Text color="#774430" fontWeight="bold" label={customMessage} />}
    </>
  )
}
