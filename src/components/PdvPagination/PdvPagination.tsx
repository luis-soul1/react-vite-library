import { Pagination, PaginationItem } from '@mui/material'
import { Fragment } from 'react'

import { TColors } from '../Colors/TColors'

type TPdvPagination = {
  count: number
  page: number
  className?: string
  color?: TColors
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void
}

const PdvPagination: React.FC<TPdvPagination> = (props) => {
  const { color = 'primary-color' } = props

  if (props.count <= 1) return <Fragment />
  return (
    <div className={`${props.className}`}>
      {props.count > 1 && (
        <Pagination
          count={props?.count}
          page={props?.page}
          shape="rounded"
          onChange={props?.onChange}
          renderItem={(item) => {
            const style = item.selected ? { backgroundColor: `var(--${String(color)})`, color: 'var(--white' } : {}
            return <PaginationItem style={style} sx={{ fontFamily: 'var(--primary-font)', fontSize: 14 }} {...item} />
          }}
        />
      )}
    </div>
  )
}

export default PdvPagination
export { PdvPagination }
