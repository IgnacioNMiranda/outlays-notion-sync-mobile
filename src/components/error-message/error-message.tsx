import { Text } from '../text'

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
      {show && required && <Text status="danger" fontWeight="bold" label="This field is required" />}
      {show && !required && customMessage && <Text status="danger" fontWeight="bold" label={customMessage} />}
    </>
  )
}
