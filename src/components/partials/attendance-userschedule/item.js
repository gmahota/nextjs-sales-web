/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Item = ({item,handleOnClick}) => (
  <div className="w-full mb-4">

      <div
        className="flex items-center justify-start p-2 space-x-4"
        key={item.id}>
        <div className="flex flex-col w-full">
          <div className="text-sm">{item.id} - {item.name}</div>
        </div>
        <div className="flex-shrink-0">
          <a onClick={()=>handleOnClick(item.Users)}>{item.totalUsers}</a>
        </div>
      </div>

  </div>
)

export default Item
