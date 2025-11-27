const db = require("../data/connection");

const addTatuador = async (req, res) => {
    const { nome, especialidade, telefone } = req.body;

    try {
        const r = await db.query(
            "INSERT INTO tatuadores (nome, especialidade, telefone) VALUES (?, ?, ?)",
            [nome, especialidade, telefone]
        );

        const novo = {
            id_tatuador: r[0].insertId,
            nome,
            especialidade,
            telefone
        };

        res.status(201).json(novo).end();
    } catch (err) {
        res.status(500).json(err).end();
    }
};


const listarTatuadores = async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM tatuadores");
        res.status(200).json(r[0]).end();
    } catch (err) {
        res.status(500).json(err).end();
    }
};

module.exports = {
    addTatuador,
    listarTatuadores
};
