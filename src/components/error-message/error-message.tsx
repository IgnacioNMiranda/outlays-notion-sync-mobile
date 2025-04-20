import { CustomText } from '../custom-text'

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
      {show && required && <CustomText status="danger" fontWeight="bold" label="This field is required" />}
      {show && !required && customMessage && <CustomText status="danger" fontWeight="bold" label={customMessage} />}
    </>
  )
}
