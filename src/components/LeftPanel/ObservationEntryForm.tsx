import { useState } from 'react'
import type { Observation } from '../../types'
import { defaultObservation, PRESENT_WEATHER_CODES, CLOUD_TYPE_CODES, PRESSURE_TENDENCY_CODES } from '../../types'
import { useStore } from '../../store'

export default function ObservationEntryForm() {
  const { dispatch } = useStore()
  const [obs, setObs] = useState<Observation>(defaultObservation())

  const set = <K extends keyof Observation>(key: K, value: Observation[K]) => {
    setObs((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'ADD_OBSERVATION', payload: { ...obs, id: crypto.randomUUID() } })
    setObs(defaultObservation())
  }

  const handleReset = () => {
    setObs(defaultObservation())
  }

  return (
    <div className="panel-card">
      <div className="panel-header">
        <span>Observation Entry Form</span>
      </div>
      <div className="panel-body">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Station ID</label>
              <input value={obs.stationId} onChange={(e) => set('stationId', e.target.value)} placeholder="e.g. 12345" />
            </div>
            <div className="form-group">
              <label>ICAO Code</label>
              <input value={obs.icaoCode} onChange={(e) => set('icaoCode', e.target.value.toUpperCase())} placeholder="e.g. KXXX" />
            </div>
            <div className="form-group">
              <label>WMO Index</label>
              <input value={obs.wmoIndex} onChange={(e) => set('wmoIndex', e.target.value)} placeholder="e.g. 12345" />
            </div>
            <div className="form-group">
              <label>Station Name</label>
              <input value={obs.stationName} onChange={(e) => set('stationName', e.target.value)} placeholder="Station name" />
            </div>
            <div className="form-group">
              <label>Date / Time</label>
              <input type="datetime-local" value={obs.timestamp} onChange={(e) => set('timestamp', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Wind Unit</label>
              <select value={obs.windUnit} onChange={(e) => set('windUnit', e.target.value as 'kt' | 'm/s')}>
                <option value="kt">Knots (kt)</option>
                <option value="m/s">Meters/sec (m/s)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Wind Direction (°)</label>
              <input type="number" min={0} max={360} value={obs.windDirection} onChange={(e) => set('windDirection', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Wind Speed</label>
              <input type="number" min={0} value={obs.windSpeed} onChange={(e) => set('windSpeed', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Wind Gust</label>
              <input type="number" min={0} value={obs.windGust ?? ''} onChange={(e) => set('windGust', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-group">
              <label>Visibility (m)</label>
              <input type="number" min={0} value={obs.visibility} onChange={(e) => set('visibility', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Temperature (°C)</label>
              <input type="number" step={0.1} value={obs.temperature} onChange={(e) => set('temperature', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Dew Point (°C)</label>
              <input type="number" step={0.1} value={obs.dewPoint} onChange={(e) => set('dewPoint', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Station Pressure (hPa)</label>
              <input type="number" step={0.1} value={obs.stationPressure} onChange={(e) => set('stationPressure', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Sea Level Pressure (hPa)</label>
              <input type="number" step={0.1} value={obs.seaLevelPressure} onChange={(e) => set('seaLevelPressure', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Total Cloud Cover (oktas)</label>
              <select value={obs.totalCloudCover} onChange={(e) => set('totalCloudCover', Number(e.target.value))}>
                {[0,1,2,3,4,5,6,7,8,9].map((n) => (
                  <option key={n} value={n}>{n} {n === 9 ? '(obscured)' : `/8`}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Low Cloud Height (m)</label>
              <input type="number" min={0} value={obs.lowCloudHeight ?? ''} onChange={(e) => set('lowCloudHeight', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-group">
              <label>Low Cloud Type</label>
              <select value={obs.lowCloudType} onChange={(e) => set('lowCloudType', e.target.value)}>
                {CLOUD_TYPE_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Medium Cloud Type</label>
              <select value={obs.mediumCloudType} onChange={(e) => set('mediumCloudType', e.target.value)}>
                {CLOUD_TYPE_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>High Cloud Type</label>
              <select value={obs.highCloudType} onChange={(e) => set('highCloudType', e.target.value)}>
                {CLOUD_TYPE_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Present Weather</label>
              <select value={obs.presentWeather} onChange={(e) => set('presentWeather', e.target.value)}>
                {PRESENT_WEATHER_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Past Weather</label>
              <select value={obs.pastWeather} onChange={(e) => set('pastWeather', e.target.value)}>
                {PRESENT_WEATHER_CODES.slice(0, 10).map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Pressure Tendency</label>
              <select value={obs.pressureTendency} onChange={(e) => set('pressureTendency', e.target.value)}>
                {PRESSURE_TENDENCY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Pressure Change (hPa / 3h)</label>
              <input type="number" step={0.1} value={obs.pressureChange} onChange={(e) => set('pressureChange', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Precip 3h (mm)</label>
              <input type="number" step={0.1} min={0} value={obs.precipLast3h ?? ''} onChange={(e) => set('precipLast3h', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-group">
              <label>Precip 6h (mm)</label>
              <input type="number" step={0.1} min={0} value={obs.precipLast6h ?? ''} onChange={(e) => set('precipLast6h', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-group">
              <label>Precip 12h (mm)</label>
              <input type="number" step={0.1} min={0} value={obs.precipLast12h ?? ''} onChange={(e) => set('precipLast12h', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-group">
              <label>Precip 24h (mm)</label>
              <input type="number" step={0.1} min={0} value={obs.precipLast24h ?? ''} onChange={(e) => set('precipLast24h', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-group">
              <label>Sunshine Duration (h)</label>
              <input type="number" step={0.1} min={0} value={obs.sunshineDuration ?? ''} onChange={(e) => set('sunshineDuration', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-group">
              <label>Snow Depth (cm)</label>
              <input type="number" step={0.1} min={0} value={obs.snowDepth ?? ''} onChange={(e) => set('snowDepth', e.target.value ? Number(e.target.value) : null)} placeholder="Optional" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Add Observation</button>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
