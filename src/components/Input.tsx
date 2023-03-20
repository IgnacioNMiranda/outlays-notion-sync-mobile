import { StyleSheet, TextInputProps, Appearance, View } from 'react-native'
import { Input as InputKitten, Text } from '@ui-kitten/components'
import { ErrorMessage } from './ErrorMessage'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
  },
  error: {
    borderColor: '#774430',
  },
  normal: {},
})

export interface InputProps extends TextInputProps {
  label?: string
  hasError?: boolean
  required?: boolean
  errorMessage?: string
}

export const Input = ({
  label = '',
  value,
  onChangeText,
  keyboardType = 'default',
  onChange,
  hasError = false,
  required = false,
  errorMessage = '',
  ...rest
}: InputProps) => {
  const colorSchema = Appearance.getColorScheme()

  return (
    <View style={rest.style}>
      {label && (
        <Text
          style={{
            color: colorSchema === 'dark' ? 'white' : 'black',
            fontWeight: 'bold',
            fontFamily: 'Sono',
            fontSize: 15,
            marginBottom: 5,
          }}
        >
          {label} {required ? '(required)' : ''}
        </Text>
      )}
      <InputKitten
        onChangeText={onChangeText}
        onChange={onChange}
        size="small"
        style={[styles.container, hasError ? styles.error : styles.normal]}
        value={value}
        keyboardType={keyboardType}
      />
      <ErrorMessage show={hasError} required={required} customMessage={errorMessage} />
    </View>
  )
}
