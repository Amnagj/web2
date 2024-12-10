import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css"; // Add this CSS file for styling

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // List of users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [newUser, setNewUser] = useState({ name: "", mail: "", password: "" }); // New user data
  const [success, setSuccess] = useState(null); // Success message

  // Fetch users from the server

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true, // Ensures cookies are sent with the request
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  
  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to add user.");
      }
      const addedUser = await response.json();
      setUsers([...users, addedUser]); // Add new user to the list
      setNewUser({ name: "", mail: "", password: "" }); // Reset form
      setSuccess("User added successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
      setUsers(users.filter((user) => user._id !== userId)); // Remove user from the list
      setSuccess("User deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-content">
        <h1 className="admin-title">Admin Panel</h1>
        {loading && <p className="loading">Loading users...</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
        {/* User Table */}
        {!loading && !error && (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.mail}</td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add User Form */}
            <div className="add-user-form">
              <h2>Add New User</h2>
              <form onSubmit={handleAddUser}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newUser.mail}
                    onChange={(e) =>
                      setNewUser({ ...newUser, mail: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="add-button">
                  Add User
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
