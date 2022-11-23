import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { PdvIcon } from '../../Icons/PdvIcon'
import DateField from './DateField'

type TRangeDateField<TFormValues extends FieldValues> = {
  nameFrom: Path<TFormValues>
  nameTo: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  className?: string
}

const RangeDateField = <TFormValues extends FieldValues>(props: TRangeDateField<TFormValues>) => {
  return (
    <span className={`relative inline-flex items-center rounded-md border bg-white ${props.className}`}>
      <DateField name={props.nameFrom} form={props.form} className="w-36" variant="transparent" />
      <PdvIcon name="KeyArrowRight" color="primary-color" className="absolute left-32" />
      <DateField
        name={props.nameTo}
        form={props.form}
        inputProps={{ disabled: !props.form.watch(props.nameFrom) }}
        minDate={props.form.watch(props.nameFrom)}
        className="w-36 justify-self-end"
        variant="transparent"
      />
    </span>
  )
}

export default RangeDateField
