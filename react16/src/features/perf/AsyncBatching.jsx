import { useState } from 'react'

export default function AsyncBatching() {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    console.log('render 18 - AsyncBatching', { a, b })

    const click = () => {
        setTimeout(() => {
            setA(v => v + 1)
            setB(v => v + 1)     // 18: 비동기도 자동 배칭 → 보통 렌더 1회
        }, 0)
    }

    return (
        <section>
            <h2>React 16: 비동기 자동 배칭 없음</h2>
            <button onClick={click}>update async</button>
            <p>a:{a} / b:{b}</p>
            <small>콘솔의 "render 16" 횟수를 보세요.</small>
        </section>
    )
}
