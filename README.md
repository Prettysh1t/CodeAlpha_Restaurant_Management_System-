# 🍽️ Restaurant Management System API

A scalable, full-stack backend system for managing restaurant operations, built with Node.js, Express, PostgreSQL, and Sequelize.

## ✨ Features
* **Role-Based JWT Auth**: Admin, Staff, and Customer access tiers.
* **Transactional Orders**: Atomically process orders while validating table availability and stock levels.
* **Smart Inventory**: Auto-deducts ingredients via recipe mapping and prevents orders if stock is insufficient.
* **Table Management**: Real-time tracking of table occupancy and reservations.
* **Dockerized**: Fully containerized for instant local development and production deployment.

## 🚀 Quick Start (Docker)

1. **Clone the repo**
   ```bash
   git clone [https://github.com/yourusername/restaurant-management.git](https://github.com/yourusername/restaurant-management.git)
   cd restaurant-management