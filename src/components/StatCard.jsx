function StatCard({ label, value, detail, accent = 'neutral' }) {
  const accents = {
    green: 'border-l-emerald-500',
    amber: 'border-l-amber-500',
    red: 'border-l-red-500',
    neutral: 'border-l-stone-300',
  }

  return (
    <div
      className={[
        'border border-border border-l-4 bg-white px-5 py-4',
        accents[accent] ?? accents.neutral,
      ].join(' ')}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </p>
      {detail ? (
        <p className="mt-1 text-sm text-ink-muted">{detail}</p>
      ) : null}
    </div>
  )
}

export default StatCard
