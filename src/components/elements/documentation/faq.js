import SectionTitle from '../section-title'

export const Customization = () => {
  const questions = [
    {
      question: 'How do I open the template?',
      answer: (
        <div>
          First, make sure the <code>create-next-app</code> package is
          installed. For more information go to{' '}
          <a
            href="https://nextjs.org/docs/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="link">
            this url
          </a>
          . Then you need to run <code>yarn install</code> to install the
          template followed by <code>yarn dev</code> to start the development
          server
        </div>
      )
    },
    {
      question:
        'I need an empty page to start developing. Where can I find one?',
      answer: (
        <div>
          Go to the <code>src/pages/empty-page.js</code> file
        </div>
      )
    },
    {
      question: 'How do I add a new page and/or route?',
      answer: (
        <div>
          Routes are handled automatically by <code>Next.js</code>. To add a new
          page just add it to the <code>src/pages</code> folder.
        </div>
      )
    },
    {
      question: 'How do I set a default and/or global page layout?',
      answer: (
        <div>
          Global layouts are defined in the <code>src/reducers/config.js</code>{' '}
          file. Layouts for every route are defined in the{' '}
          <code>src/layouts/index.js</code> file.
        </div>
      )
    },
    {
      question: 'Where can I find the colors available in the template?',
      answer: (
        <div>
          Colors are defined in the <code>tailwind.config.js</code> file in the{' '}
          <code>colors</code> section, starting in line 38. The same colors are
          copied to the <code>src/functions/colors.js</code> which makes them
          available for javascript components such as charts and maps.
        </div>
      )
    },
    {
      question: 'How do I add a css file to the template?',
      answer: (
        <div>
          CSS files are imported into the template by the{' '}
          <code>src/pages/_app.js</code> file. To add a new file just import it
          to this file.
        </div>
      )
    },
    {
      question:
        'How do I set the page background, left sidebar, navbar, logo right sidebar colors?',
      answer: (
        <div>
          Palette colors are defined in the <code>css</code> file of each
          component. For example, for the <code>Navbar</code> component, palette
          colors can be changed in the <code>css/components/navbar.css</code>{' '}
          file.
        </div>
      )
    },
    {
      question:
        'How do I change the colors of other elements and components, such as tables and dropdowns?',
      answer: (
        <div>
          Colors are defined for most elements in the{' '}
          <code>css/components</code> folder and can either be set there
          globally or be modified using the <b>Tailwind CSS</b> background, text
          and border color modifiers. All available modifiers are listed in the{' '}
          <code>https://tailwindcss.com/docs/text-color/#app</code> Tailwind CSS
          website.
        </div>
      )
    },
    {
      question: 'I have a question, but it is not listed here, what can I do?',
      answer: (
        <div>
          Send us an email to support@mobifica.com or contact us through our
          Theme Forest profile and we'll do our best to try to help you
        </div>
      )
    },
    {
      question:
        'I would like to see a new plugin installed or functionality developed in the template, is it possible?',
      answer: (
        <div>
          We are always trying to improve and adding new functionalities and
          plugins to the template, so every request is welcomed and will be
          evaluated
        </div>
      )
    },
    {
      question: 'I found a bug, what can I do?',
      answer: (
        <div>
          Please let us know and we'll do our best to fix it as soon as possible
        </div>
      )
    },
    {
      question: 'Are updates free?',
      answer: (
        <div>
          Yes, they are and always will be for our Themeforest customers
        </div>
      )
    }
  ]
  return (
    <div className="mb-8">
      <SectionTitle
        title="Customization"
        subtitle="Frequently asked questions"
      />
      <ol className="list-disc pl-6 mb-4">
        {questions.map((question, i) => (
          <li className="mb-4" key={i}>
            <div className="mb-2 font-bold text-base">{question.question}</div>
            {question.answer}
          </li>
        ))}
      </ol>
    </div>
  )
}
