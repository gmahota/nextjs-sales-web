import SectionTitle from '../section-title'
export const Tree = () => (
  <>
    <SectionTitle title="Folder tree" subtitle="All folders" />
    <div className="flex">
      <div className="w-full">
        <pre>{`├── public
│   ├── assets
│   │   └── faces
│   ├── icons
│   ├── images
│   │   └── products
│   ├── logos
│   ├── pages
│   │   └── error-page
│   └── screenshots
└── src
    ├── components
    │   ├── alerts
    │   ├── backdrop
    │   ├── badges
    │   ├── breadcrumbs
    │   ├── buttons
    │   ├── charts
    │   ├── chat
    │   ├── circle
    │   ├── coming-soon
    │   ├── dashboard
    │   ├── datatable
    │   ├── datepicker
    │   ├── documentation
    │   ├── drag-and-drop
    │   ├── dropdowns
    │   ├── dropzone
    │   ├── e-commerce
    │   ├── faq
    │   ├── flag
    │   ├── forms
    │   ├── hotkeys
    │   ├── inbox
    │   ├── kanban
    │   ├── landing
    │   ├── left-sidebar-1
    │   ├── lists
    │   ├── loader
    │   ├── login-1
    │   ├── login-2
    │   ├── login-3
    │   ├── maps
    │   ├── modals
    │   ├── navbar-1
    │   ├── notifications
    │   ├── pagination
    │   ├── popovers
    │   ├── pricing-tables
    │   ├── progress-bars
    │   ├── recharts
    │   ├── right-sidebar-1
    │   ├── sample-forms
    │   ├── section-title
    │   ├── sliders
    │   ├── social-feed
    │   ├── star-rating
    │   ├── steps
    │   ├── switch
    │   ├── tabs
    │   ├── tasks
    │   ├── text-editor
    │   ├── timelines
    │   ├── todo
    │   ├── tooltips
    │   ├── user-widgets
    │   ├── widget
    │   └── widgets
    ├── css
    │   ├── components
    │   ├── layouts
    │   └── palettes
    ├── functions
    ├── json
    ├── layouts
    │   ├── centered
    │   ├── centered-form
    │   ├── empty
    │   └── layout-1
    ├── pages
    └── reducers

        `}</pre>
      </div>
    </div>
  </>
)
