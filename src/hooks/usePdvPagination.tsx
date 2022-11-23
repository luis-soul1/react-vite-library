import { useState } from 'react'

const usePdvPagination = () => {
  const [page, setPage] = useState(1)

  const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return { page, onChange }
}

export default usePdvPagination
