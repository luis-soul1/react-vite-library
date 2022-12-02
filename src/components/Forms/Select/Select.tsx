import { Select as MuiSelect, SelectChangeEvent, MenuItem, Box } from '@mui/material'
import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

import { TColors } from '../../Colors'
import { PdvIcon } from '../../Icons/PdvIcon'

export type TSelectProps<TSelectOptions, TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  selectedColor?: TColors
  iconSelectedColor?: TColors
  selectOptions: TSelectOptions[]
  optionLabel: keyof TSelectOptions
  optionValue: keyof TSelectOptions
  options?: RegisterOptions
  id?: string
  variant?: 'default' | 'outlined'
  value?: string[] | string
  multiple?: boolean
  disabled?: boolean
}

const MenuProps = {
  disablePortal: true,
  PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250 }, sx: { '.MuiMenu-list': { padding: 0 } } }
}
const multipleOptionStyle = `rounded-md px-4 py-1 font-medium shadow-16`
const optionStyles = {
  padding: '0.5rem 1rem',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--gray-500)'
}
const sxSelectStyles = {
  width: '100%',
  '.MuiSelect-select': {
    padding: '10px 14px'
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: 0
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 0
  },
  '&.MuiOutlinedInput-root': {
    outline: 'none'
  },
  '.&.MuiButtonBase-root-MuiMenuItem-root.Mui-selected': {
    backgroundColor: 'var(--gray-200)'
  },
  '.&.MuiButtonBase-root-MuiMenuItem-root.Mui-selected:hover': {
    backgroundColor: 'var(--gray-200)'
  }
}

export const Select = <TSelectOptions, TFormValues extends FieldValues>(props: TSelectProps<TSelectOptions, TFormValues>) => {
  const { variant = 'outlined', iconSelectedColor = 'primary-color', selectedColor = 'primary-color' } = props
  const selectedPillStyle = props.disabled ? 'bg-gray-300 text-white border-none cursor-not-allowed' : 'text-white'
  const borderColor = props.disabled ? 'transparent' : 'gray-300'
  const variantStyle =
    variant === 'outlined'
      ? { border: `1px solid var(--${borderColor})`, borderRadius: '0.5rem', backgroundColor: 'var(--white)' }
      : { borderBottom: `1px solid var(--${borderColor})`, borderRadius: 0 }
  const borderStyles = { borderColor: `var(--${props.disabled ? 'transparent' : 'primary-color'})` }

  const sx = {
    ...sxSelectStyles,
    '&.MuiOutlinedInput-root': { ...sxSelectStyles['&.MuiOutlinedInput-root'], ...variantStyle, '&:hover': borderStyles }
  }

  return (
    <Controller
      control={props.form?.control}
      name={props.name}
      rules={props?.options}
      render={({ field }) => {
        const { value, onChange: controllerOnChange, ...restFields } = field
        const selectValue = () => {
          if (typeof value === 'string' && !value) return ''
          if (props.multiple && !Array.isArray(value)) return []
          return value
        }
        const onChange = (event: SelectChangeEvent<unknown>) => {
          controllerOnChange(event)
          if (props?.options?.onChange) props.options.onChange(event)
        }

        return (
          <MuiSelect
            {...restFields}
            multiple={props?.multiple}
            value={props.selectOptions.length ? selectValue() : ''}
            disabled={!!props.disabled}
            displayEmpty
            MenuProps={MenuProps}
            sx={sx}
            onChange={onChange}
            renderValue={(selected: string | string[]) => {
              if (!props?.selectOptions.length) return <span className="text-gray-500">Selecione una opción</span>

              if (props?.multiple && Array.isArray(selected)) {
                if (!selected.length) return <span className="text-gray-500">Selecione una opción</span>

                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[])
                      .map(String)
                      .sort((a, b) => a.localeCompare(b))
                      .map((value: string) => (
                        <span
                          key={value}
                          className={`${multipleOptionStyle} ${selectedPillStyle}`}
                          style={{ backgroundColor: `var(--${String(selectedColor)})` }}
                        >
                          {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
                        </span>
                      ))}
                  </Box>
                )
              }

              const selectedValue = props.selectOptions.find((option) => String(option[props.optionValue]) === String(selected))?.[props.optionLabel]

              return <span className="text-gray-500">{selectedValue ?? 'Selecione una opción'}</span>
            }}
          >
            <MenuItem value="" disabled={props.multiple} style={optionStyles}>
              Seleccione una opción
            </MenuItem>
            {props.selectOptions &&
              props.selectOptions.map((option, index) => {
                const isLastItem = index === props.selectOptions.length - 1

                return (
                  <MenuItem
                    key={`select-key-${String(option[props.optionValue])}`}
                    value={String(option[props.optionValue])}
                    style={{ ...optionStyles, borderBottom: isLastItem ? 'none' : '1px solid var(--gray-300)' }}
                  >
                    <div className="grid grid-cols-[30px_1fr]">
                      <div>
                        {value && String(value) === String(option[props.optionValue]) && (
                          <PdvIcon className="mr-4" name="TickSquare" color={iconSelectedColor} />
                        )}
                      </div>
                      {option[props.optionLabel]}
                    </div>
                  </MenuItem>
                )
              })}
          </MuiSelect>
        )
      }}
    />
  )
}

export default Select
