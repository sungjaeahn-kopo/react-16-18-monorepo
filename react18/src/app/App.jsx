import TransitionTyping from '../features/perf/TransitionTyping.jsx'
import AsyncBatching from '../features/perf/AsyncBatching.jsx'
import DeferredTyping from '../features/perf/DeferredTyping.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">React 18 기능 데모</h1>
          <p className="text-gray-600">Concurrent Features와 자동 배칭을 체험해보세요</p>
        </div>
        <TransitionTyping />
        <AsyncBatching />
        <DeferredTyping />

        <footer className="text-center text-gray-500 text-sm border-t pt-6">
          각 기능을 테스트해보고 개발자 콘솔에서 로그도 확인해보세요!
        </footer>
      </div>
    </div>
  )
}
