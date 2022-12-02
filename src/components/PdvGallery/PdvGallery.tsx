import { FC, ReactElement, useRef, useState } from 'react'
import { default as Slider, Settings } from 'react-slick'

import useDeviceWidth from '../../hooks/useDeviceWidth'
import { PdvIcon } from '../Icons/PdvIcon'

type TPdvGallery = {
  children: React.ReactNode[] | React.ReactNode
  className?: string
  vertical?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  speed?: number
  swipe?: boolean
  verticalSwiping?: boolean
}
type TPdvGalleryItem = {
  children: React.ReactNode[] | React.ReactNode
  className?: string
  onClick?: () => void
}

export const PdvGallery = (props: TPdvGallery) => {
  const sliderRef = useRef<Slider | null>()
  const deviceWidth = useDeviceWidth()
  const isMobile = deviceWidth === 'mobile'
  const [currentSlide, setCurrentSlide] = useState(0)
  const settings: Settings = {
    dots: !!isMobile,
    arrows: false,
    infinite: true,
    slidesToShow: props.slidesToShow ?? 3,
    slidesToScroll: props.slidesToScroll ?? 1,
    speed: props.speed ?? 500,
    vertical: props.vertical ?? false,
    cssEase: 'ease-in',
    swipe: true,
    verticalSwiping: props.vertical ?? false,
    swipeToSlide: true,
    beforeChange: (prev: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => {
      return <div className={`h-2 rounded-full bg-indigo-700 transition-all duration-200 ${currentSlide === i ? 'w-3' : 'w-2'}`}></div>
    }
  }
  const arrowsPosition = () => {
    if (props.children && (props.children as ReactElement[]).length === props.slidesToShow) return 'hidden'
    if (props.vertical) {
      return 'md:flex flex-row-reverse flex-col justify-between absolute h-full top-0 left-1/2'
    }
    return 'md:flex justify-between absolute top-[42%] w-full'
  }

  const handleSlide = (direction: 'prev' | 'next') => {
    if (sliderRef.current) {
      direction === 'prev' && sliderRef.current.slickNext()
      direction === 'next' && sliderRef.current.slickPrev()
    }
  }

  return (
    <div className={`grid grid-cols-12 ${props.className ?? ''}`}>
      <div className={`relative col-span-12`}>
        <Slider
          className={`slick-padding ${props.vertical ? 'py-4 md:py-10' : 'px-0 md:px-8 lg:px-10'}`}
          ref={(slider) => (sliderRef.current = slider)}
          {...settings}
        >
          <div>
            <h3>1</h3>
          </div>
        </Slider>
        <div className={`hidden ${arrowsPosition()}`}>
          <span className="cursor-pointer" onClick={() => handleSlide('next')}>
            <PdvIcon className="cursor-pointer" size={45} name={props.vertical ? 'ChevronUp' : 'ChevronLeft'} color="indigo-700" />
          </span>
          <span className="cursor-pointer" onClick={() => handleSlide('prev')}>
            <PdvIcon className="cursor-pointer" size={45} name={props.vertical ? 'ChevronDown' : 'ChevronRight'} color="indigo-700" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default PdvGallery

export const PdvGalleryItem: FC<TPdvGalleryItem> = (props) => {
  return (
    <div className={`total-center my-1 ${props.className}`} onClick={props.onClick}>
      {props.children}
    </div>
  )
}
