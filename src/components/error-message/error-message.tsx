import { Text } from '@ui-kitten/components'

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
      {show && required && (
        <Text
          style={{
            color: '#774430',
            fontWeight: 'bold',
            fontFamily: 'Sono',
            fontSize: 15,
            marginTop: 4,
          }}
        >
          This field is required
        </Text>
      )}
      {show && !required && customMessage && (
        <Text
          style={{
            color: '#774430',
            fontWeight: 'bold',
            fontFamily: 'Sono',
            fontSize: 15,
            marginTop: 4,
          }}
        >
          {customMessage}
        </Text>
      )}
    </>
  )
}
