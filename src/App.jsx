import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/client/home/homepage'

function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes path='/*'>
          
            <Route path='/*' element={<HomePage/>}></Route>

        </Routes>
      </BrowserRouter> 
    
    </>
  )
}

export default App;
