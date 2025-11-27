const express = require("express");
const router = express.Router();
const agendamento = require("../controllers/agendamento.controller");


router.post("/agendamentos", agendamento.agendar);
router.get("/agendamentos", agendamento.listarAgendamentos);
router.get("/agendamentos/tatuador/:id", agendamento.agendaPorTatuador);
router.get("/agendamentos/cliente/:id", agendamento.agendaPorCliente);
router.get("/agendamentos/faturamento/:id", agendamento.faturamento);
router.get("/agendamentos/proximos", agendamento.proximos);

module.exports = router;
