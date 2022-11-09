import React from 'react'

type CustomButtonProps = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
}
const CustomButton = (props: CustomButtonProps) => {
  const { children, className, onClick, type = 'button' } = props
  return (
    <button className={`${className} rounded-md bg-green-700 p-2 text-white hover:bg-blue-400`} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton
