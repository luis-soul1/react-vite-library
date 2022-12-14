import { Button } from '@mui/material'
import { ReactElement, ElementType } from 'react'

import { TColors } from '../Colors/TColors'
import { /* PdvIcon,  */ TIconSize } from '../Icons/PdvIcon'
import { TIconNames } from '../Icons/TIconNames'

type TRounded = 'small' | 'medium' | 'large' | 'full'
export type TButtonVariant = 'contained' | 'outlined' | 'default'
export type TButtonSize = 'small' | 'medium' | 'large'
type TPdvButton = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  variant?: TButtonVariant
  color?: TColors
  textColor?: TColors
  iconColor?: TColors
  size?: TButtonSize
  asLink?: boolean
  href?: string
  type?: 'submit' | 'button' | 'reset'
  icon?: TIconNames | ReactElement
  iconPosition?: 'left' | 'right'
  iconSize?: TIconSize
  disabled?: boolean
  rounded?: TRounded
  component?: ElementType
  onClick?: () => void
}

const disabledStyles = 'cursor-not-allowed opacity-50 bg-gray-200 text-gray-400 border-none'
const structure = `normal-case transition duration-200`
const defaultSx = {
  borderStyle: 'solid',
  paddingLeft: 2,
  paddingRight: 2
}

const roundedStyle = (rounded: TRounded) => {
  const dispatch = {
    small: '4px',
    medium: '8px',
    large: '12px',
    full: '9999px'
  }
  return dispatch[rounded]
}

const PdvButton = (props: TPdvButton) => {
  const {
    children,
    className,
    variant = 'contained',
    asLink,
    href,
    iconSize,
    // iconPosition = 'left',
    disabled = false,
    color = 'primary-color',
    // iconColor = 'white',
    rounded = 'medium',
    textColor,
    ...rest
  } = props

  const sx = { ...defaultSx, borderRadius: roundedStyle(rounded) }

  const selectedTextColor = () => {
    if (variant === 'contained') return textColor ? `var(--${String(textColor)})` : 'var(--white)'
    return textColor ? `var(--${String(textColor)})` : `var(--${String(props.color)})`
  }

  const style = () => {
    return {
      backgroundColor: variant === 'contained' ? `var(--${String(color)})` : 'var(--transparent)',
      color: selectedTextColor(),
      border: variant === 'outlined' ? `1px solid var(--${String(color)})` : 'none',
      boxShadow: props.disabled || variant === 'default' ? 'none' : `var(--shadow-medium)`
    }
  }

  // const setIcon = () => {
  //   if (typeof props.icon === 'string') {
  //     const selectedColor = props.disabled ? 'gray-500' : iconColor
  //     return <PdvIcon name={props.icon} color={props.variant === 'outlined' ? color : selectedColor} size={props.iconSize ?? 'medium'} />
  //   }
  //   return props.icon
  // }

  const onClick = () => {
    props?.onClick && props.onClick()
  }

  return (
    <span className={`${props?.disabled ? 'cursor-not-allowed' : ''}`}>
      <Button
        className={`${className ?? ''} ${structure} ${disabled ? disabledStyles : 'hover:opacity-70'}`}
        {...rest}
        sx={sx}
        style={{ ...style() }}
        disabled={disabled}
        onClick={onClick}
      >
        <div className="total-center gap-1.5">
          {/* {iconPosition === 'left' && props?.icon && setIcon()} */}
          <h6 className={`flex items-center ${props.size?.includes('small') ? 'subtitle2' : 'subtitle1'}`}>{children}</h6>
          {/* {iconPosition === 'right' && props?.icon && setIcon()} */}
        </div>
      </Button>
    </span>
  )
}

export default PdvButton
