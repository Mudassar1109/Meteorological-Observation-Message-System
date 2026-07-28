import { useObservation } from '../../store'
import type { Observation } from '../../types'

function pad(n: number | string, len: number): string {
  return String(n).padStart(len, '0')
}

function encodeWindDir(d: number): string {
  if (d === 0) return 'VRB'
  return pad(Math.round(d / 5) * 5, 3)
}

function encodeWindSpeed(speed: number, gust: number | null, unit: 'kt' | 'm/s'): string {
  const unitStr = unit === 'kt' ? 'KT' : 'MPS'
  const ff = Math.round(speed)
  if (gust !== null) {
    const fg = Math.round(gust)
    return `${pad(ff, 2)}G${pad(fg, 2)}${unitStr}`
  }
  if (ff >= 100) return `P${ff}${unitStr}`
  return `${pad(ff, 2)}${unitStr}`
}

function encodeMetarVisibility(v: number): string {
  if (v >= 10000) return '9999'
  if (v >= 5000) return `${Math.round(v / 1000)}000`
  if (v >= 1000) return `${Math.round(v / 100) * 100}`
  if (v >= 500) return `0${Math.round(v / 100) * 100}`
  return `0${String(Math.round(v / 50) * 50).padStart(3, '0')}`
}

function encodeCloud(cover: number): string {
  if (cover <= 0) return 'NSC'
  if (cover <= 1) return 'FEW'
  if (cover <= 3) return 'SCT'
  if (cover <= 5) return 'BKN'
  if (cover <= 7) return 'OVC'
  return 'OVC'
}

function weatherCodeToMetar(code: string): string {
  const map: Record<string, string> = {
    '00': 'NSW', '10': 'BR', '20': 'DZ', '21': 'RA', '22': 'SN',
    '23': 'RASN', '24': 'FZDZ', '25': 'FZRA', '26': 'SHSN', '27': 'GR',
    '28': 'FG', '29': 'TS', '30': 'DU', '31': 'SA', '40': 'FG',
    '41': 'BCFG', '42': 'PRFG', '43': 'FG', '44': 'MIFG',
    '45': 'FG', '46': 'VCFG', '47': 'FZFG', '48': 'FZFG',
    '50': '-DZ', '51': 'DZ', '52': '+DZ', '53': '-FZDZ',
    '54': 'FZDZ', '55': '+FZDZ', '56': '-RA', '57': 'RA',
    '58': '+RA', '59': 'FZRA', '60': '-SHRA', '61': 'SHRA',
    '62': '+SHRA', '63': 'DZRA', '64': '-FZRA', '65': '+FZRA',
    '66': '-SN', '67': 'SN', '68': '+SN', '69': '-SHSN',
    '70': 'SHSN', '71': '+SHSN', '72': 'SG', '73': 'PL',
    '74': 'GR', '75': 'GS', '76': 'IC', '77': 'GR',
    '79': 'TSRA', '80': 'TSRA', '81': 'TSGR', '82': '+TSRA',
    '85': 'SQ', '86': 'FC', '95': '-TS', '96': 'TS',
    '97': '+TS', '98': '+TSRA', '99': 'FC',
  }
  return map[code] ?? 'NSW'
}

export function generateMetarText(obs: Observation): string {
  const dt = new Date(obs.timestamp)
  const day = pad(dt.getDate(), 2)
  const hour = pad(dt.getHours(), 2)
  const minute = pad(dt.getMinutes(), 2)
  const icao = obs.icaoCode.toUpperCase().padEnd(4, 'X').slice(0, 4)
  const windDir = encodeWindDir(obs.windDirection)
  const windSpeed = encodeWindSpeed(obs.windSpeed, obs.windGust, obs.windUnit)
  const vis = encodeMetarVisibility(obs.visibility)
  const wx = obs.presentWeather && obs.presentWeather !== '00'
    ? weatherCodeToMetar(obs.presentWeather)
    : 'NSW'
  const cloudGroup = obs.totalCloudCover <= 0
    ? 'NSC'
    : `${encodeCloud(obs.totalCloudCover)}${pad(obs.lowCloudHeight ?? 3000, 3)}`
  const temp = `${obs.temperature < 0 ? 'M' : ''}${pad(Math.abs(Math.round(obs.temperature)), 2)}`
  const dew = `${obs.dewPoint < 0 ? 'M' : ''}${pad(Math.abs(Math.round(obs.dewPoint)), 2)}`
  const qnh = Math.round(obs.seaLevelPressure).toString().padStart(4, '0').slice(0, 4)
  const rmk: string[] = []
  if (obs.windGust !== null) {
    rmk.push('PK WND')
    rmk.push(`${String(Math.round(obs.windDirection / 5) * 5).padStart(3, '0')}/${Math.round(obs.windGust)}`)
  }
  const rmkStr = rmk.length > 0 ? ` RMK ${rmk.join(' ')}` : ''

  return `METAR ${icao} ${day}${hour}${minute}Z AUTO ${windDir}${windSpeed} ${vis} ${wx} ${cloudGroup} ${temp}/${dew} Q${qnh}${rmkStr}=`
}

export default function MetarMessage() {
  const obs = useObservation()
  const metar = generateMetarText(obs)

  return (
    <div className="panel-card">
      <div className="panel-header">
        <span>METAR Message</span>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>
          FM 15-X
        </span>
      </div>
      <div className="panel-body">
        <div className={metar ? 'msg-box' : 'msg-box msg-box-empty'}>
          {metar || 'Select an observation to generate a METAR message.'}
        </div>
      </div>
    </div>
  )
}
