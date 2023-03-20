import { IndexPath, Select as SelectKitten, SelectItem, Text } from '@ui-kitten/components'
import { useMemo } from 'react'
import { StyleProp, StyleSheet, ViewStyle, Appearance, View } from 'react-native'

const selectStyles = StyleSheet.create({
  container: {},
})

export const Select = ({
  style,
  label = '',
  selectedIndex,
  items,
  onSelect,
  multiSelect = false,
}: {
  label?: string
  style?: StyleProp<ViewStyle>
  selectedIndex: IndexPath | IndexPath[]
  items: string[]
  onSelect: any
  multiSelect?: boolean
}) => {
  const colorSchema = Appearance.getColorScheme()
  const styles = StyleSheet.compose(selectStyles.container, style)

  const displayedValue = useMemo(() => {
    if (typeof selectedIndex === 'object' && Array.isArray(selectedIndex)) {
      return selectedIndex.map((index) => items[index.row]).join(',')
    }
    return items[selectedIndex.row]
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
          {label}
        </Text>
      )}
      <View style={styles}>
        <SelectKitten
          size="small"
          selectedIndex={selectedIndex}
          multiSelect={multiSelect}
          onSelect={onSelect}
          placeholder="Select Tags"
          value={displayedValue}
        >
          {items.map((item, idx) => (
            <SelectItem key={`${item}-${idx}`} title={item} />
          ))}
        </SelectKitten>
      </View>
    </>
  )
}
