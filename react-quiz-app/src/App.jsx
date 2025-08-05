import './css/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';


function App() {

  return (
    <>
      <Router basename='/ReactQuizApp'>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/game' element={<Game></Game>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
