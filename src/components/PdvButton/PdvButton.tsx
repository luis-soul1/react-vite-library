import { FC, ReactElement, ElementType } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import { Button, CircularProgress } from '@mui/material'

import { TColors } from '../Colors/TColors'
import { PdvIcon, TIconSize } from '../Icons/PdvIcon'
import { TIconNames } from '../Icons/TIconNames'

type TRounded = 'small' | 'medium' | 'large' | 'full'
export type TButtonVariant = 'contained' | 'outlined' | 'default'
export type TButtonSize = 'small' | 'medium' | 'large'
type TPdvButton = {
  className?: string
  variant?: TButtonVariant
  color?: TColors
  textColor?: TColors
  iconColor?: TColors
  size?: TButtonSize
  type?: 'submit' | 'button' | 'reset'
  icon?: TIconNames | ReactElement
  iconPosition?: 'left' | 'right'
  iconSize?: TIconSize
  disabled?: boolean
  loading?: boolean
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

const PdvButton: FC<TPdvButton> = (props) => {
  const {
    children,
    className,
    variant = 'contained',
    iconSize,
    loading,
    iconPosition = 'left',
    disabled = false,
    color = 'primary-color',
    iconColor = 'white',
    rounded = 'medium',
    textColor,
    size = 'medium',
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

  const setIcon = () => {
    if (!props.icon) return
    if (typeof props.icon === 'string') {
      const selectedColor = props.disabled ? 'gray-500' : iconColor
      return <PdvIcon name={props.icon} color={props.variant === 'outlined' ? color : selectedColor} size={props.iconSize ?? size} />
    }
    return props.icon
  }

  const childrenStyles = () => {
    let iconStyles = ''

    if (props.icon) iconStyles = size === 'small' ? 'mx-0.5' : 'mx-1.5'

    const dispatch = {
      small: `subtitle2 ${iconStyles}`,
      medium: `subtitle1 ${iconStyles}`,
      large: `subtitle1 ${iconStyles}`
    }

    return dispatch[size]
  }

  const onClick = () => {
    props?.onClick && props.onClick()
  }

  if (loading) {
    return (
      <LoadingButton
        loading={loading}
        className={`${className ?? ''} ${structure} ${disabled ? disabledStyles : ''}`}
        size={size}
        {...rest}
        loadingIndicator={<CircularProgress className="text-white" size={14} />}
        sx={sx}
        style={{ ...style() }}
        disabled={disabled}
      >
        <span className="invisible">{children}</span>
      </LoadingButton>
    )
  }

  return (
    <span className={`${props?.disabled ? 'cursor-not-allowed' : ''}`}>
      <Button
        className={`${className ?? ''} ${structure} ${disabled ? disabledStyles : 'hover:opacity-70'}`}
        size={size}
        {...rest}
        sx={sx}
        style={{ ...style() }}
        disabled={disabled}
        onClick={onClick}
      >
        <div className="total-center">
          {iconPosition === 'left' && setIcon()}
          {children && <h6 className={`flex items-center ${childrenStyles()}`}>{children}</h6>}
          {iconPosition === 'right' && setIcon()}
        </div>
      </Button>
    </span>
  )
}

export default PdvButton
