const dashboard = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de Bord - Coworking</title>
    <link rel="stylesheet" href="dashboard.css"> <!-- Lien vers le fichier CSS -->
</head>
<body>
    <div class="dashboard-container">
        <header>
            <h1>Tableau de Bord du Coworking</h1>
        </header>
        
        <section class="card-container">
            <div class="card">
                <h2>Utilisateurs Inscrits par Mois</h2>
                <img src="./user_signups_by_month.jpg" alt="Utilisateurs Inscrits par Mois">
            </div>

            <div class="card">
                <h2>Répartition des Utilisateurs : Admin vs Non-Admin</h2>
                <img src="./user_repartition.jpg" alt="Répartition des Utilisateurs">
            </div>

            <div class="card">
                <h2>Réservations par Type de Salle</h2>
                <img src="./room_bookings.jpg" alt="Réservations par Type de Salle">
            </div>

            <div class="card">
                <h2>Taux d'Occupation des Salles</h2>
                <img src="./room_occupancy_rate.jpg" alt="Taux d'Occupation des Salles">
            </div>
        </section>
    </div>
</body>
</html>
`;

export default dashboard ;
