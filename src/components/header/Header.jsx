export default function Header() {
  return (
    <header className="bg-purple-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotel ABC</h1>
        <nav className="space-x-4">
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#contact" className="hover:underline">Contact Us</a>
          <a href="#gallery" className="hover:underline">Gallery</a>
          <a href="#login" className="hover:underline">Login / Sign Up</a>
        </nav>
      </div>
    </header>
  );
}














/* import UserTag from '../userData/Userdata';
import avatar from "/src/assets/avatar1.png";
function Header() {
    return(
    <>
         <header className='w-full flex  relative items-center'>
          
            <UserTag imageLink={avatar} name="Madhushani" />
            
        </header>
        </>
    )
}


export default Header; */