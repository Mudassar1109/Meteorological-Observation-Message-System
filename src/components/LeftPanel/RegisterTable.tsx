import { useStore } from '../../store'

export default function RegisterTable() {
  const { state, dispatch } = useStore()

  if (state.observations.length === 0) {
    return (
      <div className="panel-card" style={{ flex: 1 }}>
        <div className="panel-header">
          <span>Hourly Register</span>
        </div>
        <div className="empty-state">No observations recorded yet. Use the form above.</div>
      </div>
    )
  }

  return (
    <div className="panel-card" style={{ flex: 1 }}>
      <div className="panel-header">
        <span>Hourly Register</span>
        <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{state.observations.length} entries</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Station</th>
              <th>Temp</th>
              <th>Dew Pt</th>
              <th>Wind</th>
              <th>Gust</th>
              <th>Vis</th>
              <th>Cloud</th>
              <th>QNH</th>
              <th>Wx</th>
            </tr>
          </thead>
          <tbody>
            {state.observations.map((obs) => {
              const selected = state.selectedObservationId === obs.id
              const dt = new Date(obs.timestamp)
              const time = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`
              return (
                <tr
                  key={obs.id}
                  className={selected ? 'selected clickable' : 'clickable'}
                  onClick={() => dispatch({ type: 'SELECT_OBSERVATION', payload: obs.id })}
                >
                  <td>{time}</td>
                  <td>{obs.stationId}</td>
                  <td>{obs.temperature.toFixed(1)}</td>
                  <td>{obs.dewPoint.toFixed(1)}</td>
                  <td>{obs.windDirection}°/{obs.windSpeed}</td>
                  <td>{obs.windGust ?? '—'}</td>
                  <td>{obs.visibility >= 1000 ? `${(obs.visibility / 1000).toFixed(1)}km` : `${obs.visibility}m`}</td>
                  <td>{obs.totalCloudCover}/8</td>
                  <td>{obs.seaLevelPressure.toFixed(0)}</td>
                  <td>{obs.presentWeather}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
