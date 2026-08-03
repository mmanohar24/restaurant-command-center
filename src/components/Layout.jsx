import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="min-h-full bg-surface text-ink">
      <Sidebar />
      <main className="ml-56 min-h-full">
        <div className="px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
