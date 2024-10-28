import './navBar.css';

function NavBar() {
    return (
        <nav className="bg-blue-900 text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl text-[#0B192C] font-semibold stroke-text3">SunShine Villa</div>
                <div className="flex space-x-6">
                    <a href="/" className="hover:text-[#0B192C] transition duration-200">Home</a>
                    <a href="/about" className="hover:text-[#0B192C] transition duration-200">About</a>
                    <a href="/contact" className="hover:text-[#0B192C] transition duration-200">Contact</a>
                    <a href="/login" className="hover:text-[#0B192C] transition duration-200">Login</a>
                    <a href="/logout" className="hover:text-[#0B192C] transition duration-200">Logout</a>
                    <a href="/booking" className="bg-blue-500 hover:text-[#0B192C] text-white py-1 px-4 rounded transition duration-200">Book Now</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
