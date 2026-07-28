import { useStore } from '../../store'

export default function RecentHistory() {
  const { state } = useStore()

  return (
    <div className="panel-card" style={{ flex: 1 }}>
      <div className="panel-header">
        <span>Recent Message History</span>
        <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{state.history.length} items</span>
      </div>
      <div className="panel-body">
        {state.history.length === 0 ? (
          <div className="empty-state">No messages generated yet.</div>
        ) : (
          <div className="history-list">
            {state.history.map((entry) => {
              const dt = new Date(entry.timestamp)
              const time = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              return (
                <div
                  key={entry.id}
                  className="history-item"
                  onClick={() => navigator.clipboard.writeText(entry.content)}
                  title="Click to copy"
                >
                  <div className="history-item-header">
                    <span className={`history-badge ${entry.type.toLowerCase()}`}>
                      {entry.type}
                    </span>
                    <span className="history-item-time">{time}</span>
                  </div>
                  <div className="history-item-msg">{entry.content.slice(0, 80)}{entry.content.length > 80 ? '…' : ''}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
