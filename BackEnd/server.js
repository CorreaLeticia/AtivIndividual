require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const clienteRoutes = require('./routes/cliente.routes');
const tatuadorRoutes = require('./routes/tatuador.routes');
const agendamentoRoutes = require('./routes/agendamento.routes');

app.use(express.json());
app.use(cors());

app.use("/clientes", clienteRoutes);
app.use("/tatuadores", tatuadorRoutes);
app.use("/agendamentos", agendamentoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` Servidor rodando na porta ${port}`));

