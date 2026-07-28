import PlaceholderCard from '../PlaceholderCard'

export default function ActionButtons() {
  return (
    <PlaceholderCard title="Action Buttons">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span className="placeholder-text">Copy SYNOP</span>
        <span className="placeholder-text">Copy METAR</span>
        <span className="placeholder-text">Export JSON</span>
        <span className="placeholder-text">Export CSV</span>
      </div>
    </PlaceholderCard>
  )
}