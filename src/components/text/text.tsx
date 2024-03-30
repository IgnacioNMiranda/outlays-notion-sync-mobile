import { Text as KittenText } from '@ui-kitten/components'
import { useIsDarkTheme } from '../../hooks/use-is-dark-theme'
import { TextStyle } from 'react-native'

type TextSize = 'regular' | 'big' | 'bigger'

const sizeStyles: Record<TextSize, TextStyle['fontSize']> = {
  regular: 15,
  big: 24,
  bigger: 26,
}

export const Text = ({
  label,
  color,
  fontWeight = '400',
  size = 'regular',
}: {
  label: string
  color?: string
  fontWeight?: TextStyle['fontWeight']
  size?: TextSize
}) => {
  const isDarkTheme = useIsDarkTheme()

  return (
    <KittenText
      style={{
        color: color ?? (isDarkTheme ? 'white' : 'black'),
        fontWeight,
        fontFamily: 'Sono',
        fontSize: sizeStyles[size],
      }}
    >
      {label}
    </KittenText>
  )
}
