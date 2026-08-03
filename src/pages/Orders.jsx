import { useState } from 'react'
import { orders, tables } from '../data'
import {
  formatCurrency,
  formatStatus,
  formatTime,
  statusBadgeClass,
  tableLabel,
} from '../lib/format'

const ACTIVE_STATUSES = new Set(['pending', 'preparing', 'ready'])

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
]

function matchesFilter(order, filterId) {
  switch (filterId) {
    case 'active':
      return ACTIVE_STATUSES.has(order.status)
    case 'completed':
      return order.status === 'completed'
    case 'cancelled':
      return order.status === 'cancelled'
    case 'all':
    default:
      return true
  }
}

function filterCount(filterId) {
  return orders.filter((order) => matchesFilter(order, filterId)).length
}

function formatItems(items) {
  return items.map((item) => `${item.name} ×${item.quantity}`).join(', ')
}

function Orders() {
  const [filter, setFilter] = useState('all')

  const filteredOrders = [...orders]
    .filter((order) => matchesFilter(order, filter))
    .sort((a, b) => b.placedAt.localeCompare(a.placedAt))

  return (
    <section>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Orders</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Today&apos;s orders · read-only
        </p>
      </header>

      <div
        className="flex gap-1 border-b border-border"
        role="tablist"
        aria-label="Order filters"
      >
        {FILTERS.map((item) => {
          const isActive = filter === item.id
          const count = filterCount(item.id)

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(item.id)}
              className={[
                'relative -mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-ink text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink',
              ].join(' ')}
            >
              {item.label}
              <span
                className={[
                  'ml-2 tabular-nums',
                  isActive ? 'text-ink' : 'text-ink-muted',
                ].join(' ')}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">No orders in this filter.</p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-[7rem_6.5rem_minmax(0,1fr)_6.5rem_7.5rem_5.5rem] gap-4 border-b border-border pb-2 text-xs font-medium uppercase tracking-wider text-ink-muted">
            <span>Order</span>
            <span>Table</span>
            <span>Items</span>
            <span className="text-right">Total</span>
            <span>Status</span>
            <span className="text-right">Time</span>
          </div>

          <ul className="divide-y divide-border">
            {filteredOrders.map((order) => (
              <li
                key={order.id}
                className="grid grid-cols-[7rem_6.5rem_minmax(0,1fr)_6.5rem_7.5rem_5.5rem] items-start gap-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{order.id}</p>
                </div>

                <div>
                  <p className="text-sm text-ink">
                    {tableLabel(order.tableId, tables)}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {formatItems(order.items)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums text-ink">
                    {formatCurrency(order.total)}
                  </p>
                </div>

                <div>
                  <span
                    className={[
                      'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                      statusBadgeClass(order.status),
                    ].join(' ')}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-sm tabular-nums text-ink-muted">
                    {formatTime(order.placedAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Orders
