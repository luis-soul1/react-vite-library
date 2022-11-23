import { useEffect, useRef } from 'react'

const useUpdateEffect = function (effectCallback: () => void, deps = []) {
  const isFirstMount = useRef(false)

  useEffect(() => {
    return () => {
      isFirstMount.current = false
    }
  }, [])

  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true
      return
    }
    return effectCallback()
  }, deps)
}

export default useUpdateEffect
