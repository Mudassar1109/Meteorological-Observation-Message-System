import { useObservation } from '../../store'
import type { Observation } from '../../types'

function pad(n: number | string, len: number): string {
  return String(n).padStart(len, '0')
}

function encodeVisibility(v: number): string {
  if (v >= 50000) return '99'
  if (v >= 30000) return '98'
  if (v >= 20000) return '97'
  if (v >= 15000) return '96'
  if (v >= 10000) return '95'
  if (v >= 8000) return '94'
  if (v >= 5000) return '93'
  if (v >= 3000) return '92'
  if (v >= 2000) return '91'
  if (v >= 1000) return '90'
  if (v >= 800) return '89'
  if (v >= 600) return '88'
  if (v >= 400) return '87'
  if (v >= 200) return '86'
  if (v >= 100) return '85'
  if (v >= 50) return '84'
  return '83'
}

function encodeCloudHeight(h: number | null): string {
  if (h === null) return '/'
  if (h < 50) return '0'
  if (h < 100) return '1'
  if (h < 200) return '2'
  if (h < 300) return '3'
  if (h < 600) return '4'
  if (h < 1000) return '5'
  if (h < 1500) return '6'
  if (h < 2000) return '7'
  if (h < 2500) return '8'
  return '9'
}

function encodeTemp(t: number): string {
  const sn = t < 0 ? 1 : 0
  const abs = Math.round(Math.abs(t) * 10)
  return `${sn}${pad(abs, 3)}`
}

function encodePressure(p: number): string {
  return pad(Math.round(p * 10), 5)
}

function encodePressureChange(change: number): string {
  return pad(Math.abs(Math.round(change * 10)), 3)
}

export function generateSynopText(obs: Observation): string {
  const dt = new Date(obs.timestamp)
  const day = pad(dt.getDate(), 2)
  const hour = pad(dt.getHours(), 2)
  const minute = pad(dt.getMinutes(), 2)

  const wmo = obs.wmoIndex.padStart(5, '0').slice(0, 5)
  const block = wmo.slice(0, 2)
  const stationNum = wmo.slice(2, 5)
  const dd = Math.round(obs.windDirection / 10) * 10
  const ddStr = pad(dd === 0 && obs.windSpeed === 0 ? 0 : dd, 3)
  const ff = Math.round(obs.windSpeed)
  const windGroup = `${ddStr}${pad(ff, 2)}`
  const ii = pad(obs.lowCloudHeight !== null ? 1 : 0, 2)
  const hh = encodeCloudHeight(obs.lowCloudHeight)
  const vv = encodeVisibility(obs.visibility)
  const n = obs.totalCloudCover >= 9 ? 9 : obs.totalCloudCover
  const sec1Temp = encodeTemp(obs.temperature)
  const sec1Dew = encodeTemp(obs.dewPoint)
  const sec1StaPres = encodePressure(obs.stationPressure)
  const sec1SlPres = encodePressure(obs.seaLevelPressure)
  const sec1PTend = `${obs.pressureTendency}${encodePressureChange(obs.pressureChange)}`
  const precip3h = obs.precipLast3h !== null
    ? pad(Math.round(obs.precipLast3h * 10), 4)
    : '////'
  const weather = `${obs.presentWeather}${obs.pastWeather}`
  const cloudGroups = `${n}${obs.lowCloudType}${obs.mediumCloudType}${obs.highCloudType}`

  const groups: string[] = [
    `${wmo} ${day}${hour}1`,
    `${block}${stationNum}`,
    `${ii}${hh}${vv}`,
    `${n}${windGroup}`,
    `1${sec1Temp}`,
    `2${sec1Dew}`,
    `3${sec1StaPres}`,
    `4${sec1SlPres}`,
    `5${sec1PTend}`,
    `6${precip3h}`,
    `7${weather}`,
    `8${cloudGroups}`,
    `9${hour}${minute}`,
  ]

  let msg = groups.join(' ')

  const suffix: string[] = []
  if (obs.sunshineDuration !== null) {
    suffix.push(`${pad(Math.round(obs.sunshineDuration * 10), 3)}`)
  }
  if (obs.snowDepth !== null) {
    suffix.push(`${pad(Math.round(obs.snowDepth), 3)}`)
  }
  if (obs.precipLast24h !== null) {
    suffix.push(`1${pad(Math.round(obs.precipLast24h * 10), 4)}`)
  }
  if (obs.precipLast12h !== null) {
    suffix.push(`2${pad(Math.round(obs.precipLast12h * 10), 4)}`)
  }
  if (suffix.length > 0) {
    msg += ` 333 ${suffix.join(' ')}`
  }

  return `AAXX ${msg}`
}

export default function SynopMessage() {
  const obs = useObservation()
  const synop = generateSynopText(obs)

  return (
    <div className="panel-card">
      <div className="panel-header">
        <span>SYNOP Message</span>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>
          FM 12-IX
        </span>
      </div>
      <div className="panel-body">
        <div className={synop ? 'msg-box' : 'msg-box msg-box-empty'}>
          {synop || 'Select an observation to generate a SYNOP message.'}
        </div>
      </div>
    </div>
  )
}
