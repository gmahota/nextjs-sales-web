
import React  from 'react'
const Section = ({title, description, right = null, children}) => {
  return (
    <div className="w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-col">
          <div className="text-sm font-light text-gray-500">{title}</div>
          <div className="text-sm font-bold">{description}</div>
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

export default Section
