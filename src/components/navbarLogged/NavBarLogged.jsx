import UserTag from '../userData/Userdata';
import avatar from "/src/assets/avatar1.png";
import { Link } from 'react-router-dom';

function NavBarLogged() {
    return (
        <nav className="bg-blue-900 text-white shadow-md p-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                {/* Brand name */}
                <div className="text-2xl font-semibold text-white">
                    SunShine Villa
                </div>

                {/* Navigation links and user actions */}
                <div className="flex items-center space-x-6">
                    <p className="hover:text-gray-300 cursor-pointer transition-colors duration-300"><Link to="/logged">Home</Link></p>
                    <p className="hover:text-gray-300 cursor-pointer transition-colors duration-300"><Link to="/aboutus">About</Link></p>
                    <p className="hover:text-gray-300 cursor-pointer transition-colors duration-300"><Link to="/contactus">Contact</Link></p>
                    <p className="hover:text-gray-300 cursor-pointer transition-colors duration-300">Gallery</p>
                    <UserTag imageLink={avatar} name="Madhushani" />
                </div>
            </div>
        </nav>
    );
}

export default NavBarLogged;