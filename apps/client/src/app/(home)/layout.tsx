import Header from "./components/header"
import { Fragment, ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <nav className="header">
        <Header />
      </nav>
      <main>
        {children}
      </main>
    </Fragment>
  )
}
