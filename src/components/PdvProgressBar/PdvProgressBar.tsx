// @ts-expect-error: Unreachable code error
import { Progress } from 'react-sweet-progress'

import { TColors } from '../Colors/TColors'

import 'react-sweet-progress/lib/style.css'

type TPdvProgressBar = {
  percent: number
  customPercent?: string | number
  type?: 'circle'
  className?: string
  color?: TColors
  strokeColor?: TColors
  width?: number
}

const PdvProgressBar: React.FC<TPdvProgressBar> = (props) => {
  const setColor = () => {
    const isCircle = props.type === 'circle'
    if (props.percent >= 31 && props.percent <= 79) return { trailColor: `var(--${isCircle ? 'gray-50' : 'blue-100'})`, color: 'var(--blue-500)' }
    if (props.percent >= 80 && props.percent <= 100)
      return { trailColor: `var(--${isCircle ? 'gray-50' : 'esmerald-100'})`, color: 'var(--teal-400)' }
    return { trailColor: `var(--${isCircle ? 'gray-50' : 'red-100'})`, color: 'var(--red-600)' }
  }

  const formatPercent = () => {
    if (typeof props.percent === 'string') return +props.percent
    return props.percent
  }

  const setPercentText = () => {
    if (!props.customPercent)
      return props.type === 'circle' ? (
        <h5 className="font-bold">{`${lastDotToDecimal(String(props.percent))}%`}</h5>
      ) : (
        <h6 className="font-bold">{`${lastDotToDecimal(String(props.percent))}%`}</h6>
      )
    return (
      <h5 className="text-center font-bold" style={{ lineHeight: 0.9 }}>
        {props.customPercent} <p className="body2 ">Puntos</p>
      </h5>
    )
  }

  return (
    <Progress
      type={props.type ?? ''}
      className={props.className ?? ''}
      width={props.width ?? 90}
      percent={formatPercent() ?? 0}
      strokeWidth={12}
      theme={{
        active: {
          symbol: setPercentText(),
          trailColor: props.strokeColor ? `var(--${String(props.strokeColor)})` : setColor().trailColor,
          color: props.color ? `var(--${String(props.color)})` : setColor().color
        },
        success: {
          symbol: setPercentText(),
          color: 'var(--teal-500)'
        },
        default: {
          symbol: setPercentText(),
          trailColor: 'var(--red-100)'
        }
      }}
    />
  )
}

export default PdvProgressBar

const lastDotToDecimal = (number: string | number) => {
  const numberToString = number.toString()
  if (!numberToString.includes('.')) return numberToString
  return numberToString.replace(/.([^.]*)$/, ',$1')
}
