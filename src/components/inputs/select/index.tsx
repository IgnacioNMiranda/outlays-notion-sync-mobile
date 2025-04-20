import { Select as SelectKitten, SelectProps as SelectKittenProps, SelectItem } from '@ui-kitten/components'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { ErrorMessage } from '../../error-message/error-message'
import { CustomText } from '../../custom-text'

const selectStyles = StyleSheet.create({
  container: { width: '100%', display: 'flex', flexDirection: 'column', gap: 4 },
})

export interface SelectProps extends SelectKittenProps {
  label?: string
  options: string[]
  hasError?: boolean
  required?: boolean
  errorMessage?: string
}

export const Select = ({
  style,
  label = '',
  selectedIndex,
  options,
  onSelect,
  multiSelect = false,
  placeholder,
  hasError = false,
  required = false,
  errorMessage = '',
}: SelectProps) => {
  const styles = StyleSheet.compose(selectStyles.container, style)

  const displayedValue = useMemo(() => {
    if (typeof selectedIndex === 'object' && Array.isArray(selectedIndex)) {
      return selectedIndex.map((index) => options[index.row]).join(', ')
    } else if (selectedIndex) return options[selectedIndex.row]
    return ''
  }, [selectedIndex])

  return (
    <View style={styles}>
      {label && <CustomText label={`${label} ${required ? '(required)' : ''}`} fontWeight="bold" />}
      <SelectKitten
        size="small"
        status={!hasError ? 'basic' : 'danger'}
        selectedIndex={selectedIndex}
        multiSelect={multiSelect}
        onSelect={onSelect}
        placeholder={placeholder}
        value={displayedValue}
      >
        {options.map((item, idx) => (
          <SelectItem key={`${item}-${idx}`} title={item} />
        ))}
      </SelectKitten>
      <ErrorMessage show={hasError} required={required} customMessage={errorMessage} />
    </View>
  )
}
