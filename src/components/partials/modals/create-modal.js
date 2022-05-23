import React, {useState, useEffect, useRef} from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import Portal from '../../elements/portal'
import {FiX,FiPlus} from 'react-icons/fi'

const Modal = ({title, icon, buttonTitle, buttonClassName, body, handleSave,handleClear}) => {
  const {palettes} = useSelector(
    (state) => ({
      palettes: state.palettes
    }),
    shallowEqual
  )
  let {background} = {
    ...palettes
  }

  const modalRef = useRef(null)
  const [open, setOpen] = useState(false)
  const show = () => {
    setOpen(true)
  }
  const hide = () => {
    setOpen(false)
    handleClear()
  }

  const save=async ()=> {
    setOpen(false)
    await handleSave()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef || !modalRef.current) return false
      console.log(modalRef.current.contains(event.target))
      if (!open || modalRef.current.contains(event.target)) {
        return false
      }
      setOpen(!open)
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, modalRef])

  return (
    <>
      <button
        className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
        type="button"
        onClick={show}>

        <FiPlus className="stroke-current text-white" size={18} />
            <span>Add New</span>
      </button>
      {open && (
        <Portal selector="#portal">
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === 'dark' ? 'dark' : ''}`}
            data-background={background}>
            <div
              className=""
              ref={modalRef}>
              <div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="flex items-start justify-start p-2 space-x-4">
                    <div className="flex-shrink-0 w-12">{icon}</div>
                    <div className="flex flex-col w-full">
                      <div className="text-lg mb-2 font-bold">{title}</div>
                      {body}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
                  <button
                    className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                    type="button"
                    onClick={hide}>
                    Cancel
                  </button>
                  <button
                    className={buttonClassName}
                    type="button"
                    onClick={save}>
                    {buttonTitle}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default Modal
