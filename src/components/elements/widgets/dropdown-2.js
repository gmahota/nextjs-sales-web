import React, {useState, useEffect, useRef} from 'react'
import AccountLinks from './account-links'
import {FiChevronDown} from 'react-icons/fi'

const Dropdown = () => {
  const [hidden, setHidden] = useState(true)

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false
      }
      setHidden(!hidden)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [hidden, dropdownRef, buttonRef])

  const handleDropdownClick = () => {
    setHidden(!hidden)
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="btn btn-default btn-outlined btn-rounded btn-icon bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700">
        <span className="mr-2">Actions</span>
        <FiChevronDown className="stroke-current" />
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 ${hidden ? '' : 'open'}`}>
        <div className="dropdown-content w-48 bottom-start">
          <AccountLinks />
        </div>
      </div>
    </div>
  )
}

export default Dropdown
