import { Tooltip, TooltipProps, tooltipClasses, styled } from '@mui/material'

import { TColors } from '../Colors/TColors'

export type PdvTooltipPlacements = TooltipProps['placement']

type TPdvTooltip = {
  children: React.ReactElement
  title: string | React.ReactElement
  placement?: PdvTooltipPlacements
  textColor?: TColors
  color?: TColors
  arrow?: boolean
  open?: boolean

  onOpen?: (event: Event | React.SyntheticEvent<Element, Event>) => void
  onClose?: (event: Event | React.SyntheticEvent<Element, Event>) => void
}

const PdvTooltip = (props: TPdvTooltip) => {
  const { textColor = 'white', color = 'primary-color', ...rest } = props

  return <CustomTooltip {...rest} textColor={textColor} color={color} />
}

const CustomTooltip = styled(
  ({ className, ...props }: TooltipProps & TPdvTooltip) => (
    <Tooltip {...props} classes={{ popper: className }}>
      <span className="truncate">{props.children}</span>
    </Tooltip>
  ),
  {
    shouldForwardProp: (prop) => prop !== 'textColor' && prop !== 'color'
  }
)(({ textColor, color }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: `var(--${color})`,
    color: `var(--${String(textColor)})`,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;',
    fontSize: 12,
    fontWeight: 400,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: `var(--${color})`
  }
}))

export default PdvTooltip
export { PdvTooltip }
