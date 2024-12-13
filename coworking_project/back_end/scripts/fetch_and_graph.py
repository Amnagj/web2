import os
from pymongo import MongoClient
import matplotlib.pyplot as plt

# MongoDB Atlas URI
client = MongoClient(
    "mongodb+srv://amna:WHG4aloCoO8T4Fvm@cluster0.z64na.mongodb.net/"
)  # Replace with your Atlas URI

# Connect to the database and collection
db = client["test"]  # Replace with your database name
users_collection = db["users"]  # Replace with your collection name

# Fetch data
users = list(users_collection.find())  # Convert cursor to list

# Process data for the graph
is_admin_count = sum(1 for user in users if user.get("isAdmin") is True)
regular_user_count = len(users) - is_admin_count

# Handle empty data
if len(users) == 0:
    print("No users found in the database.")
    exit()

# Data for the graph
labels = ["Admins", "Regular Users"]
sizes = [is_admin_count, regular_user_count]
colors = ["#FF9999", "#66B2FF"]  # Optional: color customization
explode = (0.1, 0)  # Highlight the admin slice

# Validate sizes
if sum(sizes) == 0:
    print("No data to plot. Ensure your database has users with isAdmin field set.")
    exit()

# Create the directory if it doesn't exist
output_directory = "C:/Users/gouja/coworking/src/components/img/user_repartition.jpg"
os.makedirs(output_directory, exist_ok=True)

# Create a pie chart
plt.figure(figsize=(8, 6))
plt.pie(
    sizes,
    explode=explode,
    labels=labels,
    colors=colors,
    autopct="%1.1f%%",
    startangle=140,
)
plt.title("User Repartition")

# Save and display the chart
output_file = os.path.join(output_directory, "user_repartition.jpg")
plt.savefig(output_file, format="jpg")
plt.close()
