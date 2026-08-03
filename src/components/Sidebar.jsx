import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/tables', label: 'Tables', end: false },
  { to: '/orders', label: 'Orders', end: false },
]

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-56 flex-col border-r border-border bg-sidebar">
      <div className="border-b border-border px-5 py-5">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
          Explorex
        </p>
        <h1 className="mt-1 text-lg font-semibold tracking-tight text-ink">
          Spice Garden
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Main">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-ink text-white'
                  : 'text-ink-muted hover:bg-border/60 hover:text-ink',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <p className="text-xs text-ink-muted">Restaurant Command Center</p>
      </div>
    </aside>
  )
}

export default Sidebar
