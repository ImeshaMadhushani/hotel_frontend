import { Link, Route, Routes } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegWindowMaximize } from "react-icons/fa"; // Icon for Rooms
import { FaUsers } from "react-icons/fa"; // Icon for Users
import { FaRegComments } from "react-icons/fa"; // Icon for Feedback
import { FaImages } from "react-icons/fa"; // Icon for Gallery Items
import AdminBooking from "../admin/Bookings/adminBookings";
import AdminCategories from "../admin/Categories/adminCategories";
import AdminRooms from "../admin/Rooms/adminRooms";
import AdminUsers from "../admin/Users/adminUsers";
import AdminFeedback from "../admin/Feedback/adminFeedback";
import AdminGalleryItems from "../admin/GalleryItems/admingalleryItems";

export default function AdminPage() {
    return (
        <div className="w-full max-h-[100vh] overflow-hidden overflow-y-hidden flex">
            <div className="w-[20%] bg-blue-400 h-[100vh] flex flex-col">
                <div className="text-white text-[30px] hover:text-black hover:font-bold flex items-center px-4 py-2">
                    <CiBookmarkCheck className="mr-2" />
                    <Link to="/admin/bookings">Bookings</Link>
                </div>

                <div className="text-white text-[30px] hover:text-black hover:font-bold flex items-center px-4 py-2">
                    <MdOutlineCategory className="mr-2" />
                    <Link to="/admin/categories">Categories</Link>
                </div>

                <div className="text-white text-[30px] hover:text-black hover:font-bold flex items-center px-4 py-2">
                    <FaRegWindowMaximize className="mr-2" />
                    <Link to="/admin/rooms">Rooms</Link>
                </div>

                <div className="text-white text-[30px] hover:text-black hover:font-bold flex items-center px-4 py-2">
                    <FaUsers className="mr-2" />
                    <Link to="/admin/users">Users</Link>
                </div>

                <div className="text-white text-[30px] hover:text-black hover:font-bold flex items-center px-4 py-2">
                    <FaRegComments className="mr-2" />
                    <Link to="/admin/feedback">Feedback</Link>
                </div>

                <div className="text-white text-[30px] hover:text-black hover:font-bold flex items-center px-4 py-2">
                    <FaImages className="mr-2" />
                    <Link to="/admin/gallery-items">Gallery Items</Link>
                </div>
            </div>

            <div className="w-[80%] max-h-[100vh] bg-blue-900 flex flex-col overflow-y-scroll ">
                <Routes path="/">
                    <Route path="/bookings" element={<AdminBooking/>} />
                    <Route path="/categories" element={<AdminCategories/>} />
                    <Route path="/rooms" element={<AdminRooms/>} />
                    <Route path="/users" element={<AdminUsers/>} />
                    <Route path="/feedback" element={<AdminFeedback/>} />
                    <Route path="/gallery-items" element={<AdminGalleryItems/>} />
                </Routes>
            </div>
        </div>
    );
}
