import { useEffect, useState } from 'react'

import { useMediaQuery } from '@mui/material'

export type TCurrentWidth = 'mobile' | 'tablet' | 'tabletXl' | 'desktop' | 'desktopXl' | ''

const useDeviceWidth = () => {
  const isMobile = useMediaQuery('(max-width:640px)')
  const isTablet = useMediaQuery('(min-width:641px) and (max-width:1023px)')
  const isTabletXl = useMediaQuery('(min-width:1024px) and (max-width:1279px)')
  const isDesktop = useMediaQuery('(min-width:1280px) and (max-width:1539px)')
  const isDesktopXl = useMediaQuery('(min-width:1540px)')
  const [currentWidth, setCurrentWidth] = useState<TCurrentWidth>('')

  const deviceWidth = () => {
    if (isMobile) return setCurrentWidth('mobile')
    if (isTablet) return setCurrentWidth('tablet')
    if (isTabletXl) return setCurrentWidth('tabletXl')
    if (isDesktop) return setCurrentWidth('desktop')
    if (isDesktopXl) return setCurrentWidth('desktopXl')
    return
  }

  useEffect(() => {
    deviceWidth()
  }, [isMobile, isTablet, isDesktop, isDesktopXl])

  return currentWidth
}

export default useDeviceWidth
