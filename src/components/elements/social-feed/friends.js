import friends from '../../../json/friends.json'

const Index = () => {
  return (
    <div className="w-full">
      <div className="mb-2 uppercase font-bold text-xs tracking-wider flex flex-row items-center justify-start w-full uppercase">Friends</div>
      <div className="w-full">
        {friends.map((item, i) => (
          <div
            className="flex items-center justify-start p-2 space-x-4"
            key={i}>
            <div className="flex-shrink-0 w-8">
              <img
                src={item.img}
                alt="media"
                className={`h-8 w-full rounded-full ${
                  item.online ? 'ring-green' : 'ring-red'
                }`}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm font-bold">{item.name}</div>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index
