import { Link } from "react-router-dom";
import "./welcomepage.css"
export default function WelcomePage() {



    return (
        <>
          
            <div className="relative flex flex-col items-center justify-center h-screen text-center bg-cover bg-center p-12 overlay">
                       <header className='flex items-center justify-center py-4 mt-20'>
                            <h1 className='text-6xl font-bold text-[#0B192C] stroke-text'>SunShine Villa</h1>
                        </header>
                <div className='mt-10 relative z-10'>
                <h2 className="text-4xl font-semibold text-[white] stroke-text1">Welcome to SunShine Villa</h2>
                <p className="text-lg text-gray-200 mt-4 stroke-text2">Discover our beautiful and luxurious hotel</p>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"><Link to ="/login">Visit Us</Link></button>
                </div>
            </div>
        </>
    );
}