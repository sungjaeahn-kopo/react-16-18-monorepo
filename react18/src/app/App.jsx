import TransitionTyping from '../features/perf/TransitionTyping.jsx'
import AsyncBatching from '../features/perf/AsyncBatching.jsx'
import DeferredTyping from '../features/perf/DeferredTyping.jsx'

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, padding: 16 }}>
      <h1>React 18</h1>
      <TransitionTyping />
      <AsyncBatching />
      <DeferredTyping />
    </div>
  )
}
