import matplotlib.pyplot as plt
import os
import pymongo
from datetime import datetime
import numpy as np
from pymongo.errors import PyMongoError

# Connexion à MongoDB
client = pymongo.MongoClient("mongodb+srv://amna:WHG4aloCoO8T4Fvm@cluster0.z64na.mongodb.net/")
db = client["test"]  # Remplacez par le nom de votre base de données
users_collection = db["users"]
rooms_collection = db["rooms"]

# Chemin de base pour enregistrer les images
base_path = "C:\\Users\\gouja\\coworking\\src\\components"

# Fonction pour générer les graphiques
def generate_user_signup_graph():
    user_counts_by_month = {}
    for user in users_collection.find():
        signup_date = user.get('createdAt', '')
        if signup_date:
            if isinstance(signup_date, datetime):
                signup_month = signup_date.strftime('%Y-%m')
            else:
                signup_month = signup_date[:7]
            user_counts_by_month[signup_month] = user_counts_by_month.get(signup_month, 0) + 1

    months = sorted(user_counts_by_month.keys())
    user_counts = [user_counts_by_month[month] for month in months]

    plt.figure(figsize=(10, 6))
    plt.bar(months, user_counts, color="#4CAF50")
    plt.title("Nombre d'utilisateurs inscrits par mois", fontsize=20, color="#333")
    plt.xlabel("Mois", fontsize=14, color="#333")
    plt.ylabel("Nombre d'utilisateurs", fontsize=14, color="#333")
    user_signup_path = os.path.join(base_path, "./user_signups_by_month.jpg")
    plt.savefig(user_signup_path)
    plt.close()

def generate_user_repartition_graph():
    admin_counts = {'Admin': 0, 'Non-Admin': 0}
    for user in users_collection.find():
        is_admin = 'Admin' if user.get('isAdmin', False) else 'Non-Admin'
        admin_counts[is_admin] += 1

    labels = list(admin_counts.keys())
    sizes = list(admin_counts.values())
    colors = ["#6f99c4", "#004080"]

    plt.figure(figsize=(8, 8))
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
    plt.title("Répartition des utilisateurs : Admin vs Non-Admin", fontsize=18, color="#333")
    user_repartition_path = os.path.join(base_path, "./user_repartition.jpg")
    plt.savefig(user_repartition_path)
    plt.close()

def generate_room_booking_graph():
    room_booking_counts = {}
    for room in rooms_collection.find():
        room_type = room.get('type')
        if room_type:
            room_booking_counts[room_type] = room_booking_counts.get(room_type, 0)
            for booking in room.get('bookings', []):
                room_booking_counts[room_type] += 1

    rooms = list(room_booking_counts.keys())
    booking_counts = list(room_booking_counts.values())

    plt.figure(figsize=(10, 6))
    plt.bar(rooms, booking_counts, color="#6f99c4")
    plt.title("Nombre de réservations par type de salle", fontsize=20, color="#333")
    plt.xlabel("Type de salle", fontsize=14, color="#333")
    plt.ylabel("Nombre de réservations", fontsize=14, color="#333")
    room_booking_path = os.path.join(base_path, "./room_bookings.jpg")
    plt.savefig(room_booking_path)
    plt.close()

def generate_room_occupancy_graph():
    room_capacity = {}
    room_occupancy = {}
    for room in rooms_collection.find():
        room_type = room.get('type')
        if room_type:
            room_capacity[room_type] = room.get('capacity', 0)
            room_occupancy[room_type] = sum([1 for booking in room.get('bookings', [])])

    occupancy_rates = {room: room_occupancy[room] / room_capacity[room] * 100 if room_capacity[room] > 0 else 0
                       for room in room_capacity}

    rooms = list(occupancy_rates.keys())
    occupancy = list(occupancy_rates.values())

    plt.figure(figsize=(10, 6))
    plt.bar(rooms, occupancy, color="#004080")
    plt.title("Taux d'occupation des salles", fontsize=20, color="#333")
    plt.xlabel("Type de salle", fontsize=14, color="#333")
    plt.ylabel("Taux d'occupation (%)", fontsize=14, color="#333")
    room_occupancy_rate_path = os.path.join(base_path, "./room_occupancy_rate.jpg")
    plt.savefig(room_occupancy_rate_path)
    plt.close()

# Fonction pour surveiller les changements
def watch_changes():
    try:
        with users_collection.watch() as user_stream, rooms_collection.watch() as room_stream:
            for change in user_stream:
                print("Changement détecté dans la collection 'users':", change)
                generate_user_signup_graph()
                generate_user_repartition_graph()

            for change in room_stream:
                print("Changement détecté dans la collection 'rooms':", change)
                generate_room_booking_graph()
                generate_room_occupancy_graph()
    except PyMongoError as e:
        print("Erreur lors de la surveillance :", e)

# Exécuter la surveillance des changements
if __name__ == "__main__":
    watch_changes()
