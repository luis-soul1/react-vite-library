import { Collapse } from '@mui/material'
import { ReactElement, useState, Children, cloneElement } from 'react'

import { TColors } from '../Colors/TColors'
import { PdvIcon } from '../Icons/PdvIcon'
import { TIconNames } from '../Icons/TIconNames'

type TPdvAccordion = {
  children: React.ReactElement<TAccordionPanel>[] | React.ReactElement<TAccordionPanel>
  className?: string
  multipleOpen?: boolean
  size?: 'small' | 'large'
  color?: TColors
  isOpen?: boolean
  disabled?: boolean
}

type TPdvPanel = {
  Panel: React.FC<TAccordionPanel>
}

const PdvAccordion: React.FC<TPdvAccordion> & TPdvPanel = (props) => {
  const [openPanels, setOpenPanels] = useState<number[]>([])

  return (
    <div className={`w-full ${props.className} flex flex-col gap-1`}>
      {Children.map(props.children, (child: ReactElement<TAccordionPanel>, index) => {
        const { children, onClick, ...restPanelProps } = child.props as TAccordionPanel
        const isOpen = props?.isOpen ?? openPanels.some((panel) => panel === index)

        const onPanelClick = () => {
          if (onClick) onClick()
          if (props.multipleOpen) {
            return isOpen ? setOpenPanels(openPanels.filter((panel) => panel !== index)) : setOpenPanels([...openPanels, index])
          }

          isOpen ? setOpenPanels([]) : setOpenPanels([index])
        }

        const panelProps = {
          isOpen,
          color: restPanelProps.color ? restPanelProps.color : props.color,
          onClick: onPanelClick,
          ...restPanelProps
        }

        if (child && child.type === Panel) return <>{cloneElement(child, panelProps)}</>
      })}
    </div>
  )
}

type TAccordionPanel = {
  isOpen?: boolean
  color?: TColors
  textColor?: TColors
  children?: React.ReactNode[] | React.ReactNode
  disabled?: boolean
  header?: string | ReactElement
  icon?: TIconNames
  iconColor?: TColors
  size?: 'small' | 'large'
  onClick?: () => void
}

const Panel: React.FC<TAccordionPanel> = (props) => {
  const { color = 'primary-color', iconColor = 'white', size = 'small', textColor = 'white' } = props
  const [openAccordion, setOpenAccordion] = useState(false)

  const collapsedStyle = ` ${props.isOpen || openAccordion ? 'rounded-t-md' : 'rounded-md'} ${size === 'large' ? 'min-h-[86px]' : 'min-h-[48px]'}`
  const iconStyle = 'col-span-1 text-white justify-self-end self-center'

  const togglePanel = () => {
    if (props?.onClick) props?.onClick()
    return !props?.disabled && setOpenAccordion((prev: boolean) => !prev)
  }

  return (
    <div>
      <div
        className={`grid grid-cols-12 px-2 md:px-4 ${props?.disabled ? 'pointer-events-none' : ''} ${collapsedStyle}`}
        style={{ backgroundColor: `var(--${String(color)})` }}
        onClick={togglePanel}
      >
        <div className={`col-span-11 flex items-center text-white ${props?.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {typeof props.header === 'string' ? (
            <div className="flex h-full items-center">
              {props.icon && <PdvIcon name={props.icon ?? 'Document'} color={iconColor} className="mr-2" />}
              <p className="subtitle1" style={{ color: `var(--${String(textColor)})` }}>
                {props.header}
              </p>
            </div>
          ) : (
            <>{props.header}</>
          )}
        </div>

        <PdvIcon name={openAccordion ? 'KeyArrowUpFill' : 'KeyArrowDownFill'} className={iconStyle} />
      </div>
      <Collapse in={props.isOpen ?? openAccordion}>{props.children}</Collapse>
    </div>
  )
}

PdvAccordion.Panel = Panel

export { PdvAccordion }
