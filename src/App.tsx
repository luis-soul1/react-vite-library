import { useState } from 'react'

import PdvButton from './components/PdvButton'
// import PdvButton from './components/PdvButton/PdvButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full7xl flex h-screen flex-col items-center justify-center bg-slate-900 p-8 text-center">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          Logo
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="p-4">
        <PdvButton color="green-700" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </PdvButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-400">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default App
