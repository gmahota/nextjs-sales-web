
import React  from 'react'
const Widget1 = ({title, description, right = null}) => {
  return (
    <div className="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-xs uppercase font-light text-gray-500">
            {title}
          </div>
          <div className="text-xl font-bold">{description}</div>
        </div>
        {right}
      </div>
    </div>
  )
}

export default Widget1
