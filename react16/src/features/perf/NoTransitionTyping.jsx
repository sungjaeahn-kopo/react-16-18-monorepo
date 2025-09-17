import React, { useState } from 'react'
import { makeBigList } from '@shared/lib'

export default function NoTransitionTyping() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])

    const onType = (e) => {
        const v = e.target.value
        setText(v)
        // React 16: 입력과 무거운 계산이 같은 우선순위로 함께 렌더
        setList(makeBigList(v))
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
                <h2 className="text-3xl font-bold text-gray-800 mb-2">React 16: transition 미사용</h2>
                <p className="text-gray-600 text-lg">입력과 결과 계산이 동시에 진행되어 버벅임이 생길 수 있어요</p>
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
                    placeholder="많은 Item 중 찾을 텍스트"
                    className="w-full pl-12 pr-10 py-4 text-lg border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 bg-white shadow-sm"
                />
            </div>

            <div className="text-sm text-gray-600 bg-white p-3 rounded mb-4 space-y-1 border border-gray-200">
                <div>입력: <span className="font-mono font-semibold">{text}</span></div>
                <div>결과 개수: <span className="font-mono font-semibold">{list.length.toLocaleString()}</span></div>
                <div>상태: <span className="font-semibold text-blue-600">즉시 계산</span></div>
            </div>

            <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 max-h-96 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                    {list.slice(0, 20000).map((x, index) => (
                        <li key={`${String(x)}-${index}`} className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150">
                            {x}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

