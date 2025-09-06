import { useState, useMemo, useDeferredValue } from 'react'
import { makeBigList } from '@shared/lib'

export default function DeferredTyping() {
    const [text, setText] = useState('')

    // 입력의 지연 버전
    const deferred = useDeferredValue(text)
    const isStale = deferred !== text

    // 리스트 계산 (지연된 값에만 반응)
    const list = useMemo(() => {
        return makeBigList(deferred ?? '')
    }, [deferred])

    return (
        <section className="bg-white border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">React 18: useDeferredValue</h2>
            </div>

            <div className="space-y-3">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="검색어 입력 (useDeferredValue)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />

                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <div>현재 입력: <span className="font-mono font-semibold">"{text}"</span></div>
                    <div>검색 중인 값: <span className="font-mono font-semibold">"{deferred}"</span></div>
                    <div>상태: <span className={`font-semibold ${isStale ? 'text-orange-600' : 'text-green-600'}`}>
                        {isStale ? '지연 중...' : '동기화됨'}
                    </span></div>
                </div>

                {isStale ? (
                    <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-3 rounded">
                        <div className="animate-spin w-4 h-4 border-2 border-orange-500 rounded-full border-t-transparent"></div>
                        <p className="font-medium">계산 중...</p>
                    </div>
                ) : (
                    <div className="border rounded-md bg-gray-50 max-h-60 overflow-y-auto">
                        <div className="p-3 border-b bg-gray-100">
                            <span className="text-sm font-medium text-gray-700">결과: {list.length}개 항목</span>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {list.slice(0, 1000).map((x, i) => (
                                <li key={`${String(x)}-${i}`} className="px-3 py-2 text-sm hover:bg-gray-100">
                                    {typeof x === 'string' ? x : String(x)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    )
}
