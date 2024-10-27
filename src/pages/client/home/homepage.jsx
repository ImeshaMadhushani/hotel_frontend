import Header from "../../../components/header/Header";
import "./homepage.css"
export default function HomePage() {

    function visit() {
        alert('Visiting SunShine Villa is currently unavailable, please visit us at our other locations.')
    }

    return (
        <>
          
            <div className="relative flex flex-col items-center justify-center h-screen text-center bg-cover bg-center p-12 overlay">
                <Header />
                <div className='mt-10 relative z-10'>
                <h2 className="text-4xl font-semibold text-[white] stroke-text1">Welcome to SunShine Villa</h2>
                <p className="text-lg text-gray-200 mt-4 stroke-text2">Discover our beautiful and luxurious hotel</p>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800" onClick={visit}>Visit Us</button>
                </div>
            </div>
        </>
    );
}