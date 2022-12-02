import { Switch as MUISwitch, styled } from '@mui/material'
import { useState } from 'react'

import { TColors } from '../Colors'

type TSwitchProps = {
  suffixText?: {
    checkedText?: string
    checkedColor?: TColors
    uncheckedText?: string
    uncheckedColor?: TColors
    position?: 'left' | 'right' | 'both'
  }
  disabled?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  color?: TColors
}

const Switch: React.FC<TSwitchProps> = (props) => {
  const [checked, setChecked] = useState(props?.checked ?? false)
  const { suffixText, color = 'primary-color', ...restProps } = props
  const textPosition = suffixText?.position ?? 'right'
  const isBoth = textPosition === 'both'

  const switchText = {
    checked: {
      text: suffixText?.checkedText || 'Activado',
      color: suffixText?.checkedColor || color
    },
    unchecked: {
      text: suffixText?.uncheckedText || 'Desactivado',
      color: suffixText?.uncheckedColor || 'gray-400'
    }
  }

  const onChange = () => {
    const updatedValue = !checked
    props.onChange && props.onChange(updatedValue)
    setChecked(updatedValue)
  }

  const SwitchText = ({ position = 'left' }: { position: 'left' | 'right' }) => {
    const color = (): string => {
      if (isBoth) {
        if (position === 'left') return !checked ? String(switchText.checked.color) : String(switchText.unchecked.color)
        if (position === 'right') return checked ? String(switchText.checked.color) : String(switchText.unchecked.color)
      }

      return checked ? String(switchText.checked.color) : String(switchText.unchecked.color)
    }

    const text = () => {
      if (isBoth) {
        if (position === 'left') return switchText.unchecked.text
        if (position === 'right') return switchText.checked.text
      }

      return checked ? switchText.checked.text : switchText.unchecked.text
    }

    return (
      <span className={`subtitle1 font-semibold`} style={{ color: `var(--${color()}` }}>
        {text()}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {(textPosition === 'left' || textPosition === 'both') && <SwitchText position="left" />}

      <MUISwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...restProps} checked={checked} onChange={onChange} />

      {(textPosition === 'right' || textPosition === 'both') && <SwitchText position="right" />}
    </div>
  )
}

const PdvSwitch = styled((props: TSwitchProps) => <Switch {...props} />)(({ theme, color = 'primary-color' }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: `var(--${String(color)})`,
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: 'var(--gray-300)'
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: 'var(--gray-300)',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))

export default PdvSwitch
export { PdvSwitch }
