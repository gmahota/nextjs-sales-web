import React  from 'react'
import {useRouter} from 'next/router'
import Centered from './centered'
import Empty from './empty'
import Layout1 from './layout-1'


const Layouts = ({children}) => {
  const router = useRouter()
  let {pathname} = {...router}
  if (['/404', '/500'].includes(pathname)) {
    return <Centered>{children}</Centered>
  }
  if (
    [
      '/login-1',
      '/contact-us-1',
      '/create-account',
      '/email-confirmation',
      '/logout',
      '/reset-password',
      '/forgot-password',
      '/lock-screen',
      '/subscribe',
      '/error-page',
      '/coming-soon'
    ].includes(pathname)
  ) {
    return <Centered>{children}</Centered>
  } else if (
    ['/landing', '/login-1', '/login-2', '/login-3'].includes(pathname)
  ) {
    return <Empty>{children}</Empty>
  } else {
    return <Layout1>{children}</Layout1>
  }
}

export default Layouts
