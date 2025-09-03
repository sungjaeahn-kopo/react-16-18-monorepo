import React, { useState } from 'react'
import { makeBigList } from '@shared/lib'

export default function NoTransitionTyping() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])

    const onType = (e) => {
        const v = e.target.value
        setText(v)               // 입력 즉시 상태 변경
        setList(makeBigList(v))  // 큰 연산이 같은 틱에 붙어서 타이핑이 버벅일 수 있음
    }

    return (
        <section>
            <h2>React 16: 전환 없음 → 입력 끊김 체감</h2>
            <input value={text} onChange={onType} placeholder="빠르게 타이핑" />
            <ul>{list.slice(0, 20000).map(x => <li key={x}>{x}</li>)}</ul>
        </section>
    )
}
