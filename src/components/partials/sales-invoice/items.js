import React, {useState} from 'react'
import {FiChevronRight,FiCheck} from 'react-icons/fi'
import * as numbers from "../../../functions/numbers";

const Items = ({header,name, items, active=true}) => {
  const [hidden, setHidden] = useState(active)
  return (
    <div className="flex items-center justify-start py-2">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between">

        <button
            onClick={() => setHidden(!hidden)}
            className="bg-transparent text-left text-gray-900">
            <span className="font-bold text-sm">{name}</span>
            <FiCheck
              className={`ml-auto stroke-current transition ease-in-out duration-150 transform ${
                hidden ? 'rotate-0' : 'rotate-90'
              }`}
            />
          </button>

          {header}

          <button
            onClick={() => setHidden(!hidden)}
            className="bg-transparent text-left text-gray-900 flex flex-row items-center justify-start w-full">
            <span className="font-bold text-sm">{name}</span>
            <FiChevronRight
              className={`ml-auto stroke-current transition ease-in-out duration-150 transform ${
                hidden ? 'rotate-0' : 'rotate-90'
              }`}
            />
          </button>
        </div>
        <div className={`py-2 w-full ${hidden ? 'hidden' : 'block'}`}>
          {items?.map((item, i) => (
            <div key={i} className="flex flex-row w-full min-w-0">
              <div className="flex flex-col w-full min-w-0">
                <div className="text-sm font-bold">{item.code}</div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-sm font-bold">
                  {numbers.formatNumber(item.total)}
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  )
}

export default Items
