const db = require("../data/connection");


const criarCliente = async (req, res) => {
    try {
        const { nome, telefone, email } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
        }

        const sql = `
            INSERT INTO clientes (nome, telefone, email)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [nome, telefone, email]);

        const novoCliente = {
            id_cliente: resultado.insertId,
            nome,
            telefone,
            email
        };

        res.status(201).json(novoCliente);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};


const listarClientes = async (req, res) => {
    try {
        const [clientes] = await db.query("SELECT * FROM clientes");
        res.json(clientes);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const atualizarClientes = async (req, res) => {
    try {
        const { id } = req.params; 
        const { nome, telefone, email } = req.body;

        const [existe] = await db.query("SELECT * FROM clientes WHERE id_cliente = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Cliente não encontrado." });
        }

        const sql = `
            UPDATE clientes
            SET nome = ?, telefone = ?, email = ?
            WHERE id_cliente = ?
        `;

        await db.query(sql, [nome, telefone, email, id]);

        res.json({
            mensagem: "Cliente atualizado com sucesso!",
            cliente: { id_cliente: id, nome, telefone, email }
        });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const excluirClientes = async (req, res) => {
    try {
        const { id } = req.params;

        const [existe] = await db.query("SELECT * FROM clientes WHERE id_cliente = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Cliente não encontrado." });
        }

        await db.query("DELETE FROM clientes WHERE id_cliente = ?", [id]);

        res.json({ mensagem: "Cliente removido com sucesso!" });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

module.exports = {
    criarCliente,
    listarClientes,
    atualizarClientes,
    excluirClientes
};
