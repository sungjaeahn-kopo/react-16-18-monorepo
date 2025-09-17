import React from 'react'
import AsyncBatching from '../features/perf/AsyncBatching'
import NoTransitionTyping from '../features/perf/NoTransitionTyping'
import '../App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">React 16 데모</h1>
          <p className="text-gray-600">React 18과 비교를 위한 동일한 UI</p>
        </div>

        <NoTransitionTyping />
        <AsyncBatching />

        <footer className="text-center text-gray-500 text-sm border-t pt-6">
          동일한 디자인으로 동작 차이를 비교해 보세요.
        </footer>
      </div>
    </div>
  )
}

