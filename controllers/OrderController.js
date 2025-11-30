
export async function createOrder(req, res) {
    try {
        return res.json({msg: "Criando pedido"});
    } catch (error) {
        return res.status(500).json({ error: "Falha ao criar o pedido" });
    }
}

export async function updateOrder(req, res) {
    try {
        return res.json({msg: "Atualizando pedido"});
    } catch (error) {
        return res.status(500).json({ error: "Falha ao atualizar o pedido" });
    }
}

export async function deleteOrder(req, res) {
    try {
        return res.json({msg: "Deletando pedido"});
    } catch (error) {
        return res.status(500).json({ error: "Falha ao deletar o pedido" });
    }
}

export async function getOrder(req, res) {
    try {
        return res.json({msg: "Exibindo um pedido"});
    } catch (error) {
        return res.status(500).json({ error: "Falha ao exibir o pedido" });
    }
}

export async function getAllOrder(req, res) {
    try {
        return res.json({msg: "Exibindo todos os pedido"});
    } catch (error) {
        return res.status(500).json({ error: "Falha ao listar pedidos" });
    }
}