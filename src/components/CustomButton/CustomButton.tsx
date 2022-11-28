import { Button } from '@mui/material'
import React from 'react'

type CustomButtonProps = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
}

const CustomButton = (props: CustomButtonProps) => {
  console.info({ props })
  return <Button variant="contained">Contained</Button>
}

export default CustomButton
