import { Alert } from '@mui/material'

type TPdvAlert = {
  children: React.ReactNode | React.ReactNode[]
  severity?: 'error' | 'info' | 'success' | 'warning'
  variant?: 'filled' | 'outlined' | 'standard'
  className?: string
}

const PdvAlert = (props: TPdvAlert) => {
  const { severity = 'info', variant = 'standard' } = props

  return (
    <span className={props.className}>
      <Alert severity={severity} variant={variant}>
        {props.children}
      </Alert>
    </span>
  )
}

export default PdvAlert

export { PdvAlert }
