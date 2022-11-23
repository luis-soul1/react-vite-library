import { ReactElement } from 'react'

import { Box } from '@mui/system'

import { TColors } from '../Colors/TColors'

type TheaderSize = 'small' | 'medium' | 'large' | 'half' | string | number

type TPdvLeftHeaderCard = {
  className?: string
  headerSize?: TheaderSize
  headerColor?: TColors
  header?: string | ReactElement
  titleColor?: TColors
  onClick?: () => void
}

const PdvLeftHeaderCard: React.FC<TPdvLeftHeaderCard> = (props) => {
  const columsSize = () => {
    const dispatch: Record<TheaderSize, string> = {
      small: '14px 1fr',
      medium: '65px 1fr',
      large: '95px 1fr',
      half: '1fr 1fr'
    }

    if (props.headerSize && dispatch[props.headerSize]) return dispatch[props.headerSize]
    if (typeof props.headerSize === 'number') return `${props.headerSize}px 1fr`
    if (!props.headerSize) return '18px 1fr'

    return `${props.headerSize} 1fr`
  }

  return (
    <div className={`inline-block overflow-hidden ${props.className}`} onClick={props.onClick} style={{ borderRadius: 8 }}>
      <Box display="grid" gridTemplateColumns={columsSize()} className={`h-full`}>
        <div
          className={`${typeof props.header === 'string' ? 'total-center' : ''} overflow-x-hidden`}
          style={{ backgroundColor: `var(--${String(props.headerColor) ?? 'indigo-700'})` }}
        >
          {typeof props.header === 'string' ? (
            <p className="subtitle1" style={{ color: `var(--${String(props.titleColor) ?? 'white'})` }}>
              {props.header}
            </p>
          ) : (
            props.header
          )}
        </div>
        <div className={`h-full bg-white`}>{props.children}</div>
      </Box>
    </div>
  )
}

export default PdvLeftHeaderCard
