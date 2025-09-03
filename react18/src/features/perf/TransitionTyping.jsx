import { useState, useTransition } from 'react'
import { makeBigList } from '@shared/lib'

export default function TransitionTyping() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])
    const [isPending, startTransition] = useTransition()

    const onType = (e) => {
        const v = e.target.value
        setText(v)                   // 높은 우선순위: 입력은 즉시
        startTransition(() => {      // 낮은 우선순위: 무거운 갱신 뒤로
            setList(makeBigList(v))
        })
    }

    const FilteringText = () => {
        return (
            <p>필터링 중…</p>
        )
    }

    const FilterdList = () => {
        return (
            <ul>{list.slice(0, 20000).map(x => <li key={x}>{x}</li>)}</ul>
        )
    }

    return (
        <section>
            <h2>React 18: startTransition → 입력은 부드럽게</h2>
            <input value={text} onChange={onType} placeholder="빠르게 타이핑" />
            {isPending ? <FilteringText /> : <FilterdList />}
        </section>
    )
}
