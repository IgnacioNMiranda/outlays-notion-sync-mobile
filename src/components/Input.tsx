import { StyleSheet, TextInputProps, Appearance, View } from 'react-native'
import { Input as InputKitten, Text } from '@ui-kitten/components'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
  },
})

export interface InputProps extends TextInputProps {
  label?: string
}

export const Input = ({ label = '', value, onChangeText, keyboardType = 'default', onChange, ...rest }: InputProps) => {
  const colorSchema = Appearance.getColorScheme()

  return (
    <View style={{ width: '100%' }}>
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
      <InputKitten
        onChangeText={onChangeText}
        onChange={onChange}
        size="small"
        style={StyleSheet.compose(styles.container, rest.style)}
        value={value}
        keyboardType={keyboardType}
      />
    </View>
  )
}
