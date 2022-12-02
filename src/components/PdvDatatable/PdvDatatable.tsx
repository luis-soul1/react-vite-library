import {Collapse} from '@mui/material'
import { useState, useEffect, ThHTMLAttributes, TdHTMLAttributes, Fragment, useMemo, Dispatch, SetStateAction } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import EmptyImg from '../../assets/images/backgrounds/empty-table.png'
import { useDebouncedCallback } from '../../hooks/useDebounce'
import usePdvPagination from '../../hooks/usePdvPagination'
import { cleanString, sortByString } from '../../utils/helpers'
import { TColors } from '../Colors/TColors'
import InputField from '../Forms/Input/InputField'
import { PdvIcon } from '../Icons/PdvIcon'
import { TIconNames } from '../Icons/TIconNames'
import PdvButton from '../PdvButton'
import PdvPagination from '../PdvPagination'

type TPdvDatatable<T> = {
  columns: IColumns<T>[]
  dataSource: T[]
  defaultPagination?: boolean
  pagination?: {
    count: number
    page: number
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void
  }
  variant?: 'full' | 'condensed'
  paginationColor?: TColors
  limit?: number
  expandedRows?: IExpandedRows<T>
  headerColor?: TColors
  className?: string
  rowClassName?: string
}

export interface IColumns<T> {
  name: string
  dataIndex: keyof T
  sortable?: boolean
  filterable?: boolean
  align?: ThHTMLAttributes<T>['align'] | TdHTMLAttributes<T>['align']
  width?: string | number
  render?: (value: T[keyof T], record: T, array: T[]) => React.ReactNode
  customFilter?: () => React.ReactNode
}

export interface IExpandedRows<T> {
  autoCollapse: boolean
  expandedRowRender: (record: T) => React.ReactNode
  rowExpandable: (record: T) => boolean
  arrowColor?: TColors
}

