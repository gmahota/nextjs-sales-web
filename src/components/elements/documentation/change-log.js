import SectionTitle from '../section-title'
import {Badge} from '../../../components/elements/badges'

const items = [
  {
    date: 'Dec 19, 2020',
    tag: (
      <Badge size="sm" color="bg-red-500 text-white" rounded>
        Update
      </Badge>
    ),
    items: [
      <div>
        Updated to TailwindCSS 2
      </div>,
    ]
  },
  {
    date: 'Sep 22, 2020',
    tag: (
      <Badge size="sm" color="bg-red-500 text-white" rounded>
        Update
      </Badge>
    ),
    items: [
      <div>
        Refactored modals
      </div>,
      <div>
        Updated TailwindCSS
      </div>,
      <div>
        Added notifications component
      </div>,
    ]
  },
  {
    date: 'Jul 25, 2020',
    tag: (
      <Badge size="sm" color="bg-green-500 text-white" rounded>
        Release
      </Badge>
    ),
    items: [
      <span>Initial release</span>,
      <>
        Published template at{' '}
        <a
          href="https://d-board-nextjs.mobifica.com"
          target="_blank"
          rel="noopener noreferrer">
          this demo url
        </a>
      </>
    ]
  }
]
export const ChangeLog = () => (
  <>
    <SectionTitle title="Change log" subtitle="Latest updates" />
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div className="w-full mb-2" key={i}>
          <div className="text-base font-sans font-bold mb-2">
            {item.date}
          </div>
          <p className="mb-2">{item.tag}</p>
          <ol className="list-disc pl-6">
            {item.items.map((list, j) => (
              <li className="mb-2" key={j}>{list}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  </>
)
