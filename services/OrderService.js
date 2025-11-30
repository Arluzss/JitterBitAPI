import { pool } from '../config/database.js';

export async function list() {
    try {
        const ordersResult = await pool.query('SELECT * FROM orders');
        const itemsResult = await pool.query('SELECT * FROM order_items');

        return ordersResult.rows.map(order => ({
            ...order,
            items: itemsResult.rows.filter(item => item.orderid === order.orderid)
        }));

    } catch (error) {
        console.error('Erro no service getAllOrder:', error);
        throw new Error('Erro ao buscar pedidos');
    }
}

export async function getById(id) {
    try {
        const orderResult = await pool.query(
            'SELECT * FROM orders WHERE orderId = $1', [id]
        );

        if (orderResult.rows.length === 0) {
            return null; 
        }

        const itemsResult = await pool.query(
            'SELECT * FROM order_items WHERE orderId = $1', [id]
        );

        return {
            ...orderResult.rows[0],
            items: itemsResult.rows
        };

    } catch (error) {
        console.error('Erro no service getOrderById:', error);
        throw new Error('Erro ao buscar pedido');
    }
}

export async function remove(id) {
    try {
        const result = await pool.query(
            'DELETE FROM orders WHERE orderId = $1', [id]
        );

        if (result.rowCount === 0) {
            throw new Error('Pedido não encontrado');
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erro no service deleteOrder:', error);
        throw new Error('Erro ao deletar pedido');
    }
}

export async function update(id, body) {
    try {
        const result = await pool.query(
            'UPDATE orders SET value = $2, creationDate = $3 WHERE orderId = $1 RETURNING *',
            [id, body.valorTotal, body.dataCriacao]
        );

        if (result.rowCount === 0) {
            throw new Error('Pedido não encontrado');
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erro no service updateOrder:', error);
        throw new Error('Erro ao atualizar pedido');
    }
}

export async function create(body) {
    try {

        await pool.query(
            'INSERT INTO orders (orderId, value, creationDate) VALUES ($1, $2, $3)',
            [body.numeroPedido, body.valorTotal, body.dataCriacao]
        );

        const items = body.items;

        for (const item of items) {
            await pool.query(
                'INSERT INTO order_items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)',
                [body.numeroPedido, item.idItem, item.quantidadeItem, item.valorItem]
            );
        }

    } catch (err) {
        console.error('Erro no service createOrder:', err);
        throw new Error('Erro ao criar pedido');
    }
}