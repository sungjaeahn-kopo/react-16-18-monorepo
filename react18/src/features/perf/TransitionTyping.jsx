import { useState, useTransition } from 'react'
import { makeBigList } from '@shared/lib'

export default function TransitionTyping() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])
    const [isPending, startTransition] = useTransition()

    const onType = e => {
        const v = e.target.value
        setText(v)                 // 높은 우선순위(입력 즉시 반영)
        startTransition(() => {    // 낮은 우선순위(무거운 연산 지연)
            setList(makeBigList(v))
        })
    }

    return (
        <section>
            <h2>startTransition: 입력은 즉시, 리스트는 뒤로</h2>
            <input value={text} onChange={onType} placeholder="빠르게 타이핑" />
            {isPending && <p>필터링 중…</p>}
            <ul>{list.slice(0, 20).map(x => <li key={x}>{x}</li>)}</ul>
        </section>
    )
}
