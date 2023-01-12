import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Helloworld } from 'react-library-vite'
import './App.css'
import '../../../node_modules/react-library-vite/dist/index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Helloworld text="Yo Bitches!!!" color="accent" variant="strong" />
      <Helloworld text="lorem ipsum dolor sit amet." />
    </div>
  )
}

export default App