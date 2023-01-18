import { Helloworld } from 'react-library-vite'
import '../../../node_modules/react-library-vite/dist/index.css'
import './App.css'

function App() {
  return (
    <div>
      <Helloworld text="Yo Bitches!!!" color="accent" variant="strong" />
      <Helloworld text="lorem ipsum dolor sit amet." />
    </div>
  )
}

export default App
