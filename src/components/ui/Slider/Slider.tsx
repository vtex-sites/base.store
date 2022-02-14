import type { ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import type { Settings } from 'react-slick'
import ReactSlick from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type Props = {
  show?: number
  children: ReactNode
}

function Slider({ children, show = 3 }: Props) {
  // TODO: Make controll settings via props
  const sliderRef = useRef<ReactSlick>(null)
  const [showNextArrow, setshowNextArrow] = useState<boolean>(true)
  const [showPrevArrow, setshowPrevArrow] = useState<boolean>(false)

  const handleChangeSlide = (currentSlide: number) => {
    const sliderLength = (sliderRef?.current?.props?.children as ReactNode[])
      .length

    const sliderToShow = sliderRef?.current?.props.slidesToShow ?? 0

    const prevArrowVisible = currentSlide !== 0

    const nextArrowVisible = currentSlide < sliderLength - sliderToShow

    setshowPrevArrow(prevArrowVisible)

    setshowNextArrow(nextArrowVisible)
  }

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: show,
    slidesToScroll: 3,
    afterChange: handleChangeSlide,
    appendDots: (dots) => (
      <div>
        <button
          data-store-slider-prev-arrow
          disabled={!showPrevArrow}
          onClick={sliderRef.current?.slickPrev}
        >
          Prev
        </button>
        {dots}
        <button
          data-store-slider-prev-arrow
          disabled={!showNextArrow}
          onClick={sliderRef.current?.slickNext}
        >
          Next
        </button>
      </div>
    ),
  }

  useEffect(() => {
    sliderRef.current?.forceUpdate()
  }, [])

  return (
    <ReactSlick {...settings} ref={sliderRef}>
      {children}
    </ReactSlick>
  )
}

export default Slider
