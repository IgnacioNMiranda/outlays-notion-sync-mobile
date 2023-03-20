import { StyleSheet, TextInput, TextInputProps, Text, Appearance, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 2,
  },
})

export interface InputProps extends TextInputProps {
  label?: string
}

export const Input = ({ label = '', id, value, onChangeText, onChange, ...rest }: InputProps) => {
  const colorSchema = Appearance.getColorScheme()

  return (
    <View style={{ width: '100%' }}>
      {label && (
        <Text
          style={{
            color: colorSchema === 'dark' ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: 15,
            marginBottom: 5,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        onChangeText={onChangeText}
        id={id}
        onChange={onChange}
        style={StyleSheet.compose(styles.container, rest.style)}
        value={value}
      />
    </View>
  )
}
