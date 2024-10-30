
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#0B192C] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-bold mb-2">Quick Links</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link to="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:underline">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-bold mb-2">Contact Us</h3>
                        <p>Email: info@sunshinevilla.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Facebook
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Twitter
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 border-t border-gray-600 pt-4 text-center">
                    <p className="text-sm">© {new Date().getFullYear()} SunShine Villa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
