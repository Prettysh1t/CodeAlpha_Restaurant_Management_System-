const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
    orderStatus: { 
        type: DataTypes.ENUM('Pending', 'Preparing', 'Served', 'Completed', 'Cancelled'), 
        defaultValue: 'Pending' 
    },
    paymentStatus: { 
        type: DataTypes.ENUM('Pending', 'Paid', 'Failed'), 
        defaultValue: 'Pending' 
    }
});

module.exports = Order;