import { TextInputProps, View, StyleSheet } from 'react-native'
import { Input as InputKitten } from '@ui-kitten/components'
import { Text } from '../text/text'
import { ErrorMessage } from '../error-message/error-message'
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
  return (
    <View style={StyleSheet.compose(rest.style, { width: '100%', display: 'flex', flexDirection: 'column', gap: 4 })}>
      {label && <Text fontWeight="bold" label={`${label} ${required ? '(required)' : ''}`} />}
      <InputKitten
        onChangeText={onChangeText}
        onChange={onChange}
        size="small"
        style={[styles.container]}
        status={!hasError ? 'basic' : 'danger'}
        value={value}
        keyboardType={keyboardType}
      />
      <ErrorMessage show={hasError} required={required} customMessage={errorMessage} />
    </View>
  )
}
