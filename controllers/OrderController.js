import { getById, remove, create, update, list } from '../services/OrderService.js';


export async function createOrder(req, res) {
    try {
        const body = req.body;
        await create(body);
        return res.json({ msg: "Criando pedido" });
    } catch (error) {
        return res.status(500).json({ error: "Falha ao criar o pedido" });
    }
}

export async function updateOrder(req, res) {
    try {
        const { id } = req.params;
        const body = req.body;
        const orderUpdated = await update(id, body);

        return res.json({ orderUpdated });
    } catch (error) {
        return res.status(500).json({ error: "Falha ao atualizar o pedido" });
    }
}

export async function deleteOrder(req, res) {
    try {
        const { id } = req.params;
        await remove(id);
        return res.json({ msg: "Deletado" });
    } catch (error) {
        return res.status(500).json({ error: "Falha ao deletar o pedido" });
    }
}

export async function getOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await getById(id);
        return res.json({ order });
    } catch (error) {
        return res.status(500).json({ error: "Falha ao exibir o pedido" });
    }
}

export async function getAllOrder(req, res) {
    try {
        const order = await list();
        return res.json({ order });
    } catch (error) {
        return res.status(500).json({ error: "Falha ao listar pedidos" });
    }
}