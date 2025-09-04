import { useState, useDeferredValue } from 'react'
import { makeBigList } from '@shared/lib'

export default function DeferredTyping() {
    const [text, setText] = useState('')
    const deferred = useDeferredValue(text) // text를 늦게 따라옴
    const list = makeBigList(deferred)

    return (
        <section>
            <h2>React 18: useDeferredValue</h2>
            <input value={text} onChange={e => setText(e.target.value)} />
            <ul>{list.slice(0, 20).map(x => <li key={x}>{x}</li>)}</ul>
        </section>
    )
}
