import { ReactElement } from 'react'

import Divider from '@mui/material/Divider'

type TPdvDivider = {
  className?: string
  light?: boolean
  orientation?: 'horizontal' | 'vertical'
  flexItem?: boolean
  variant?: 'fullWidth' | 'inset' | 'middle'
  textAlign?: 'center' | 'left' | 'right'
  children?: ReactElement | string
}

const PdvDivider = (props: TPdvDivider) => {
  return <Divider {...props}>{props.children}</Divider>
}

export default PdvDivider
