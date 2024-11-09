import { Link, Route, Routes } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegWindowMaximize, FaUsers, FaRegComments, FaImages } from "react-icons/fa"; // Import all icons
import AdminBooking from "../admin/Bookings/adminBookings";
import AdminCategories from "../admin/Categories/adminCategories";
import AdminRooms from "../admin/Rooms/adminRooms";
import AdminUsers from "../admin/Users/adminUsers";
import AdminFeedback from "../admin/Feedback/adminFeedback";
import AdminGalleryItems from "../admin/GalleryItems/admingalleryItems";

export default function AdminPage() {
    // Assuming you are using some form of authentication and have user data available.
    const admin = {
        name: "Admin Name",
        email: "admin@example.com"
    };

    return (
        <div className="w-full h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/5 bg-blue-600 text-white flex flex-col py-6 px-4">
                {/* Admin Info Section */}
                <div className="mb-8 text-center">
                    <div className="text-lg font-semibold">{admin.name}</div>
                    <div className="text-sm text-gray-300">{admin.email}</div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-4">
                    <div className="text-white text-lg hover:text-black hover:font-bold flex items-center px-4 py-2 transition-colors">
                        <CiBookmarkCheck className="mr-2" />
                        <Link to="/admin/bookings">Bookings</Link>
                    </div>

                    <div className="text-white text-lg hover:text-black hover:font-bold flex items-center px-4 py-2 transition-colors">
                        <MdOutlineCategory className="mr-2" />
                        <Link to="/admin/categories">Categories</Link>
                    </div>

                    <div className="text-white text-lg hover:text-black hover:font-bold flex items-center px-4 py-2 transition-colors">
                        <FaRegWindowMaximize className="mr-2" />
                        <Link to="/admin/rooms">Rooms</Link>
                    </div>

                    <div className="text-white text-lg hover:text-black hover:font-bold flex items-center px-4 py-2 transition-colors">
                        <FaUsers className="mr-2" />
                        <Link to="/admin/users">Users</Link>
                    </div>

                    <div className="text-white text-lg hover:text-black hover:font-bold flex items-center px-4 py-2 transition-colors">
                        <FaRegComments className="mr-2" />
                        <Link to="/admin/feedback">Feedback</Link>
                    </div>

                    <div className="text-white text-lg hover:text-black hover:font-bold flex items-center px-4 py-2 transition-colors">
                        <FaImages className="mr-2" />
                        <Link to="/admin/gallery-items">Gallery Items</Link>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-4/5 h-full bg-gray-50 flex flex-col overflow-y-scroll">
                {/* Header Section (Optional) */}
                <div className="bg-blue-800 text-white p-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                    <div className="text-sm">{admin.name} | {admin.email}</div>
                </div>

                {/* Routes for the different pages */}
                <div className="flex-grow p-6 overflow-y-auto">
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
