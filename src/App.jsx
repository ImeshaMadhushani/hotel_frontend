import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/client/home/homepage'
import Login from './pages/login/login';

function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes path='/*'>
          
          <Route path='/*' element={<HomePage />}></Route>
           <Route path='/login' element={<Login/>}></Route>

        </Routes>
      </BrowserRouter> 
    
    </>
  )
}

export default App;
