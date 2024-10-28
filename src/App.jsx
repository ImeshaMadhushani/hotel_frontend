import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/login';
import Register from './pages/register/register';
import WelcomePage from './pages/client/welcome/welcomepage';
import Home from './pages/client/home/home';

function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes path='/*'>
          
          <Route path='/*' element={<WelcomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>

        </Routes>
      </BrowserRouter> 
    
    </>
  )
}

export default App;
