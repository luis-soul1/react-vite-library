import { CSSProperties, FC } from 'react'
import { Iconly } from 'react-iconly'

import { TColors } from '../Colors'
import { MuiIcons, muiSize } from './MuiIcons'
import { TIconNames } from './TIconNames'

export type TIconSize = 'small' | 'medium' | 'large' | 'xlarge' | number
export type TPdvIcon = {
  name: TIconNames
  size?: TIconSize
  set?: 'bold' | 'broken' | 'bulk' | 'curved' | 'light' | 'two-tone'
  color?: TColors
  style?: CSSProperties
  className?: string
}

export const PdvIcon: FC<TPdvIcon> = (props) => {
  const MuiIcon = MuiIcons[props.name]
  const muiStyles = {
    fontSize: typeof props.size === 'string' ? muiSize[props.size] ?? muiSize.medium : props.size,
    color: `var(--${String(props.color) ?? 'gray-500'})`
  }

  const handleIcon = () => {
    if (props.name === 'ChevronRightCircle') return { name: 'ChevronLeftCircle', style: 'rotate-180' }
    return { name: props.name, style: '' }
  }

  return (
    <>
      {MuiIcon ? (
        <MuiIcon className={props.className} style={muiStyles} />
      ) : (
        <span className={`${handleIcon().style} ${props.className ?? ''}`} style={{ display: 'inline-block' }}>
          <Iconly
            name={handleIcon().name}
            set={`${props.set ?? 'light'}`}
            style={{ ...props.style, color: `var(--${String(props.color) ?? 'gray-500'})` }}
            size={props.size ?? 'medium'}
          />
        </span>
      )}
    </>
  )
}
