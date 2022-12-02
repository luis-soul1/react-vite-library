import { Autocomplete, AutocompleteValue, UseAutocompleteProps, InputBaseComponentProps } from '@mui/material'
import { SyntheticEvent, ReactElement } from 'react'
import { Controller, FieldValues, Path, PathValue, RegisterOptions, UseFormReturn } from 'react-hook-form'

import { TColors } from '../../Colors/TColors'
import FormError from '../Error/FormError'
import { disabledStyles, ForwardedInput, inputVariants, TVariant } from '../Input/Input'
import LabelField, { TLabelField } from '../Label/LabelField'
export type TOption = {
  label: string
  value: string
}
export type TAutocomplete<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  autocompleteOptions: TOption[]
  freeSolo?: true
  clearOnBlur?: boolean
  loading?: boolean
  loadingText?: string | ReactElement
  options?: RegisterOptions
  inputProps?: InputBaseComponentProps
  variant?: TVariant
  iconColor?: TColors
  errorClassName?: string
  labelPosition?: 'left' | 'top'
  className?: string
  onInputChange?: UseAutocompleteProps<TFormValues, boolean, boolean, boolean>['onInputChange']
}

const sx = {
  '&.Mui-focused .MuiInput-root': { border: 0 },
  '&.MuiAutocomplete-root': { paddingTop: 0, paddingBottom: 0 },
  width: '100%'
}

export const AutocompleteField = <TFormValues extends FieldValues>(props: TAutocomplete<TFormValues> & TLabelField) => {
  const { iconColor = 'primary-color', variant = 'outlined' } = props
  const selectedVariant = variant ? inputVariants[variant] : inputVariants.outlined
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      rules={props.options}
      render={({ field }) => {
        const { value, onChange: controllerOnChange, ...restFields } = field
        const onChange = (
          event: SyntheticEvent<Element, Event>,
          autocompleteValue: AutocompleteValue<TOption, PathValue<TFormValues, Path<TFormValues>>, undefined, true>
        ) => controllerOnChange(autocompleteValue)
        return (
          <div className={`inline-block ${props.className}`}>
            <div className={`flex ${props?.labelPosition === 'left' ? 'flex-row gap-2' : 'flex-col gap-1'}`}>
              <LabelField {...props} />
              <div className={`${props?.inputProps?.disabled ? disabledStyles : ''}`}>
                <div className={`flex items-center overflow-hidden ${props?.inputProps?.disabled ? disabledStyles : selectedVariant}`}>
                  <Autocomplete
                    id={props.name}
                    value={value}
                    onChange={onChange}
                    {...restFields}
                    onInputChange={props?.onInputChange}
                    freeSolo={props?.freeSolo}
                    loading={Boolean(props?.loading)}
                    loadingText="Cargando..."
                    clearOnBlur={Boolean(props?.clearOnBlur)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    noOptionsText="No se encontraron resultados"
                    getOptionLabel={(option) => (option as TOption).label}
                    options={props.autocompleteOptions}
                    sx={sx}
                    renderInput={({ InputProps: { ref: anchorListRef }, inputProps: muiInputProps }) => (
                      <div ref={anchorListRef} className="w-full">
                        <ForwardedInput
                          id={props.name}
                          icon="Search"
                          iconColor={iconColor}
                          inputProps={{ ...muiInputProps, ...props?.inputProps }}
                          variant="transparent"
                        />
                      </div>
                    )}
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
}

export default AutocompleteField
