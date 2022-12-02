import { Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ReactElement, Fragment } from 'react'
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

import { TColors } from '../../Colors'

type TRadioGroupField<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  options?: RegisterOptions
  radioOptions: TRadio[]
  divider?: boolean
  alignment?: 'horizontal' | 'vertical'
  color?: TColors
  textColor?: TColors
}

export type TRadio = {
  label: string | ReactElement
  value: string
}

export const RadioGroupField = <TFormValues extends FieldValues>(props: TRadioGroupField<TFormValues>) => {
  const { alignment = 'vertical' } = props
  const customRadioStyle = {
    color: `var(--${props?.color ?? 'primary-color'})`,
    '&.Mui-checked': {
      color: `var(--${props?.color ?? 'primary-color'})`
    }
  }

  return (
    <Controller
      name={props.name}
      control={props.form.control}
      rules={props.options}
      render={({ field: { onChange, value } }) => {
        return (
          <RadioGroup row={alignment === 'horizontal'} value={value} onChange={onChange}>
            {props.radioOptions?.map((option) => (
              <Fragment key={option.value}>
                <FormControlLabel
                  value={option.value}
                  sx={{ '& .MuiTypography-body1': { fontFamily: 'var(--primary-font)' } }}
                  label={
                    <label
                      className={`pointer-events-none`}
                      style={{
                        color: `var(--${props?.textColor ?? 'gray-500'})`
                      }}
                    >
                      {option.label}
                    </label>
                  }
                  name={props.name}
                  control={<Radio sx={customRadioStyle} />}
                />
                {props.divider && <Divider className="my-1.5 bg-gray-100" />}
              </Fragment>
            ))}
          </RadioGroup>
        )
      }}
    />
  )
}

export default RadioGroupField
