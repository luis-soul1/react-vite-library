import { TColors } from '../Colors/TColors'

type TPdvPillBox = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  borderType?: 'rounded' | 'rounded-md' | 'rounded-full'
  color?: TColors
  textColor?: TColors
  size?: 'micro' | 'small' | 'medium' | 'large'
  onClick?: () => void
}
const PdvPillBox = (props: TPdvPillBox) => {
  const { color = 'primary-color', borderType = 'rounded' } = props

  const setSize = () => {
    if (props.size === 'micro') return 'py-px'
    if (props.size === 'small') return 'py-0.5'
    if (props.size === 'large') return 'py-2.5'
    return 'py-1.5'
  }

  return (
    <div
      className={`${borderType} ${setSize()} ${props.className} ${props.color === 'white' ? 'text-black' : 'text-white'} `}
      style={{ display: 'inline-block', backgroundColor: `var(--${String(color)})`, paddingLeft: '1rem', paddingRight: '1rem' }}
      onClick={props.onClick}
    >
      {typeof props.children === 'string' ? (
        <p className="subtitle2" style={{ color: `var(--${String(props.textColor) ?? 'white'})` }}>
          {props.children}
        </p>
      ) : (
        props.children
      )}
    </div>
  )
}

export { PdvPillBox }
