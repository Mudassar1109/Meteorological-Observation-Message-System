import ObservationEntryForm from './LeftPanel/ObservationEntryForm'
import RegisterTable from './LeftPanel/RegisterTable'
import SynopMessage from './RightPanel/SynopMessage'
import MetarMessage from './RightPanel/MetarMessage'
import ActionButtons from './RightPanel/ActionButtons'
import RecentHistory from './RightPanel/RecentHistory'

export default function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Meteorological Hourly Register &amp; Message Generator</h1>
      </header>
      <div className="app-body">
        <div className="left-panel">
          <ObservationEntryForm />
          <RegisterTable />
        </div>
        <div className="right-panel">
          <SynopMessage />
          <MetarMessage />
          <ActionButtons />
          <RecentHistory />
        </div>
      </div>
    </div>
  )
}