const PdvDatatable = <T,>(props: TPdvDatatable<T>) => {
  const { defaultPagination = true, headerColor = 'primary-color', paginationColor = 'primary-color', variant = 'full' } = props
  const pagination = usePdvPagination()

  const defaultFilterInputValues = useMemo(() => {
    if (!props.columns) return {}
    return props.columns.reduce((acc, item) => (item.filterable ? { ...acc, [item.dataIndex]: '' } : { ...acc }), {})
  }, [props.columns])
  const { inputControl, filteredData, setFilteredData } = useTableFilters<T>(props.dataSource, defaultFilterInputValues)
  const { currentPageRecords, totalPages, calculateTotalPages } = useTablePagination<T>(filteredData, pagination.page, props.limit)
  const { sortTable, sortIconName } = useTableSort<T>(filteredData, setFilteredData, props.dataSource)

  const { isRecordExpanded, toggleExpand } = useExpandableRows({
    dataSource: props.dataSource,
    key: props.columns[0].dataIndex,
    autoCollapse: !!props.expandedRows?.autoCollapse
  })

  const isFilterableColumns = props.columns.some((column) => column.filterable || column.customFilter !== undefined)

  const setBgColor = (index: number) => ((index + 1) % 2 === 0 ? 'bg-gray-25 border-y border-gray-100 ' : '')

  const onChangePage = props?.pagination?.onChange !== undefined ? props.pagination.onChange : pagination.onChange

  return (
    <>
      <div className={`overflow-x-auto ${props?.className ?? ''}`}>
        <table className="w-full table-auto">
          <thead>
            <tr>
              {props?.expandedRows && <th style={{ backgroundColor: `var(--${String(headerColor)})`, width: '5%' }} />}

              {props.columns.map((column) => (
                <th
                  key={column.name}
                  align={column.align || 'left'}
                  className="break-words"
                  style={{ backgroundColor: `var(--${String(headerColor)})`, width: column.width ?? 'auto' }}
                >
                  <div className={`${String(headerColor)} ${props.rowClassName}`} style={{ padding: '1rem 1.5rem' }}>
                    <p className={`subtitle1 flex items-center font-bold text-white`}>
                      {column.name}
                      {column.sortable && (
                        <span className="cursor-pointer" onClick={() => sortTable(column.dataIndex)}>
                          <PdvIcon className="ml-1" name={sortIconName(column.dataIndex)} color="white" />
                        </span>
                      )}
                    </p>
                  </div>
                </th>
              ))}
            </tr>

            <tr>
              {props?.expandedRows && isFilterableColumns && (
                <th className="bg-gray-50">
                  <div className={props.rowClassName} style={{ padding: `${variant === 'full' ? '1rem' : '0.25rem'} 1.5rem` }}></div>
                </th>
              )}
              {isFilterableColumns &&
                props.columns.map((column) => {
                  return (
                    <th key={`filter-${column.name}`} className="bg-gray-50">
                      <div className={props.rowClassName} style={{ padding: `${variant === 'full' ? '1rem' : '0.25rem'} 1.5rem` }}>
                        {column.filterable && column.customFilter === undefined && (
                          <InputField
                            name={column.dataIndex as string}
                            form={inputControl}
                            className="w-full"
                            inputProps={{ placeholder: 'Buscar..', className: 'text-gray-500 h-9' }}
                          />
                        )}

                        {column.customFilter && column.customFilter()}
                      </div>
                    </th>
                  )
                })}
            </tr>
          </thead>
          <tbody>
            {!currentPageRecords.length ? (
              <tr>
                <td colSpan={props.columns.length}>
                  <EmptyTable />
                </td>
              </tr>
            ) : (
              currentPageRecords.map((record, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`w-full p-0 ${setBgColor(index)}`}>
                      {props?.expandedRows && (
                        <td className={props.rowClassName} style={{ padding: '0.5rem 1rem' }} width={30}>
                          {props?.expandedRows?.rowExpandable(record) && (
                            <PdvButton
                              className="cursor-pointer"
                              variant="default"
                              iconColor={props?.expandedRows?.arrowColor ?? 'primary-color'}
                              icon={`${isRecordExpanded(record, index) ? 'KeyArrowUp' : 'KeyArrowDown'}`}
                              onClick={() => toggleExpand(record, index)}
                            />
                          )}
                        </td>
                      )}
                      {props.columns.map((column, index) => (
                        <td
                          key={`${record[column.dataIndex]}-${column.name}-${index}`}
                          align={column.align || 'left'}
                          className={`subtitle2 break-words ${props.rowClassName}`}
                          style={{
                            padding: `${variant === 'full' ? '1rem' : '0.25rem'} 1.5rem`,
                            width: column.width ?? 'auto',
                            color: 'var(--gray-500)'
                          }}
                        >
                          {column.render ? column.render(record[column.dataIndex], record, props.dataSource) : record[column.dataIndex]}
                        </td>
                      ))}
                    </tr>
                    <tr className="w-full">
                      <td colSpan={props.columns.length + 1} className={`w-full border-y border-gray-100`}>
                        <Collapse in={props?.expandedRows && props?.expandedRows?.rowExpandable(record) && isRecordExpanded(record, index)}>
                          {props?.expandedRows?.expandedRowRender(record)}
                        </Collapse>
                      </td>
                    </tr>
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {!props.pagination && defaultPagination && !!currentPageRecords.length && (
        <PdvPagination
          className="my-6 flex justify-end"
          count={totalPages}
          page={pagination.page}
          onChange={pagination.onChange}
          color={paginationColor}
        />
      )}

      {props.pagination && !!currentPageRecords.length && (
        <>
          <PdvPagination
            className="my-6 flex justify-end"
            count={calculateTotalPages(props.pagination.count)}
            page={props.pagination.page}
            onChange={(_, page: number) => onChangePage(_, page)}
            color={paginationColor}
          />
        </>
      )}
    </>
  )
}

const EmptyTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden bg-sky-50 py-5">
      <div className="pr-32">
        <img src={EmptyImg} alt="Tabla sin datos" />
      </div>

      <span className="bg-rose-350 rounded-md p-2 text-center text-white">¡Ups! No se encontraron datos</span>
    </div>
  )
}

const useExpandableRows = <T,>({ dataSource, key, autoCollapse = false }: { dataSource: T[]; key: keyof T; autoCollapse: boolean }) => {
  const [expandedRows, setExpandedRows] = useState<{ key: string; expanded: boolean }[]>([])

  const isRecordExpanded = (record: T, index: number) => !!expandedRows.find((row) => row.key === `${record[key]}-${index}`)?.expanded

  const toggleExpand = (record: T, index: number) => {
    setExpandedRows(
      expandedRows.map((row) => {
        let updatedRow = autoCollapse ? { ...row, expanded: false } : { ...row }

        if (row.key === `${record[key]}-${index}`) updatedRow = { ...row, expanded: !row.expanded }

        return updatedRow
      })
    )
  }

  const createKeys = (data: T[]) => setExpandedRows(data.map((item, index) => ({ key: `${item[key]}-${index}`, expanded: false })))

  useEffect(() => {
    createKeys(dataSource)
  }, [])

  return { isRecordExpanded, toggleExpand }
}

const useTableFilters = <T,>(dataSource: T[], defaultValues: FieldValues) => {
  const filtersControl = useForm<FieldValues>({ defaultValues })
  const [filteredData, setFilteredData] = useState(dataSource)

  const handleFilter = useDebouncedCallback((value: string, values: FieldValues) => {
    const isAllEmpty = Object.values(values).every((value) => value === '')
    if (isAllEmpty) return setFilteredData(dataSource)

    let matchFilter = filteredData
    Object.entries(values).forEach(([key, value]) => {
      matchFilter = matchFilter.filter((record) => cleanString(String(record[key as keyof T])).includes(cleanString(value)))
    })
    setFilteredData(matchFilter)
  }, 500)

  useEffect(() => {
    const subscription = filtersControl.watch((values, { name }) => {
      handleFilter(name !== undefined ? values[name] : '', values)
    })

    return () => subscription.unsubscribe()
  }, [filtersControl.watch])

  useEffect(() => setFilteredData(dataSource), [dataSource])

  return { inputControl: filtersControl, filteredData, setFilteredData }
}

const useTablePagination = <T,>(dataSource: T[], currentPage: number, limit: number | undefined) => {
  const recordsPerPage = limit ?? 10

  const paginatedData = (data: T[], page: number, pageSize = recordsPerPage) => {
    const paginated = data.slice((page - 1) * pageSize, page * pageSize)
    return paginated.length ? paginated : data
  }

  const calculateTotalPages = (totalRecords: number) => Math.ceil(totalRecords / recordsPerPage)

  const currentPageRecords = paginatedData(dataSource, currentPage)

  return { currentPageRecords, totalPages: calculateTotalPages(dataSource.length), calculateTotalPages }
}

const useTableSort = <T,>(filteredData: T[], setFilteredData: Dispatch<SetStateAction<T[]>>, dataSource: T[]) => {
  const [sortType, setSortType] = useState<'up' | 'down' | 'no_sort'>('no_sort')
  const [sortKey, setSortKey] = useState<string | number | symbol>('')

  const sortTable = (key: keyof T) => {
    const dispatch: Record<string, 'up' | 'down' | 'no_sort'> = {
      no_sort: 'up',
      up: 'down',
      down: 'no_sort'
    }
    const dispatchState = sortKey === key ? dispatch[sortType] : 'up'
    setSortType(dispatchState)
    const updateFilteredData = [...filteredData]
    const sortedData = updateFilteredData.sort((a, b) => {
      if (typeof a[key] === 'string') return sortByString<T>(dispatchState === 'up' ? a : b, dispatchState === 'up' ? b : a, key)
      if (typeof a[key] === 'number') return dispatchState === 'up' ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key])
      return 0
    })
    const sortedFilteredData = dispatchState === 'no_sort' ? dataSource : sortedData
    setFilteredData(sortedFilteredData)
    sortKey !== key && setSortKey(key)
  }

  const sortIconName = (key: keyof T) => {
    const dispatch: Record<'up' | 'down' | 'no_sort', TIconNames> = {
      no_sort: 'Sort',
      up: 'KeyArrowUp',
      down: 'KeyArrowDown'
    }
    return key === sortKey ? dispatch[sortType] : 'Sort'
  }

  return { sortTable, sortIconName }
}

export default PdvDatatable

export {PdvDatatable}