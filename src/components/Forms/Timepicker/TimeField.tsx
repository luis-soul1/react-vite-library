import { TimePicker } from '@mui/x-date-pickers'
import { Controller, FieldValues, Path, PathValue, UnpackNestedValue } from 'react-hook-form'

import { PdvIcon } from '../../Icons/PdvIcon'
import FormError from '../Error/FormError'
import { Input, disabledStyles, inputVariants, TInput } from '../Input/Input'
import { LabelField, TLabelField } from '../Label/LabelField'

type TTimepicker<TFormValues extends FieldValues> = {
  errorClassName?: string
  labelPosition?: 'left' | 'top'
  className?: string
  minutesStep?: number
  ampm?: boolean
  ampmInClock?: boolean
  onAccept?: (value: PathValue<TFormValues, Path<TFormValues>> | null) => void
} & TInput<TFormValues> &
  TLabelField

export const TimeField = <TFormValues extends FieldValues>(props: TTimepicker<TFormValues>) => {
  const { iconColor = 'primary-color', variant = 'outlined', ampm = true, ampmInClock = true, minutesStep = 1 } = props
  const selectedVariant = variant ? inputVariants[variant] : inputVariants.outlined

  return (
    <Controller
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        const { value, onChange: controllerOnChange, ...restFields } = field

        const onChange = (value: UnpackNestedValue<PathValue<TFormValues, Path<TFormValues>>> | null) => {
          controllerOnChange(value)
          if (props?.options?.onChange) props.options.onChange(value)
        }

        return (
          <TimePicker
            value={value}
            onAccept={props?.onAccept}
            onChange={(value) => onChange(value)}
            {...restFields}
            disabled={props?.inputProps?.disabled}
            ampm={ampm}
            ampmInClock={ampmInClock}
            minutesStep={minutesStep}
            components={{
              OpenPickerIcon: () => <PdvIcon name="TimeCircle" color={props?.inputProps?.disabled ? 'gray-200' : iconColor} />
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => {
              return (
                <div className={`inline-block ${props.className}`}>
                  <div className={`flex ${props?.labelPosition === 'left' ? 'flex-row gap-2' : 'flex-col gap-1'}`}>
                    <LabelField {...props} />
                    <div className={`${props?.inputProps?.disabled ? disabledStyles : ''}`}>
                      <div
                        className={`flex items-center overflow-hidden ${props?.inputProps?.disabled ? disabledStyles : selectedVariant}`}
                        ref={inputRef}
                      >
                        <div className="mr-4">{InputProps?.endAdornment}</div>
                        <Input
                          name={props.name}
                          form={props.form}
                          id={props.id}
                          inputProps={{ ...inputProps, className: 'pl-0' }}
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

export default TimeField
