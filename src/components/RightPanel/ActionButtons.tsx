import { useState, useCallback } from 'react'
import { useStore, useObservation } from '../../store'
import { generateSynopText } from './SynopMessage'
import { generateMetarText } from './MetarMessage'
import type { HistoryEntry } from '../../store'

export default function ActionButtons() {
  const { dispatch } = useStore()
  const obs = useObservation()
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }, [])

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast(`${label} copied to clipboard`)
    } catch {
      showToast('Failed to copy')
    }
  }, [showToast])

  const addHistory = useCallback((type: 'SYNOP' | 'METAR', content: string) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
      content,
      observationId: obs.id,
    }
    dispatch({ type: 'ADD_HISTORY', payload: entry })
  }, [dispatch, obs.id])

  const handleCopySynop = useCallback(async () => {
    const text = generateSynopText(obs)
    await copyToClipboard(text, 'SYNOP')
    addHistory('SYNOP', text)
  }, [obs, copyToClipboard, addHistory])

  const handleCopyMetar = useCallback(async () => {
    const text = generateMetarText(obs)
    await copyToClipboard(text, 'METAR')
    addHistory('METAR', text)
  }, [obs, copyToClipboard, addHistory])

  const handleExportJson = useCallback(() => {
    const json = JSON.stringify(obs, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `observation-${obs.id.slice(0, 8)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('JSON exported')
  }, [obs, showToast])

  const handleExportCsv = useCallback(() => {
    const headers = [
      'id', 'timestamp', 'stationId', 'stationName', 'icaoCode', 'wmoIndex',
      'temperature', 'dewPoint', 'windDirection', 'windSpeed', 'windGust',
      'visibility', 'totalCloudCover', 'stationPressure', 'seaLevelPressure',
      'presentWeather', 'pastWeather',
    ]
    const vals = headers.map((h) => {
      const v = (obs as unknown as Record<string, unknown>)[h]
      return v === null || v === undefined ? '' : String(v)
    })
    const csv = [headers.join(','), vals.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `observation-${obs.id.slice(0, 8)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast('CSV exported')
  }, [obs, showToast])

  return (
    <div className="panel-card">
      <div className="panel-header">
        <span>Quick Actions</span>
      </div>
      <div className="panel-body">
        <div className="action-grid">
          <button className="btn btn-primary btn-sm" onClick={handleCopySynop}>
            Copy SYNOP
          </button>
          <button className="btn btn-success btn-sm" onClick={handleCopyMetar}>
            Copy METAR
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleExportJson}>
            Export JSON
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleExportCsv}>
            Export CSV
          </button>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
