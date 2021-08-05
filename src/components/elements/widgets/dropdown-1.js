import React, {useState, useEffect, useRef} from 'react'
import AccountLinks from './account-links'
import {FiMoreVertical} from 'react-icons/fi'

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
        className="btn btn-default btn-circle btn-icon bg-transparent hover:bg-transparent active:bg-transparent relative">
        <FiMoreVertical className="stroke-current stroke-1" size={18} />
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 mt-8 ${hidden ? '' : 'open'}`}>
        <div className="dropdown-content w-48 bottom-start">
          <AccountLinks />
        </div>
      </div>
    </div>
  )
}

export default Dropdown
