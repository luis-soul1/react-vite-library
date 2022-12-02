import { useState, Children, cloneElement, useEffect } from 'react'

import { TColors } from '../Colors/TColors'
import { PdvIcon } from '../Icons/PdvIcon'
import { TIconNames } from '../Icons/TIconNames'
import { PdvButton, TButtonSize } from '../PdvButton'
import PdvTooltip, { PdvTooltipPlacements } from '../PdvTooltip/PdvTooltip'
type TPdvTabs = {
  children: React.ReactElement<TTab>[] | React.ReactElement<TTab>
  tabsWidth?: 'full' | 'auto'
  tabsHeight?: TButtonSize
  tabsPadding?: 'small' | 'large'
  className?: string
  color: TColors
  defaultSelectedTab?: string | number
}
type TPdvTab = {
  Tab: React.FC<TTab>
}
const PdvTabs: React.FC<TPdvTabs> & TPdvTab = (props) => {
  const { tabsWidth = 'auto', tabsHeight, tabsPadding = 'small' } = props
  const firstTab = Children.toArray(props.children)[0] as React.ReactElement<TTab>
  const firstTabKeyIndex = firstTab.props.tabKey ?? 0
  const [selectedTab, setSelectedTab] = useState<string | number>(props.defaultSelectedTab ?? firstTabKeyIndex)
  const changeActiveTab = (tabKey: string | number) => setSelectedTab(tabKey)
  let selectedTabContent: React.ReactNode | undefined = undefined
  useEffect(() => {
    if (props.defaultSelectedTab) changeActiveTab(props.defaultSelectedTab)
  }, [props.defaultSelectedTab])
  return (
    <>
      <div
        className={`bg-gray-25 overflow-hidden rounded-xl  ${tabsWidth === 'full' ? 'w-full p-1' : 'inline whitespace-nowrap'} ${
          props.className ?? ''
        }`}
      >
        <div className={`slider items-center rounded-xl `}>
          <div className={`flex gap-2 ${tabsWidth === 'full' ? 'w-full' : ''} bg-gray-25 items-center rounded-xl p-2`}>
            {Children.map(props.children, (child: React.ReactElement<TTab>, i: number) => {
              const { children, tabKey = i, ...restTabProps } = child.props as TTab
              if (selectedTab === tabKey) selectedTabContent = children
              const onTabClick = () => {
                changeActiveTab(tabKey)
                restTabProps?.onClick && restTabProps.onClick()
              }
              const tabProps = {
                ...restTabProps,
                isSelected: selectedTab === tabKey,
                onClick: onTabClick,
                color: restTabProps.color ? restTabProps.color : props.color,
                tabsWidth,
                tabsHeight,
                tabsPadding
              }
              if (child && child.type === Tab)
                return <div className={`${props.tabsWidth === 'full' ? 'w-full grow' : ''} `}>{cloneElement(child, tabProps)}</div>
            })}
          </div>
        </div>
      </div>
      {selectedTabContent && (
        <div className="mt-4" key={selectedTab}>
          {selectedTabContent}
        </div>
      )}
    </>
  )
}
type TTab = {
  tabText: string
  icon?: TIconNames
  iconSize?: number
  isTabHidden?: boolean
  href?: string
  asLink?: boolean
  isSelected?: boolean
  color?: TColors
  children?: React.ReactNode[] | React.ReactNode
  disabled?: boolean
  tooltip?: string
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
  tooltipColor?: TColors
  tooltipTextColor?: TColors
  tabKey?: string | number
  className?: string
  onClick?: () => void
}
type TTabProps = {
  tabsWidth?: 'full' | 'auto'
  tabsHeight?: TButtonSize
  tabsPadding?: 'small' | 'medium' | 'large'
} & TTab
const Tab: React.FC<TTabProps> = (props) => {
  const selectedVariant = props.isSelected ? 'contained' : 'default'
  const selectedTheme = selectedVariant.includes('default') ? 'gray-500' : props.color ?? 'primary-color'
  const tabPadding = props.tabsPadding === 'large' ? 'px-10' : props.tabsPadding === 'medium' ? 'px-4' : 'px-2'
  const tabWidth = props.tabsWidth === 'full' ? 'w-full' : ''
  const tabShadow = props.isSelected ? 'shadow-md' : ''
  return (
    <TooltipWrapper text={props.tooltip} placement={props.tooltipPlacement} color={props.tooltipColor} textColor={props.tooltipTextColor}>
      <PdvButton
        color={selectedTheme}
        variant={selectedVariant}
        size={props.tabsHeight ?? 'medium'}
        className={`${tabWidth} ${tabShadow} ${tabPadding} ${props.className ?? ''}`}
        onClick={props.onClick}
        icon={props?.icon && <PdvIcon name={props.icon} color={props.isSelected ? 'white' : 'gray-500'} size={props?.iconSize} />}
        disabled={props.disabled}
      >
        {props.tabText}
      </PdvButton>
    </TooltipWrapper>
  )
}
PdvTabs.Tab = Tab
type TooltipWrapperProps = {
  children: React.ReactElement
  text?: string
  placement?: PdvTooltipPlacements
  color?: TColors
  textColor?: TColors
}
const TooltipWrapper = (props: TooltipWrapperProps) => {
  const { placement = 'top' } = props
  if (!props.text) return <>{props.children}</>
  return (
    <PdvTooltip title={props.text} placement={placement} color={props.color ?? 'gray-25'} textColor={props.textColor ?? 'gray-500'}>
      <span className="subtitle2">{props.children}</span>
    </PdvTooltip>
  )
}
export default PdvTabs
export { PdvTabs }
