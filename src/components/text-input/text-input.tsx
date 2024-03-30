import { TextInputProps, View } from 'react-native'
import { Input as InputKitten, Text } from '@ui-kitten/components'
import { ErrorMessage } from '../error-message/error-message'
import { useIsDarkTheme } from '../../hooks/use-is-dark-theme'
import { styles } from './text-input.styles'

export interface CustomTextInputProps extends TextInputProps {
  label?: string
  hasError?: boolean
  required?: boolean
  errorMessage?: string
}

export const TextInput = ({
  label = '',
  value,
  onChangeText,
  keyboardType = 'default',
  onChange,
  hasError = false,
  required = false,
  errorMessage = '',
  ...rest
}: CustomTextInputProps) => {
  const isDarkTheme = useIsDarkTheme()

  return (
    <View style={rest.style}>
      {label && (
        <Text
          style={{
            color: isDarkTheme ? 'white' : 'black',
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
