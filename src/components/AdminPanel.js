import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css"; // Assurez-vous que ce fichier existe et contient les styles nécessaires
import graph1 from "./user_signups_by_month.jpg";
import graph2 from "./user_repartition.jpg";
import graph3 from "./room_bookings.jpg";
import graph4 from "./room_occupancy_rate.jpg";



// Composant pour le tableau de bord
const DashboardContent = () => (
  <div className="dashboard-container">
    <header>
      <h1>Tableau de Bord du Coworking</h1>
    </header>
    
    <section className="card-container">
      <div className="card">
        <h2>Utilisateurs Inscrits par Mois</h2>
        <img src={graph1} alt="Utilisateurs Inscrits par Mois" />
      </div>

      <div className="card">
        <h2>Répartition des Utilisateurs : Admin vs Non-Admin</h2>
        <img src={graph2} alt="Répartition des Utilisateurs" />
      </div>

      <div className="card">
        <h2>Réservations par Type de Salle</h2>
        <img src={graph3} alt="Réservations par Type de Salle" />
      </div>

      <div className="card">
        <h2>Taux d'Occupation des Salles</h2>
        <img src={graph4} alt="Taux d'Occupation des Salles" />
      </div>
    </section>
  </div>
);

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur
  const [newUser, setNewUser] = useState({ name: "", mail: "", password: "" }); // Données du nouvel utilisateur
  const [success, setSuccess] = useState(null); // Message de succès
  const [graphUrl, setGraphUrl] = useState(""); // URL du graphique

  // Récupérer les utilisateurs depuis le serveur
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true, // Assure que les cookies sont envoyés
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

  // Récupérer l'image du graphique
  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const graphEndpoint = "http://localhost:4000/api/graph/user-repartition";
        setGraphUrl(graphEndpoint);
      } catch (err) {
        console.error("Error fetching graph:", err);
        setError("Error loading graph.");
      }
    };

    fetchGraph();
  }, []);

  // Ajouter un utilisateur
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
      setUsers([...users, addedUser]); // Ajouter l'utilisateur à la liste
      setNewUser({ name: "", mail: "", password: "" }); // Réinitialiser le formulaire
      setSuccess("User added successfully!");
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  // Supprimer un utilisateur
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
      setUsers(users.filter((user) => user._id !== userId)); // Retirer l'utilisateur de la liste
      setSuccess("User deleted successfully!");
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-content">
        <h1 className="admin-title">Admin Panel</h1>
        {loading && <p className="loading">Loading users...</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {/* Tableau des utilisateurs */}
        {!loading && !error && (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.mail}</td>
                  <td>{user.isAdmin ? "Admin" : "User"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Section Graphique */}
        
      </div>

      {/* Insertion du Dashboard */}
      <DashboardContent />
    </div>
  );
};

export default AdminPanel;
