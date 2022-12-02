import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { useDebouncedCallback } from './useDebounce'

export const useDynamicTableFilters = (values: FieldValues, onChangeCallback?: (inputs: Record<string, string>) => void) => {
  const filterValues: FieldValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: '' }), {})

  const filtersControl = useForm({ defaultValues: filterValues })

  const [filters, setFilters] = useState(filterValues)

  const [parsedFilters, setParsedFilters] = useState({})

  useEffect(() => {
    setParsedFilters(transformValues(values, filters))
  }, [filters])

  const handleFilters = useDebouncedCallback((inputs: Record<string, string>) => {
    if (onChangeCallback) onChangeCallback(inputs)

    setFilters({
      ...filters,
      ...inputs
    })
  }, 500)

  const transformValues = (object: Record<string, unknown>, values: Record<string, unknown>) => {
    return Object.entries(object).reduce((acc, [value, key]) => ({ ...acc, [key as string]: values[value] }), {})
  }

  useEffect(() => {
    const subscription = filtersControl.watch((inputValues) => handleFilters(inputValues))

    return () => subscription.unsubscribe()
  }, [filtersControl.watch])

  return {
    inputFilterControl: filtersControl,
    filters: parsedFilters,
    handleFilters
  }
}

export default useDynamicTableFilters
