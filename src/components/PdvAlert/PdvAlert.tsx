import Alert from '@mui/material/Alert'

type TPdvAlert = {
  severity?: 'error' | 'info' | 'success' | 'warning'
  variant?: 'filled' | 'outlined' | 'standard'
  className?: string
}

const PdvAlert: React.FC<TPdvAlert> = (props) => {
  const { severity = 'info', variant = 'standard' } = props

  return (
    <span className={props.className}>
      <Alert severity={severity} variant={variant}>
        {props.children}
      </Alert>
    </span>
  )
  // const setBgColor = () => {
  //   if (props.theme === 'success') return 'var(--green-50)'
  //   if (props.theme === 'warning') return 'var(--yellow-100)'
  //   if (props.theme === 'error') return 'var(--red-50)'
  //   return 'var(--sky-100)'
  // }

  // const setIcon: () => { name: TIconNames; color: TColors } = () => {
  //   if (props.theme === 'success') return { name: 'TickSquare', color: 'teal-500' }
  //   if (props.theme === 'warning') return { name: 'Danger', color: 'orange-400' }
  //   if (props.theme === 'error') return { name: 'InfoCircle', color: 'red-600' }

  //   return { name: 'InfoSquare', color: 'blue-500' }
  // }

  // const setHeight = () => {
  //   if (props.size === 'small') return 'py-2.5'
  //   return 'py-4'
  // }

  // return (
  //   <div className={`flex rounded-md px-4 ${props.className} ${setHeight()}`} style={{ backgroundColor: setBgColor() }}>
  //     {props.showIcon && <PdvIcon className="pr-3" color={setIcon().color} size="medium" name={setIcon().name} />}
  //     {typeof props.children === 'string' ? (
  //       <h6 className="font-normal" style={{ color: `var(--${setIcon().color})` }}>
  //         {props.children}
  //       </h6>
  //     ) : (
  //       <div className="w-full">{props.children}</div>
  //     )}
  //   </div>
}

export default PdvAlert
