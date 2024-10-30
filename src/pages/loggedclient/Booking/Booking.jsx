import NavBarLogged from "../../../components/navbarLogged/NavBarLogged"
import "./booking.css";

export default function Booking() {

     const user = JSON.parse(localStorage.getItem("user"));

    return(
    <div className="">
            <div>
             <NavBarLogged user={user} />
            </div>

            <div>
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input 
              type="date" 
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="date" 
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select 
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Luxury</option>
              <option>Deluxe</option>
              <option>Standard</option>
            </select>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Book Now
            </button>
          </div>
            </div>
            
        </div>
    )
}