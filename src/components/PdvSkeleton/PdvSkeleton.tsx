import NoSsr from '@mui/material/NoSsr'
import Skeleton from '@mui/material/Skeleton'

type TPdvSkeleton = {
  rows?: number
  className?: string
  variant?: 'circular' | 'rectangular' | 'text'
  animation?: 'pulse' | 'wave' | false
  height?: number
  width?: number
}
const PdvSkeleton = (props: TPdvSkeleton) => {
  const { rows = 1, variant = 'text', animation = 'wave' } = props

  const randomPercentage = () => Math.floor(Math.random() * (100 - 60 + 1)) + 60

  const setWidth = (index: number) => {
    if (variant !== 'text') return props?.width ?? 30
    if (props?.width) return props?.width

    return (index + 1) % 2 === 0 ? randomPercentage() + '%' : '100%'
  }

  return (
    <NoSsr>
      <div className={props?.className ?? ''}>
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} variant={variant} animation={animation} height={props?.height ?? 30} width={setWidth(index)} />
        ))}
      </div>
    </NoSsr>
  )
}

export default PdvSkeleton
