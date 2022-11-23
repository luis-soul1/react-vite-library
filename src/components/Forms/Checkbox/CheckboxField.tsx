import { ChangeEvent, InputHTMLAttributes } from 'react'

import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/system'
import { Controller, ControllerRenderProps, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

import { TColors } from '../../Colors/TColors'

type TCheckboxProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  options?: RegisterOptions
  className?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  label?: string
  labelColor?: TColors
  id?: string
  color?: TColors
}

const CheckboxField = <TFormValues extends FieldValues>(props: TCheckboxProps<TFormValues>) => {
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      rules={props.options}
      render={({ field }) => {
        const { value: controllerValue, onChange: controllerOnChange, ...restField } = field

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          controllerOnChange(e)
          if (props?.options?.onChange) props.options.onChange(e)
        }

        return <DefaultCheckbox {...props} controlFields={{ ...restField, value: controllerValue, onChange }} checked={controllerValue} />
      }}
    />
  )
}

const DefaultCheckbox = <TFormValues extends FieldValues>(
  props: TCheckboxProps<TFormValues> & { controlFields?: ControllerRenderProps<Record<string, string>, string>; checked: boolean }
) => {
  const { labelColor = 'gray-500', color = 'primaryColor' } = props

  return (
    <div className={props?.className ?? ''}>
      <div className={`flex items-center`}>
        <IconButton size="small">
          <Checkbox
            id={props.name}
            inputProps={{ ...props.inputProps }}
            checked={props.checked}
            sx={{ '&:hover': { bgcolor: 'transparent' } }}
            checkedIcon={<BpCheckedIcon color={String(color)} />}
            icon={<BpIcon color={String(color)} />}
            {...props?.controlFields}
          />
        </IconButton>
        {props.label && (
          <label
            className={`subtitle1 block cursor-pointer ${String(props.labelColor)}`}
            style={{ color: `var(--${String(labelColor)})` }}
            htmlFor={props?.name}
          >
            {props.label}
          </label>
        )}
      </div>
    </div>
  )
}

const BpIcon = styled('span')(({ color = 'primary-color' }) => ({
  borderRadius: 5,
  width: 19,
  height: 19,
  boxShadow: `inset 0 0 0 2px var(--${color})`,
  backgroundColor: 'var(--white)',
  backgroundImage: 'var(--gray-500)',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'var(--gray-200)'
  }
}))

const BpCheckedIcon = styled(BpIcon)(({ color = 'primary-color' }) => ({
  backgroundColor: `var(--${color})`,
  backgroundImage: `var(--${color})`,
  boxShadow: `inset 0 0 0 1px var(--${color})`,
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  },
  'input:hover ~ &': {
    backgroundColor: `var(--${color})`
  }
}))

export default CheckboxField
