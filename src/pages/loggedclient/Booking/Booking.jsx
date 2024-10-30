import NavBarLogged from "../../../components/navbarLogged/NavBarLogged"
import "./booking.css";

export default function Booking() {

     const user = JSON.parse(localStorage.getItem("user"));

    return(
    <div className="">
            <div>
             <NavBarLogged user={user} />
            </div>

           
            
        </div>
    )
}