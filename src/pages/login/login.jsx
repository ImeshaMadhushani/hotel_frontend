import "./login.css";

export default function Login() {
    return (
        <>
            <div className="relative flex flex-col items-center justify-center h-screen text-center bg-cover bg-center p-12 overlay1">
                <div className="w-[400px] h-auto bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg flex flex-col items-center p-6">

                    <h1 className="text-4xl font-bold mb-6 text-[#0B192C]">Login</h1>

                    <input type="text" className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter your Email" ></input>
                    <input type="password" className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter your Password" ></input>
                
                     <button className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-300">
                        Login
                    </button>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-800">Forgot Password?</a>
                    <p className="text-xs text-gray-500 mt-4">Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-800">Sign Up</a></p>

                
                </div>
            </div>
        </>
    )
    
}