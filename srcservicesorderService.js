const { sequelize, Order, OrderItem, MenuItem, Inventory, Recipe, Table } = require('../models');
const AppError = require('../utils/AppError'); // Custom error class

class OrderService {
    static async placeOrder(tableId, customerId, items) {
        // Start a managed transaction
        const transaction = await sequelize.transaction();

        try {
            // 1. Verify Table Availability
            const table = await Table.findByPk(tableId, { transaction });
            if (!table || table.availability_status !== 'Available') {
                throw new AppError('Table is not available', 400);
            }

            // 2. Create the Order Shell
            const order = await Order.create({ TableId: tableId, customerId }, { transaction });
            let orderTotal = 0;

            // 3. Process each item in the order
            for (const item of items) {
                const menuItem = await MenuItem.findByPk(item.menuItemId, {
                    include: [{ model: Inventory, through: Recipe }],
                    transaction
                });

                if (!menuItem || !menuItem.availability_status) {
                    throw new AppError(`Menu item ${item.menuItemId} is unavailable`, 400);
                }

                const subtotal = menuItem.price * item.quantity;
                orderTotal += subtotal;

                // 4. Deduct Inventory based on Recipe
                for (const ingredient of menuItem.Inventories) {
                    const quantityNeeded = ingredient.Recipe.quantity_required * item.quantity;
                    
                    if (ingredient.stock_quantity < quantityNeeded) {
                        throw new AppError(`Insufficient stock for ingredient: ${ingredient.ingredient_name}`, 400);
                    }

                    // Update inventory stock
                    await ingredient.update({
                        stock_quantity: ingredient.stock_quantity - quantityNeeded
                    }, { transaction });

                    // Optional: Trigger Low Stock Alert here if stock < minimum_stock_threshold
                }

                // 5. Create Order Item
                await OrderItem.create({
                    OrderId: order.id,
                    MenuItemId: menuItem.id,
                    quantity: item.quantity,
                    subtotal: subtotal
                }, { transaction });
            }

            // 6. Finalize Order and Table Status
            await order.update({ totalPrice: orderTotal }, { transaction });
            await table.update({ availability_status: 'Occupied' }, { transaction });

            // Commit transaction if everything succeeds
            await transaction.commit();
            return order;

        } catch (error) {
            // Rollback everything if ANY step fails
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = OrderService;