import React, { useState } from 'react'

export default function App() {
  const [n, setN] = useState(0)
  const [flag, setFlag] = useState(false)

  const click = () => {
    setTimeout(() => {
      setN(v => v + 1)       // React 16: 비동기 컨텍스트에서 렌더 2번 가능
      setFlag(f => !f)
    }, 0)
  }

  return (
    <div>
      <h1>React 16</h1>
      <button onClick={click}>update in setTimeout</button>
      <p>n: {n}</p>
      <p>flag: {String(flag)}</p>
    </div>
  )
}
