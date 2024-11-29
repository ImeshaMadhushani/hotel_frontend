import { Link } from 'react-router-dom';
import "./navbar.css";

function NavBar() {
    return (
        <nav className="bg-blue-900 text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand name */}
                <div className="text-2xl font-semibold text-white">SunShine Villa</div>
                
                {/* Navigation links and user actions */}
                <div className="flex items-center space-x-4">
                    <p href="#home" className="text-white hover:text-gray-200 transition duration-200">
                        <Link to='/'>Home</Link>
                    </p>
                    <p href="#aboutus" className="text-white hover:text-gray-200 transition duration-200">
                          <Link to='/aboutus'>About</Link>
                    </p>

                     <p href="#gallery" className="text-white hover:text-gray-200 transition duration-200">
                        <Link to="/galleryp">Gallery</Link>
                    </p>

                    <p href="#contactus" className="text-white hover:text-gray-200 transition duration-200">
                          <Link to='/contactus'>ContactUs</Link>
                    </p>

                   {/* Book Now Button */}
                  {/*   <button className="bg-[#3f71b6] hover:bg-white hover:text-[#0B192C] text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                        Book Now
                    </button>
 */}
                    {/* Login Button */}
                   <button className="bg-[#3f71b6] hover:bg-white hover:text-[#0B192C] text-white py-2 px-4 rounded-md shadow-md transition duration-200">
                        <Link to='/login'>Login</Link>
                    </button>
                    
                    
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
