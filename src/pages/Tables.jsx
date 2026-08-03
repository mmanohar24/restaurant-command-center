import { useState } from 'react'
import { floorSummary, orders, restaurant, tables } from '../data'
import TableCard from '../components/TableCard'
import TableDetailPanel from '../components/TableDetailPanel'

/** Prefer the latest non-cancelled order for a table. */
function findOrderForTable(tableId) {
  const matches = orders.filter(
    (order) => order.tableId === tableId && order.status !== 'cancelled',
  )
  if (matches.length === 0) return null
  return matches.sort((a, b) => b.placedAt.localeCompare(a.placedAt))[0]
}

function buildOrderByTableId() {
  const map = {}
  for (const table of tables) {
    map[table.id] = findOrderForTable(table.id)
  }
  return map
}

const orderByTableId = buildOrderByTableId()

function Tables() {
  const [selectedTableId, setSelectedTableId] = useState(null)

  const selectedTable = tables.find((table) => table.id === selectedTableId) ?? null
  const selectedOrder = selectedTable ? orderByTableId[selectedTable.id] : null

  function handleSelect(tableId) {
    setSelectedTableId((current) => (current === tableId ? null : tableId))
  }

  return (
    <section>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Tables</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {floorSummary.occupied} occupied · {floorSummary.waitingForBill} waiting
          for bill · {floorSummary.available} available · {restaurant.total_tables}{' '}
          total
        </p>
      </header>

      <div className="flex items-start gap-6">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center gap-4 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 bg-emerald-500" aria-hidden />
              Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 bg-amber-500" aria-hidden />
              Occupied
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 bg-red-500" aria-hidden />
              Waiting for bill
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {tables.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                orderTotal={orderByTableId[table.id]?.total}
                selected={selectedTableId === table.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {selectedTable ? (
          <TableDetailPanel
            table={selectedTable}
            order={selectedOrder}
            onClose={() => setSelectedTableId(null)}
          />
        ) : null}
      </div>
    </section>
  )
}

export default Tables
