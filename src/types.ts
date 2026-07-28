export interface Observation {
  id: string
  timestamp: string
  stationId: string
  stationName: string
  icaoCode: string
  wmoIndex: string

  windDirection: number
  windSpeed: number
  windGust: number | null
  windUnit: 'kt' | 'm/s'

  visibility: number

  presentWeather: string
  pastWeather: string

  totalCloudCover: number
  lowCloudHeight: number | null
  lowCloudType: string
  mediumCloudType: string
  highCloudType: string

  temperature: number
  dewPoint: number

  stationPressure: number
  seaLevelPressure: number
  pressureTendency: string
  pressureChange: number

  precipLast3h: number | null
  precipLast6h: number | null
  precipLast12h: number | null
  precipLast24h: number | null

  sunshineDuration: number | null
  snowDepth: number | null
}

export type WeatherCode = {
  code: string
  label: string
}

export const PRESENT_WEATHER_CODES: WeatherCode[] = [
  { code: '00', label: 'Cloud development not observed' },
  { code: '01', label: 'Cloud dissolving' },
  { code: '02', label: 'State of sky unchanged' },
  { code: '03', label: 'Clouds forming' },
  { code: '04', label: 'Visibility reduced by smoke' },
  { code: '05', label: 'Haze' },
  { code: '06', label: 'Widespread dust' },
  { code: '07', label: 'Dust or sand whirls' },
  { code: '08', label: 'Dust devils' },
  { code: '09', label: 'Duststorm within sight' },
  { code: '10', label: 'Mist' },
  { code: '11', label: 'Patches of fog' },
  { code: '12', label: 'Shallow fog' },
  { code: '13', label: 'Lightning visible' },
  { code: '14', label: 'Precipitation within sight' },
  { code: '15', label: 'Precipitation distant' },
  { code: '16', label: 'Precipitation nearby' },
  { code: '17', label: 'Thunderstorm within sight' },
  { code: '18', label: 'Squalls within sight' },
  { code: '19', label: 'Funnel clouds' },
  { code: '20', label: 'Drizzle (not freezing)' },
  { code: '21', label: 'Rain (not freezing)' },
  { code: '22', label: 'Snow' },
  { code: '23', label: 'Rain and snow' },
  { code: '24', label: 'Freezing drizzle' },
  { code: '25', label: 'Freezing rain' },
  { code: '26', label: 'Snow showers' },
  { code: '27', label: 'Hail showers' },
  { code: '28', label: 'Fog' },
  { code: '29', label: 'Thunderstorm' },
  { code: '30', label: 'Slight/moderate duststorm' },
  { code: '31', label: 'Slight/moderate sandstorm' },
  { code: '32', label: 'Severe duststorm' },
  { code: '33', label: 'Severe sandstorm' },
  { code: '34', label: 'Drifting snow (low)' },
  { code: '35', label: 'Blowing snow (low)' },
  { code: '36', label: 'Drifting snow (high)' },
  { code: '37', label: 'Blowing snow (high)' },
  { code: '38', label: 'Diamond dust' },
  { code: '39', label: 'Drifting snow' },
  { code: '40', label: 'Fog at a distance' },
  { code: '41', label: 'Fog in patches' },
  { code: '42', label: 'Fog thinning' },
  { code: '43', label: 'Fog opaque' },
  { code: '44', label: 'Fog depositing rime' },
  { code: '45', label: 'Fog moderate' },
  { code: '46', label: 'Fog continuous' },
  { code: '47', label: 'Freezing fog' },
  { code: '48', label: 'Fog with ice crystals' },
  { code: '49', label: 'Thick fog' },
  { code: '50', label: 'Drizzle slight' },
  { code: '51', label: 'Drizzle moderate' },
  { code: '52', label: 'Drizzle heavy' },
  { code: '53', label: 'Drizzle freezing slight' },
  { code: '54', label: 'Drizzle freezing moderate' },
  { code: '55', label: 'Drizzle freezing heavy' },
  { code: '56', label: 'Rain slight' },
  { code: '57', label: 'Rain moderate' },
  { code: '58', label: 'Rain heavy' },
  { code: '59', label: 'Rain freezing' },
  { code: '60', label: 'Rain showers slight' },
  { code: '61', label: 'Rain showers moderate' },
  { code: '62', label: 'Rain showers heavy' },
  { code: '63', label: 'Drizzle and rain' },
  { code: '64', label: 'Freezing rain slight' },
  { code: '65', label: 'Freezing rain heavy' },
  { code: '66', label: 'Snow slight' },
  { code: '67', label: 'Snow moderate' },
  { code: '68', label: 'Snow heavy' },
  { code: '69', label: 'Snow showers slight' },
  { code: '70', label: 'Snow showers moderate' },
  { code: '71', label: 'Snow showers heavy' },
  { code: '72', label: 'Snow grains' },
  { code: '73', label: 'Ice pellets' },
  { code: '74', label: 'Hail' },
  { code: '75', label: 'Snow pellets' },
  { code: '76', label: 'Ice crystals' },
  { code: '77', label: 'Hail showers' },
  { code: '78', label: 'Diamond dust' },
  { code: '79', label: 'Thunderstorm with rain' },
  { code: '80', label: 'Thunderstorm with hail' },
  { code: '81', label: 'Thunderstorm with dust' },
  { code: '82', label: 'Severe thunderstorm' },
  { code: '83', label: 'Squalls' },
  { code: '84', label: 'Tornado' },
  { code: '85', label: 'Waterspout' },
  { code: '86', label: 'Duststorm' },
  { code: '87', label: 'Sandstorm' },
  { code: '88', label: 'Blowing spray' },
  { code: '89', label: 'Haze' },
  { code: '90', label: 'Smoke' },
  { code: '91', label: 'Volcanic ash' },
  { code: '92', label: 'Radioactive' },
  { code: '93', label: 'Chemical' },
  { code: '94', label: 'Biological' },
  { code: '95', label: 'Thunderstorm slight' },
  { code: '96', label: 'Thunderstorm moderate' },
  { code: '97', label: 'Thunderstorm heavy' },
  { code: '98', label: 'Thunderstorm violent' },
  { code: '99', label: 'Tornado' },
]

