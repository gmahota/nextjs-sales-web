import React, {useState} from 'react'
import Datetime from 'react-datetime'

const Datepicker = () => {
  const [value, setValue] = useState(null)
  const onChange = v => {
    console.log(v.format())
    setValue(v)
  }
  return (
    <div className="form-element">
      <span className="text-sm text-default">
        <span>Date picker</span>
        {value && <span>: {value.format('DD-MM-YYYY')}</span>}
      </span>
      <Datetime
        defaultValue={new Date()}
        dateFormat="DD-MM-YYYY"
        timeFormat={false}
        input={true}
        inputProps={{
          className: 'form-input',
          placeholder: 'Select date'
        }}
        viewMode={'days'}
        onChange={onChange}
      />
    </div>
  )
}

export default Datepicker
