import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/client/login/login';
import Register from './pages/client/register/register';
//import WelcomePage from './pages/client/welcome/welcomepage';
import Home from './pages/client/home/home';
import Logged from './pages/loggedclient/logged';
import AboutUs from './components/aboutus/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import Rooms from './pages/loggedclient/Rooms/Rooms';
import AdminPage from './pages/adminpage/adminPage'; // Import the admin page component
import Services from './components/services/Services';
import GalleryP from './components/mainGallery/GalleryP';
import Booking from './pages/loggedclient/booking/booking';
function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes path='/*'>
          
          {/* <Route path='/*' element={<WelcomePage />}></Route> */}
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/contactus' element={<ContactUs />}></Route> 
          <Route path='/home' element={<Home />}></Route>
          <Route path='/logged' element={<Logged />}></Route>
          <Route path='/rooms' element={<Rooms />}></Route>
          <Route path='/booking/:roomId' element={<Booking />}></Route>
          <Route path='/services' element={<Services />}></Route>
          <Route path='/galleryp' element={<GalleryP />}></Route>
          

        </Routes>
      </BrowserRouter> 
    
    </>
  )
}

export default App;
