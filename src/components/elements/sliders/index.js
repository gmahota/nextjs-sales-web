import React, {useState} from 'react'
import {random} from '../../../functions/numbers'
import Slider from 'rc-slider'

const Range = Slider.Range

export const DefaultSlider = ({className="slider-blue"}) => {
  const [value, onChange] = useState(random(30,70))
  return (
    <Slider
      className={className}
      onChange={onChange}
      min={0}
      max={100}
      defaultValue={value}
    />
  )
}

export const RangeSlider = ({className="slider-blue"}) => {
  const [value, onChange] = useState([random(10,30), random(60,90)])
  return (
    <Range
      className={className}
      allowCross={false}
      defaultValue={value}
      onChange={onChange}
      min={0}
      max={100}
    />
  )
}
