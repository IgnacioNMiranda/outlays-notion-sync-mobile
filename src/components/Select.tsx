import { Select as SelectKitten, SelectProps as SelectKittenProps, SelectItem, Text } from '@ui-kitten/components'
import { useMemo } from 'react'
import { StyleSheet, Appearance, View } from 'react-native'
import { ErrorMessage } from './ErrorMessage'

const selectStyles = StyleSheet.create({
  container: {},
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
  const colorSchema = Appearance.getColorScheme()
  const styles = StyleSheet.compose(selectStyles.container, style)

  const displayedValue = useMemo(() => {
    if (typeof selectedIndex === 'object' && Array.isArray(selectedIndex)) {
      return selectedIndex.map((index) => options[index.row]).join(', ')
    } else if (selectedIndex) return options[selectedIndex.row]
    return ''
  }, [selectedIndex])

  return (
    <>
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
      <View style={[styles]}>
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
    </>
  )
}
