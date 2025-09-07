import { useMemo, useRef, useState, useTransition } from 'react'
import { makeBigList } from '@shared/lib'

export default function TransitionTyping() {
    const [text, setText] = useState('')
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition()
    const debounceRef = useRef(null)
    const now = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now())

    // Heavy compute happens during the transition render (low priority)
    const [list, latency] = useMemo(() => {
        if (!query) return [[], null]
        const t0 = now()
        const result = makeBigList(query, { cpuMs: 120 })
        const t1 = now()
        return [result, t1 - t0]
    }, [query])

    const onType = (e) => {
        const v = e.target.value
        setText(v) // urgent update for input echo
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            startTransition(() => setQuery(v)) // non-urgent heavy work trigger
        }, 100)
    }

    return (
        <section className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border border-purple-200 relative">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">React 18: startTransition</h2>
                <p className="text-gray-600 text-lg">입력은 즉시 반영, 결과 갱신은 낮은 우선순위</p>
            </div>

            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                    </svg>
                </div>
                <input
                    value={text}
                    onChange={onType}
                    placeholder="예: Item 또는 숫자 (transition)"
                    className="w-full pl-12 pr-10 py-4 text-lg border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 bg-white shadow-sm"
                />
                {isPending && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 border border-indigo-200">
                        처리 중…
                    </span>
                )}
            </div>

            <div className="text-sm text-gray-600 bg-white p-3 rounded mb-4 space-y-1 border border-gray-200">
                <div>입력: <span className="font-mono font-semibold">{text}</span></div>
                <div>쿼리: <span className="font-mono font-semibold">{query}</span></div>
                <div>상태: <span className={`font-semibold ${isPending ? 'text-yellow-600' : 'text-green-600'}`}>
                    {isPending ? '처리 중' : '완료'}
                </span></div>
                <div>지연: <span className="font-mono">{latency != null ? `${Math.round(latency)} ms` : '-'}</span></div>
            </div>

            <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 max-h-96 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                    {list.slice(0, 20000).map((x, index) => (
                        <li key={`${x}-${index}`} className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150">
                            {x}
                        </li>
                    ))}
                </ul>
                {isPending && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="flex items-center gap-2 text-indigo-700">
                            <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
                            <span className="text-sm font-medium">필터링 중… (이전 결과 유지)</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

