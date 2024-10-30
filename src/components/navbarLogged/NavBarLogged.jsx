import UserTag from '../userData/Userdata';
import avatar from "/src/assets/avatar1.png";

function NavBarLogged() {
    return (
        <nav className="bg-blue-900 text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand name */}
                <div className="text-2xl font-semibold text-white">SunShine Villa</div>
                
                {/* Navigation links and user actions */}
                <div className="flex items-center space-x-4">
                   
                    <p> Home</p>
                    <p> About</p>
                    <p> Contact</p>
                    <p> Gallery</p>
                    <UserTag imageLink={avatar} name="Madhushani" />
                    <p> Logout</p>
                    
                    

                    {/* Login Button */}
                  {/*   <button className="bg-[#3f71b6] hover:bg-white hover:text-[#0B192C] text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                        Login
                    </button>
                     */}
                    
                </div>
            </div>
        </nav>
    );
}

export default NavBarLogged;
