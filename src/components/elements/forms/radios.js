import React from "react";
import { FiAlignJustify } from "react-icons/fi"

export const Radios = ({item,selected}) => (
  <div className="form-element">
    {item.label && <div className="form-label">{item.label}</div>}
    <div className="flex items-center justify-start space-x-2">
      {item.options?.map((option, j) => (
        <label key={FiAlignJustify} className="flex items-center justify-start space-x-2">
          <input
            key={option.value}
            type="radio"
            value={option.value}
            name={item.name}
            checked={option.value === selected}
            onChange={event => item.onValueChange(event.target.value)}
            className="form-radio h-4 w-4"
          />
          <span key={j}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  </div>
)

export const Radio = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">Label</div>
    <div className="flex items-center justify-start space-x-2">
      <div className="inline-flex items-center space-x-2">
        <input
          type="radio"
          value="0"
          name="r1"
          className="form-radio text-blue-500 h-4 w-4"
        />
        <span>Option 1</span>
      </div>
      <div className="inline-flex items-center space-x-2">
        <input
          type="radio"
          value="1"
          name="r1"
          className="form-radio text-blue-500 h-4 w-4"
        />
        <span>Option 2</span>
      </div>
    </div>
    <div className="form-hint">This is a hint</div>
  </div>
)

export const InvalidRadio = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>

    <div className="flex items-center justify-start space-x-2">
      <div className="inline-flex items-center space-x-2">
        <input
          type="radio"
          value="0"
          name="r1"
          className="form-radio form-radio-invalid text-red-500 h-4 w-4"
        />
        <span>Option 1</span>
      </div>
      <div className="inline-flex items-center space-x-2">
        <input
          type="radio"
          value="1"
          name="r1"
          className="form-radio form-radio-invalid text-red-500 h-4 w-4"
        />
        <span>Option 2</span>
      </div>
    </div>

    <div className="form-error">First name is required</div>
  </div>
)

export const ValidRadio = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>
    <div className="flex items-center justify-start space-x-2">
      <div className="inline-flex items-center space-x-2">
        <input
          type="radio"
          value="0"
          name="r1"
          className="form-radio form-radio-valid text-green-500 h-4 w-4"
        />
        <span>Option 1</span>
      </div>
      <div className="inline-flex items-center space-x-2">
        <input
          type="radio"
          value="1"
          name="r1"
          className="form-radio form-radio-valid text-green-500 h-4 w-4"
        />
        <span>Option 2</span>
      </div>
    </div>
    <div className="form-success">First name is valid</div>
  </div>
)
