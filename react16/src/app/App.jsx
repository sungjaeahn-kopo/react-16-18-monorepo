import React from 'react'
import AsyncBatching from '../features/perf/AsyncBatching'
import NoTransitionTyping from '../features/perf/NoTransitionTyping'
import '../App.css'

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, padding: 16 }}>
      <h1>React 16 데모</h1>
      <NoTransitionTyping />
      <AsyncBatching />
    </div>
  )
}
