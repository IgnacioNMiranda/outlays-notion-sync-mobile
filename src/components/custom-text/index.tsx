import { Text as KittenText } from '@ui-kitten/components'
import { EvaStatus } from '@ui-kitten/components/devsupport'
import { TextStyle } from 'react-native'

type TextSize = 'regular' | 'big' | 'bigger'

const sizeStyles: Record<TextSize, TextStyle['fontSize']> = {
  regular: 15,
  big: 24,
  bigger: 26,
}

export const CustomText = ({
  label,
  fontWeight = '400',
  size = 'regular',
  status = 'basic',
}: {
  label: string
  fontWeight?: TextStyle['fontWeight']
  size?: TextSize
  status?: EvaStatus
}) => {
  return (
    <KittenText
      status={status}
      style={{
        fontWeight,
        fontFamily: 'Sono',
        fontSize: sizeStyles[size],
      }}
    >
      {label}
    </KittenText>
  )
}
