import React from "react";
import {CircularBadge} from '../../elements/badges'

const List1 = ({items}) => (
  <div className="w-full mb-4">
    {items?.map((item, i) => (
      <div
        className="flex items-center justify-start p-2 space-x-4"
        key={item.id}>
        <div className="flex flex-col w-full">
          <div className="text-sm">{item.id} - {item.name}</div>
        </div>
        <div className="flex-shrink-0">
          {item.totalUsers}
        </div>
      </div>
    ))}
  </div>
)

export default List1
