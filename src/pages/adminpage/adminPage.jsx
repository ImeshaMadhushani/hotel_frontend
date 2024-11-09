import { Link, Route, Routes } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegWindowMaximize, FaUsers, FaRegComments, FaImages } from "react-icons/fa"; 
import AdminBooking from "../admin/Bookings/adminBookings";
import AdminCategories from "../admin/Categories/adminCategories";
import AdminRooms from "../admin/Rooms/adminRooms";
import AdminUsers from "../admin/Users/adminUsers";
import AdminFeedback from "../admin/Feedback/adminFeedback";
import AdminGalleryItems from "../admin/GalleryItems/admingalleryItems";

export default function AdminPage() {
    // Retrieve the admin data from localStorage
    const admin = JSON.parse(localStorage.getItem("user"));

    // Debugging to ensure the admin data is being retrieved correctly
    console.log("Admin Data:", admin); // Check what is being logged

    // Default values if no data exists
    const adminName = admin?.firstName + " " + admin?.lastName || "Admin Name"; // Make sure name exists in admin object
    const adminEmail = admin?.email || "admin@example.com";

    return (
        <div className="w-full h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/5 bg-[#0B192C] text-white flex flex-col py-8 px-6 shadow-lg">
                {/* Admin Info Section */}
                <div className="mb-12 text-center">
                    {/* Display admin name and email */}
                    <div className="text-lg font-semibold">{adminName}</div> {/* Display name here */}
                    <div className="text-sm text-gray-400">{adminEmail}</div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-6">
                    <div className="text-white text-lg hover:text-blue-600 flex items-center px-4 py-2 transition-all duration-300">
                        <CiBookmarkCheck className="mr-3 text-xl" />
                        <Link to="/admin/bookings">Bookings</Link>
                    </div>

                    <div className="text-white text-lg hover:text-blue-600 flex items-center px-4 py-2 transition-all duration-300">
                        <MdOutlineCategory className="mr-3 text-xl" />
                        <Link to="/admin/categories">Categories</Link>
                    </div>

                    <div className="text-white text-lg hover:text-blue-600 flex items-center px-4 py-2 transition-all duration-300">
                        <FaRegWindowMaximize className="mr-3 text-xl" />
                        <Link to="/admin/rooms">Rooms</Link>
                    </div>

                    <div className="text-white text-lg hover:text-blue-600 flex items-center px-4 py-2 transition-all duration-300">
                        <FaUsers className="mr-3 text-xl" />
                        <Link to="/admin/users">Users</Link>
                    </div>

                    <div className="text-white text-lg hover:text-blue-600 flex items-center px-4 py-2 transition-all duration-300">
                        <FaRegComments className="mr-3 text-xl" />
                        <Link to="/admin/feedback">Feedback</Link>
                    </div>

                    <div className="text-white text-lg hover:text-blue-600 flex items-center px-4 py-2 transition-all duration-300">
                        <FaImages className="mr-3 text-xl" />
                        <Link to="/admin/gallery-items">Gallery Items</Link>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-4/5 h-full bg-gray-50 flex flex-col overflow-y-auto">
                {/* Header Section */}
                <div className="bg-blue-800 text-white p-6 flex items-center justify-between shadow-md">
                    <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                    <div className="text-sm text-gray-300">{adminName} | {adminEmail}</div> {/* Display name here */}
                </div>

                {/* Routes for the different pages */}
                <div className="flex-grow p-6 overflow-y-auto bg-gray-200">
                    <Routes>
                        <Route path="/bookings" element={<AdminBooking />} />
                        <Route path="/categories" element={<AdminCategories />} />
                        <Route path="/rooms" element={<AdminRooms />} />
                        <Route path="/users" element={<AdminUsers />} />
                        <Route path="/feedback" element={<AdminFeedback />} />
                        <Route path="/gallery-items" element={<AdminGalleryItems />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
