import { TColors } from '../../Colors/TColors'
import { PdvIcon, TIconSize } from '../../Icons/PdvIcon'
import { TIconNames } from '../../Icons/TIconNames'

export type TLabelField = {
  label?: string
  for?: string
  labelClassName?: string
  labelIcon?: TIconNames
  labelIconSize?: TIconSize
  labelIconcolor?: TColors
  noLabelIcon?: boolean
}

export const LabelField = (props: TLabelField) => {
  const { labelIconcolor = 'primary-color', noLabelIcon = false } = props

  if (!props?.label) return null
  return (
    <div className="flex items-center">
      {!noLabelIcon && <PdvIcon name={props?.labelIcon ?? 'KeyArrowRight'} color={labelIconcolor} size={props?.labelIconSize} />}

      <label className={`body1 block font-semibold text-gray-500 ${props.labelClassName ? props.labelClassName : ''}`} htmlFor={props.for}>
        {props.label}
      </label>
    </div>
  )
}

export default LabelField
