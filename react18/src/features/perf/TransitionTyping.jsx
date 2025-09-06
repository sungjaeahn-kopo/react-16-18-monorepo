import { useState, useTransition } from 'react'
import { makeBigList } from '@shared/lib'

export default function TransitionTyping() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])
    const [isPending, startTransition] = useTransition()

    const onType = (e) => {
        const v = e.target.value
        setText(v)
        startTransition(() => {
            setList(makeBigList(v))
        })
    }

    const FilteringText = () => {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-600 font-medium">필터링 중...</p>
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>
            </div>
        )
    }

    const FilterdList = () => {
        const displayList = list.slice(0, 1000)

        return (
            <div className="mt-3">
                <div className="mb-3 flex items-center justify-between">
                    <span className="ml-3 text-sm font-medium text-gray-700">
                        결과 개수: <span className="text-blue-600 font-bold">{displayList.length.toLocaleString()}</span>
                    </span>
                    {text && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            "{text}" 검색
                        </span>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-h-96 overflow-y-auto">
                    {displayList.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            {displayList.map((x, index) => (
                                <li
                                    key={`${x}-${index}`}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        <span className="text-gray-700 text-sm">
                                            {x}
                                        </span>
                                        <span className="ml-auto text-xs text-gray-400">
                                            #{index + 1}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500">검색어를 입력하면 결과가 표시됩니다</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <section className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border border-purple-200">
            {/* 헤더 */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">React 18: startTransition</h2>
                <p className="text-gray-600 text-lg">입력은 즉시, 무거운 갱신은 백그라운드로</p>
            </div>

            {/* 입력 영역 */}
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        value={text}
                        onChange={onType}
                        placeholder="빠르게 타이핑해보세요..."
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 bg-white shadow-sm"
                    />
                    {isPending && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <div className="w-5 h-5 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {/* 상태 표시 */}
                <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${text ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                            <span className="text-gray-600">입력 상태: {text ? '활성' : '대기'}</span>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${isPending ? 'bg-yellow-400' : list.length > 0 ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                            <span className="text-gray-600">필터링: {isPending ? '처리 중' : (list.length > 0 ? '완료' : '대기')}</span>
                        </div>
                    </div>
                    <div className="text-gray-500">입력 길이: {text.length}자</div>
                </div>
            </div>

            {/* 결과 표시 영역 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[200px]">
                {isPending ? <FilteringText /> : <FilterdList />}
            </div>

            {/* 설명 */}
            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-indigo-800 mb-2">동시성 기능 체험하기</h3>
                        <ul className="text-sm text-indigo-700 space-y-1 list-disc list-inside">
                            <li>입력은 즉시 반영됩니다</li>
                            <li>무거운 필터링은 백그라운드에서 처리됩니다</li>
                            <li>사용자 인터랙션이 최우선으로 처리됩니다</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

