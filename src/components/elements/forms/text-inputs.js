import React from "react";
export const TextInput = ({ label = "Label", value = "", inline = false, name = "name",
  placeholder = "Enter something...", onTextChange }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">{label}</div>
    <input
      name={name}
      value={value}
      type="text"
      className="form-input"
      placeholder={placeholder}
      onChange={event => onTextChange(event.target.value)}
    />
  </div>
)

export const InvalidTextInput = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>
    <input
      name="name"
      type="text"
      className="form-input form-input-invalid"
      placeholder="john@example.com"
    />
    <div className="form-error">First name is required</div>
  </div>
)

export const ValidTextInput = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>
    <input
      name="name"
      type="text"
      className="form-input form-input-valid"
      placeholder="john@example.com"
    />
    <div className="form-success">First name is valid</div>
  </div>
)
