// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', phone: '', type: 'customer' });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/api/user`;

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new user
  const handleAddUser = async () => {
    try {
      const response = await axios.post(apiUrl, newUser);
      alert(response.data.message);
      fetchUsers(); // Refresh user list
      setNewUser({ firstName: '', lastName: '', email: '', phone: '', type: 'customer' }); // Reset form
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${apiUrl}/${userId}`);
      alert(response.data.message);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  // Handle editing a user
  const handleEditUser = async (userId) => {
    try {
      const updatedUser = { ...newUser }; // Get updated data from form
      const response = await axios.put(`${apiUrl}/${userId}`, updatedUser);
      alert(response.data.message);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error editing user', error);
    }
  };

  // Handle filtering users based on role
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtered users based on selected role
  const filteredUsers = filter === 'all' ? users : users.filter(user => user.type === filter);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Admin Users</h1>

      {/* Add user form */}
      <div className="mb-6 p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Add New User</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="input w-full p-3 border rounded-md"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            className="input w-full p-3 border rounded-md"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="input w-full p-3 border rounded-md"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone"
            className="input w-full p-3 border rounded-md"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <select
            value={newUser.type}
            onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
            className="w-full p-3 border rounded-md"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button 
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>

      {/* Filter users */}
      <div className="mb-6">
        <select 
          onChange={handleFilterChange} 
          value={filter} 
          className="w-full p-3 border rounded-md bg-white shadow-sm"
        >
          <option value="all">All Users</option>
          <option value="customer">Customers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Users list */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="table-auto w-full text-left bg-white border rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">First Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Last Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Phone</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Role</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-700">{user.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.type}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    onClick={() => handleEditUser(user._id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
