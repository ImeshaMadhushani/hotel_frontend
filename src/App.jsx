import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/client/login/login';
import Register from './pages/client/register/register';
import WelcomePage from './pages/client/welcome/welcomepage';
import Home from './pages/client/home/home';
import Logged from './pages/loggedclient/logged';

function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes path='/*'>
          
          <Route path='/*' element={<WelcomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/logged' element={<Logged />}></Route>

        </Routes>
      </BrowserRouter> 
    
    </>
  )
}

export default App;
