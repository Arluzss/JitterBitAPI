import orderService from '../services/OrderService.js';

export class OrderController {
  async create(req, res) {
    try {
      const body = req.body;
      await create(body);
      return res.status(201).json({ message: "Pedido criado com sucesso" });
    } catch (error) {
      if (error && error.message === 'Pedido já existe') {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const orderUpdated = await orderService.update(id, body);

      if (!orderUpdated) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      return res.status(200).json({ orderUpdated });
    } catch (error) {
      if (error.message === 'Pedido não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await orderService.remove(id);

      if (!result) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.getById(id);

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      return res.status(200).json({ data: order });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  async list(req, res) {
    try {
      const orders = await orderService.list();
      return res.status(200).json({ data: orders });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno" });
    }
  }
}

export default new OrderController();
