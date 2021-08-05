import items from '../../../json/timelines.json'

export const Timeline1 = () => {
  return (
    <div className="flex flex-col w-full">
      {items.map((item, i) => (
        <div className="flex relative justify-start items-start" key={i}>
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 dark:bg-gray-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-blue-500 text-white relative z-10 font-medium text-sm">
            {item.index}
          </div>
          <div className="flex-grow flex items-start flex-col pb-4">
            <div className="flex items-start justify-start px-4">
              <div className="flex flex-col w-full">
                <div className="text-sm font-bold">{item.title}</div>
                <div className="text-sm">{item.sentence}</div>
                <div className="text-sm">{item.timeago}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
