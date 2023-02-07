import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'
import Header from './pages/Header'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
