import { FieldValues } from 'react-hook-form'

import { FormError } from '../Error/FormError'
import LabelField, { TLabelField } from '../Label/LabelField'
import Select, { TSelectProps } from './Select'

type TSelectFieldProps<TSelectOptions, TFormValues extends FieldValues> = {
  errorClassName?: string
  labelPosition?: 'left' | 'top'
  className?: string
} & TSelectProps<TSelectOptions, TFormValues> &
  TLabelField

const SelectField = <TSelectOptions, TFormValues extends FieldValues>(props: TSelectFieldProps<TSelectOptions, TFormValues>) => {
  const { className, errorClassName, form, options, ...restProps } = props

  return (
    <div className={props.className}>
      <div className={`flex  ${props?.labelPosition === 'left' ? 'flex-row gap-2' : 'flex-col gap-1'}`}>
        <LabelField {...props} />
        <Select {...restProps} form={props.form} options={options} />
      </div>
      <FormError name={props.name} errors={props.form.formState?.errors} />
    </div>
  )
}

export default SelectField
