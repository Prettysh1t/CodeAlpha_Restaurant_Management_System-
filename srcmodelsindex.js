const sequelize = require('../config/database');
const User = require('./User');
const MenuItem = require('./MenuItem');
const Table = require('./Table');
const Reservation = require('./Reservation');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Inventory = require('./Inventory');
const Recipe = require('./Recipe'); // Maps MenuItems to Inventory Ingredients

// Define Relationships
Order.belongsTo(Table);
Order.belongsTo(User, { as: 'customer' });
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(MenuItem);

// Inventory to Menu Mapping (Many-to-Many via Recipe)
MenuItem.belongsToMany(Inventory, { through: Recipe });
Inventory.belongsToMany(MenuItem, { through: Recipe });

module.exports = { sequelize, User, MenuItem, Table, Reservation, Order, OrderItem, Inventory, Recipe };