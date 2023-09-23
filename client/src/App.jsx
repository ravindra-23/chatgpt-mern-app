import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from "./components/chat"

function App() {

  return (
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={ <Chat /> } />
          </Routes>
        </Router>
      </div>
  )
}

export default App