export const CLOUD_TYPE_CODES: WeatherCode[] = [
  { code: '0', label: 'Cirrus' },
  { code: '1', label: 'Cirrocumulus' },
  { code: '2', label: 'Cirrostratus' },
  { code: '3', label: 'Altocumulus' },
  { code: '4', label: 'Altostratus' },
  { code: '5', label: 'Nimbostratus' },
  { code: '6', label: 'Stratocumulus' },
  { code: '7', label: 'Stratus' },
  { code: '8', label: 'Cumulus' },
  { code: '9', label: 'Cumulonimbus' },
  { code: '/', label: 'Cloud invisible' },
]

export const PRESSURE_TENDENCY_CODES = [
  { code: '0', label: 'Increasing, then decreasing' },
  { code: '1', label: 'Increasing, then steady' },
  { code: '2', label: 'Increasing steadily' },
  { code: '3', label: 'Decreasing or steady, then increasing' },
  { code: '4', label: 'Steady' },
  { code: '5', label: 'Decreasing, then increasing' },
  { code: '6', label: 'Decreasing, then steady' },
  { code: '7', label: 'Decreasing steadily' },
  { code: '8', label: 'Steady or increasing, then decreasing' },
]

export function defaultObservation(): Observation {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`
  return {
    id: crypto.randomUUID(),
    timestamp,
    stationId: '12345',
    stationName: 'Main Station',
    icaoCode: 'KXXX',
    wmoIndex: '12345',
    windDirection: 0,
    windSpeed: 0,
    windGust: null,
    windUnit: 'kt',
    visibility: 10000,
    presentWeather: '00',
    pastWeather: '00',
    totalCloudCover: 0,
    lowCloudHeight: null,
    lowCloudType: '/',
    mediumCloudType: '/',
    highCloudType: '/',
    temperature: 20,
    dewPoint: 10,
    stationPressure: 1013,
    seaLevelPressure: 1013,
    pressureTendency: '4',
    pressureChange: 0,
    precipLast3h: null,
    precipLast6h: null,
    precipLast12h: null,
    precipLast24h: null,
    sunshineDuration: null,
    snowDepth: null,
  }
}
