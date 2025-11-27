const db = require("../data/connection");

const agendar = async (req, res) => {
    const { id_cliente, id_tatuador, data, horario, desenho, valor, status } = req.body;

    try {
        const sql = `
            INSERT INTO agendamentos 
            (id_cliente, id_tatuador, data, horario, desenho, valor, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const r = await db.query(sql, [
            id_cliente,
            id_tatuador,
            data,
            horario,
            desenho,
            valor,
            status || "Confirmado"
        ]);

        res.status(201).json({
            id_agendamento: r[0].insertId,
            id_cliente,
            id_tatuador,
            data,
            horario,
            desenho,
            valor,
            status: status || "Confirmado"
        }).end();

    } catch (err) {
        res.status(500).json(err).end();
    }
};

const listarAgendamentos = async (req, res) => {
    try {
        const sql = `
            SELECT 
                a.id_agendamento,
                c.nome AS cliente,
                t.nome AS tatuador,
                a.data,
                a.horario,
                a.desenho,
                a.valor,
                a.status
            FROM agendamentos a
            INNER JOIN clientes c ON a.id_cliente = c.id_cliente
            INNER JOIN tatuadores t ON a.id_tatuador = t.id_tatuador
            ORDER BY a.data, a.horario
        `;

        const r = await db.query(sql);

        res.status(200).json(r[0]).end();

    } catch (err) {
        res.status(500).json(err).end();
    }
};

const agendaPorTatuador = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
            SELECT 
                a.data,
                a.horario,
                a.desenho,
                a.valor,
                a.status,
                c.nome AS cliente
            FROM agendamentos a
            JOIN clientes c ON a.id_cliente = c.id_cliente
            WHERE a.id_tatuador = ?
            ORDER BY a.data, a.horario
        `;

        const r = await db.query(sql, [id]);

        res.status(200).json(r[0]).end();

    } catch (err) {
        res.status(500).json(err).end();
    }
};

const agendaPorCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
            SELECT 
                a.data,
                a.horario,
                a.desenho,
                a.valor,
                a.status,
                t.nome AS tatuador
            FROM agendamentos a
            JOIN tatuadores t ON a.id_tatuador = t.id_tatuador
            WHERE a.id_cliente = ?
            ORDER BY a.data, a.horario
        `;

        const r = await db.query(sql, [id]);

        res.status(200).json(r[0]).end();

    } catch (err) {
        res.status(500).json(err).end();
    }
};

const faturamento = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
            SELECT 
                SUM(valor) AS total
            FROM agendamentos
            WHERE id_tatuador = ?
            AND MONTH(data) = MONTH(CURDATE())
            AND YEAR(data) = YEAR(CURDATE())
        `;

        const r = await db.query(sql, [id]);

        res.status(200).json({
            tatuador: id,
            faturamento: r[0][0].total || 0
        }).end();

    } catch (err) {
        res.status(500).json(err).end();
    }
};

const proximos = async (req, res) => {
    try {
        const sql = `
            SELECT 
                a.data,
                a.horario,
                a.desenho,
                a.valor,
                c.nome AS cliente,
                t.nome AS tatuador
            FROM agendamentos a
            JOIN clientes c ON a.id_cliente = c.id_cliente
            JOIN tatuadores t ON a.id_tatuador = t.id_tatuador
            WHERE a.status = 'Confirmado'
            AND a.data >= CURDATE()
            ORDER BY a.data, a.horario
        `;

        const r = await db.query(sql);

        res.status(200).json(r[0]).end();

    } catch (err) {
        res.status(500).json(err).end();
    }
};

module.exports = {
    agendar,
    listarAgendamentos,
    agendaPorTatuador,
    agendaPorCliente,
    faturamento,
    proximos
};
