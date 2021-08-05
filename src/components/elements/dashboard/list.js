
import React  from 'react'
import {ProgressBar} from '../progress-bars'

export const List = () => {
  const items = [
    {
      title: 'Harum quia vel vero id.',
      sentence: 'Et odio facere in quis.',
      description: 'Est sit qui ea provident amet quam accusamus velit autem.',
      number: 8,
      progress: 52,
      color: 'bg-indigo-500',
      img: '/images/faces/m1.png',
      timeago: 'a few seconds ago'
    },
    {
      title: 'Qui itaque omnis distinctio commodi.',
      sentence: 'Tempore quis omnis tempore et.',
      description: 'Sint eos eaque autem et earum tempora velit ipsa odio.',
      number: 3,
      progress: 54,
      color: 'bg-indigo-500',
      img: '/images/faces/w2.png',
      timeago: 'a day ago'
    },
    {
      title: 'Nemo dolor reiciendis ut et.',
      sentence: 'Nisi aut iure et modi.',
      description:
        'Accusamus cumque voluptatem minima neque aut rem cupiditate mollitia rem.',
      number: 10,
      progress: 33,
      color: 'bg-yellow-500',
      img: '/images/faces/w3.png',
      timeago: '2 days ago'
    },
    {
      title: 'Provident dignissimos sed non quia.',
      sentence: 'Odit omnis enim sapiente labore.',
      description:
        'Et qui ut voluptatem debitis assumenda dolore velit quo vero.',
      number: 7,
      progress: 55,
      color: 'bg-red-500',
      img: '/images/faces/w10.png',
      timeago: '3 days ago'
    }
  ]
  return (
    <div className="w-full mb-4">
      {items.map((item, i) => (
        <div className="flex items-center justify-start p-2 space-x-4" key={i}>
          <div className="flex-shrink-0 w-8">
            <img
              src={item.img}
              alt="media"
              className="h-8 w-full shadow-lg rounded-full ring"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="text-sm font-bold">{item.title}</div>
            <div className="text-sm">{item.sentence}</div>
            <div className="flex flex-row items-center justify-around">
              <ProgressBar width={item.progress} color={item.color} />
              <span className="text-gray-500 whitespace-nowrap">{item.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
