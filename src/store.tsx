import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Observation } from './types'
import { defaultObservation } from './types'

export interface HistoryEntry {
  id: string
  timestamp: string
  type: 'SYNOP' | 'METAR'
  content: string
  observationId: string
}

interface State {
  observations: Observation[]
  history: HistoryEntry[]
  selectedObservationId: string | null
}

type Action =
  | { type: 'ADD_OBSERVATION'; payload: Observation }
  | { type: 'DELETE_OBSERVATION'; payload: string }
  | { type: 'SELECT_OBSERVATION'; payload: string | null }
  | { type: 'ADD_HISTORY'; payload: HistoryEntry }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_OBSERVATION':
      return { ...state, observations: [action.payload, ...state.observations] }
    case 'DELETE_OBSERVATION':
      return {
        ...state,
        observations: state.observations.filter((o) => o.id !== action.payload),
      }
    case 'SELECT_OBSERVATION':
      return { ...state, selectedObservationId: action.payload }
    case 'ADD_HISTORY':
      return { ...state, history: [action.payload, ...state.history] }
    default:
      return state
  }
}

const StoreContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

const initialState: State = {
  observations: [],
  history: [],
  selectedObservationId: null,
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export function useObservation(): Observation {
  const { state } = useStore()
  const obs = state.observations.find((o) => o.id === state.selectedObservationId)
  return obs ?? defaultObservation()
}
