import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { Controller, FieldValues } from 'react-hook-form'

import { PdvIcon } from '../../Icons/PdvIcon'
import FormError from '../Error/FormError'
import Input, { disabledStyles, inputVariants, TInput, TVariant } from '../Input/Input'
import LabelField, { TLabelField } from '../Label/LabelField'

type TDatepicker<TFormValues extends FieldValues> = {
  className?: string
  viewType?: ('day' | 'month' | 'year')[]
  labelPosition?: 'left' | 'top'
  errorClassName?: string
  minDate?: Dayjs
  maxDate?: Dayjs
  shouldDisableYear?: (date: Dayjs) => boolean
  shouldDisableMonth?: (date: Dayjs) => boolean
  shouldDisableDate?: (date: Dayjs) => boolean
  variant?: TVariant
} & TInput<TFormValues> &
  TLabelField

const DateField = <TFormValues extends FieldValues>(props: TDatepicker<TFormValues>) => {
  const { viewType = ['day'], variant = 'outlined' } = props
  const selectedVariant = variant ? inputVariants[variant] : inputVariants.outlined

  return (
    <Controller
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        return (
          <DatePicker
            {...field}
            views={[...viewType]}
            shouldDisableYear={props?.shouldDisableYear}
            shouldDisableMonth={props?.shouldDisableMonth}
            shouldDisableDate={props?.shouldDisableDate}
            disabled={props?.inputProps?.disabled}
            minDate={props?.minDate}
            maxDate={props?.maxDate}
            components={{
              OpenPickerIcon: () => (
                <PdvIcon name={props.icon ?? 'Calendar'} color={props?.inputProps?.disabled ? 'gray-200' : props.iconColor ?? 'primary-color'} />
              )
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => {
              return (
                <div className={`inline-block ${props.className}`}>
                  <div className={`flex gap-2 ${props?.labelPosition === 'left' ? 'flex-row gap-2' : 'flex-col gap-1'}`}>
                    <LabelField {...props} />
                    <div className={`${props?.inputProps?.disabled ? disabledStyles : ''}`}>
                      <div
                        className={`flex items-center overflow-hidden ${props?.inputProps?.disabled ? disabledStyles : selectedVariant}`}
                        ref={inputRef}
                      >
                        <div className="-ml-1.5 mr-4">{InputProps?.endAdornment}</div>
                        <Input
                          name={props.name}
                          options={props?.options}
                          form={props.form}
                          id={props.id}
                          inputProps={{
                            ...inputProps,
                            ...props.inputProps,
                            className: `p-0 self-center mt-px ${props.inputProps?.className ?? ''}`,
                            disabled: props.inputProps?.disabled
                          }}
                          variant="transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <FormError errorClassName={props.errorClassName} name={props.name} errors={props.form?.formState?.errors} />
                </div>
              )
            }}
          />
        )
      }}
    />
  )
}

export default DateField
