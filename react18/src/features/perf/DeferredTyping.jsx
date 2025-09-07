import { useDeferredValue, useMemo, useState } from 'react'
import { makeBigList } from '@shared/lib'

export default function DeferredTyping() {
    const [text, setText] = useState('')
    const deferred = useDeferredValue(text)
    const isStale = deferred !== text

    const now = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now())
    const [list, latency] = useMemo(() => {
        if (!deferred) return [[], null]
        const t0 = now()
        const result = makeBigList(deferred, { cpuMs: 120 })
        const t1 = now()
        return [result, t1 - t0]
    }, [deferred])

    return (
        <section className="bg-white border rounded-lg p-6 space-y-4 relative">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">React 18: useDeferredValue</h2>
            </div>

            <div className="space-y-3">
                <div className="relative">
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="예: Item 또는 숫자 (deferred)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {isStale && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-orange-100 text-orange-700 border border-orange-200">계산 중…</span>
                    )}
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded space-y-1">
                    <div>입력: <span className="font-mono font-semibold">{text}</span></div>
                    <div>지연된 값: <span className="font-mono font-semibold">{deferred}</span></div>
                    <div>상태: <span className={`font-semibold ${isStale ? 'text-orange-600' : 'text-green-600'}`}>
                        {isStale ? '지연 중' : '적용됨'}
                    </span></div>
                    <div>지연: <span className="font-mono">{latency != null ? `${Math.round(latency)} ms` : '-'}</span></div>
                </div>

                <div className="border rounded-md bg-gray-50 max-h-60 overflow-y-auto relative">
                    <div className="p-3 border-b bg-gray-100">
                        <span className="text-sm font-medium text-gray-700">결과: {list.length.toLocaleString()}개</span>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {list.slice(0, 20000).map((x, i) => (
                            <li key={`${String(x)}-${i}`} className="px-3 py-2 text-sm hover:bg-gray-100">
                                {x}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
