import React  from 'react'
import Head from 'next/head'
import {AuthProvider} from '../contexts/AuthContext'
import {Provider} from 'react-redux'
import Layout from '../layouts'
import {useStore} from '../store'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../css/tailwind.css'
import '../css/main.css'
import '../css/layouts/layout-1.css'
import '../css/animate.css'
import '../css/components/buttons.css'
import '../css/components/datepicker.css'
import '../css/components/dropdowns.css'
import '../css/components/forms.css'
import '../css/components/left-sidebar-1/styles-lg.css'
import '../css/components/left-sidebar-1/styles-sm.css'
import '../css/components/modals.css'
import '../css/components/navbar.css'
import '../css/components/nprogress.css'
import '../css/components/recharts.css'
import '../css/components/right-sidebar.css'
import '../css/components/sliders.css'
import '../css/components/steps.css'
import '../css/components/tables.css'
import '../css/components/tabs.css'
import '../css/components/user-widgets/widget-2.css'
import '../css/components/user-widgets/widget-4.css'

import '@fullcalendar/common/main.css'
import '@fullcalendar/timeline/main.css'
import '@fullcalendar/resource-timeline/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({Component, pageProps}) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <AuthProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthProvider>
  )
}
