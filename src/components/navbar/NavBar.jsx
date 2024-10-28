function NavBar() {
    return (
        <nav className="bg-blue-700 text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-semibold">SunShine Villa</div>
                <div className="flex space-x-6">
                    <a href="/" className="hover:text-blue-100 transition duration-200">Home</a>
                    <a href="/about" className="hover:text-yellow-300 transition duration-200">About</a>
                    <a href="/contact" className="hover:text-yellow-300 transition duration-200">Contact</a>
                    <a href="/login" className="hover:text-yellow-300 transition duration-200">Login</a>
                    <a href="/logout" className="hover:text-yellow-300 transition duration-200">Logout</a>
                    <a href="/booking" className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded transition duration-200">Book Now</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
