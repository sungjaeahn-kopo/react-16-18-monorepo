import { useState } from 'react'

export default function AsyncBatching() {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    console.log('render 16 - AsyncBatching', { a, b })

    const click = () => {
        setTimeout(() => {
            setA(v => v + 1)
            setB(v => v + 1) // React 16: 비동기는 자동 배칭이 되지 않을 수 있음
        }, 0)
    }

    return (
        <section className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl border border-blue-200">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">React 16: 비동기 자동 배칭 없음</h2>
                <p className="text-gray-600 text-lg">타이머 등 비동기 컨텍스트에서는 렌더가 여러 번 발생할 수 있어요</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">{a}</div>
                        <div className="text-gray-500 font-medium">상태 A</div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">{b}</div>
                        <div className="text-gray-500 font-medium">상태 B</div>
                    </div>
                </div>
            </div>

            <div className="text-center mb-6">
                <button
                    onClick={click}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    비동기 업데이트 실행
                </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800 mb-1">개발자 콘솔에서 확인</h3>
                        <p className="text-sm text-amber-700">
                            <code className="bg-amber-100 px-2 py-1 rounded text-amber-800">render 16</code>
                            {' '}로그로 렌더 횟수를 확인해 보세요.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

