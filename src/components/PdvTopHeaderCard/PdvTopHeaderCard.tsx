import { FC, ReactElement } from 'react'

import { TColors } from '../Colors/TColors'

type TPdvTopHeaderCard = {
  className?: string
  headerColor?: TColors
  header: string | ReactElement
  textColor?: TColors
  onClick?: () => void
}

const PdvTopHeaderCard: FC<TPdvTopHeaderCard> = (props) => {
  return (
    <div
      className={`inline-block overflow-hidden ${props.className ?? ''} ${props.onClick ? 'cursor-pointer' : ''}`}
      onClick={props.onClick}
      style={{ borderRadius: 8 }}
    >
      <div
        className={`w-full ${typeof props.header === 'string' ? 'total-center' : ''}`}
        style={{ backgroundColor: `var(--${String(props.headerColor) ?? 'indigo-700'})` }}
      >
        {typeof props.header === 'string' ? (
          <p className="subtitle1 p-2 text-center" style={{ color: `var(--${String(props.textColor) ?? 'white'})` }}>
            {props.header}
          </p>
        ) : (
          props.header
        )}
      </div>
      <div className="bg-white">{props.children}</div>
    </div>
  )
}

export default PdvTopHeaderCard
