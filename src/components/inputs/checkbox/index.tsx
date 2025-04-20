import { CheckBox as CheckBoxKitten, CheckBoxProps as CheckBoxKittenProps } from '@ui-kitten/components'

export interface CheckBoxProps extends CheckBoxKittenProps {
  label?: string
}

export const CheckBox = ({ label = '', checked, onChange, ...rest }: CheckBoxProps) => {
  return (
    <CheckBoxKitten checked={checked} onChange={onChange} {...rest}>
      {label}
    </CheckBoxKitten>
  )
}
