import { FC } from 'react'

type TPdvCardContainer = {
  theme?: 'light' | 'dark'
  className?: string
}

const PdvCardContainer: FC<TPdvCardContainer> = (props) => {
  return (
    <div
      className={`${props.className} overflow-hidden`}
      style={{
        backgroundColor: props.theme?.includes('dark') ? 'var(--gray-25)' : 'var(--white)',
        boxShadow: 'var(--shadow-gray--006)',
        borderRadius: '0.75rem'
      }}
    >
      {props.children}
    </div>
  )
}

export default PdvCardContainer
