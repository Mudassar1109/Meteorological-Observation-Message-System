import { StoreProvider } from './store'
import Layout from './components/Layout'
import './App.css'

export default function App() {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  )
}
