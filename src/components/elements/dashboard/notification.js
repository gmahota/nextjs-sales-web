import React, {useState, useEffect} from 'react'
import Portal from '../portal'
import PropTypes from 'prop-types'
import {FiX, FiAlertCircle} from 'react-icons/fi'

const Notification = () => {
  const [visible, setVisible] = useState(false)
  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }
  useEffect(() => {
    setTimeout(() => {
      show()
    }, 2000)
  }, [])

  const item = {
    outerClassNames: 'z-50 h-auto w-full p-0',
    innerClassNames: 'bg-blue-500 text-white',
    animation: 'block',
    icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
    content: <span>This is an important message!</span>
  }
  const {outerClassNames, innerClassNames, animation, icon, content} = {...item}

  return (
    <>
      {visible && (
        <Portal selector="#portal">
          <div className={`${outerClassNames} ${show ? animation : ''}`}>
            <div
              className={`w-full flex items-center justify-start p-4 ${innerClassNames}`}>
              {icon && <div className="flex-shrink">{icon}</div>}
              <div className="flex-grow">{content}</div>
              <div className="flex-shrink">
                <button
                  onClick={hide}
                  className="ml-auto flex items-center justify-center">
                  <FiX className="stroke-current h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

Notification.propTypes = {
  show: PropTypes.bool,
  outerClassNames: PropTypes.string,
  innerClassNames: PropTypes.string,
  animation: PropTypes.string,
  btnTitle: PropTypes.string,
  btnClassNames: PropTypes.string,
  icon: PropTypes.any,
  content: PropTypes.any
}
export default Notification
