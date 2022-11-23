import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

import { FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

import { disabledStyles, inputVariants, TInput } from '../Input/Input'

type TDefaultTextAreaProps<TFormValues extends FieldValues> = {
  textareaProps?: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  name: Path<TFormValues>
  form?: UseFormReturn<TFormValues>
  options?: RegisterOptions
}

export type TTextArea<TFormValues extends FieldValues> = Omit<TInput<TFormValues>, 'inputProps'> & TDefaultTextAreaProps<TFormValues>

const TextArea = <TFormValues extends FieldValues>(props: TTextArea<TFormValues>) => {
  const selectedVariant = props.variant ? inputVariants[props.variant] : inputVariants.outlined

  return (
    <textarea
      {...props.form.register(props.name, props.options)}
      {...props.textareaProps}
      className={`subtitle2 p-4 text-gray-500 focus:outline-none  ${props?.textareaProps?.disabled ? disabledStyles : selectedVariant}`}
      id={props.id}
    />
  )
}

export default TextArea
