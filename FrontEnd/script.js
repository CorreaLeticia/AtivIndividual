
function showTab(tabId) {
    document.querySelectorAll(".content-section").forEach(sec => sec.style.display = "none");
    document.getElementById(tabId).style.display = "block";
}

let agendamentos = []; 

const formAgendamento = document.getElementById("form-agendamento");
const listaAgendamentos = document.getElementById("lista-agendamentos");

formAgendamento.addEventListener("submit", (e) => {
    e.preventDefault();

    const cliente = document.getElementById("cliente").value.trim();
    const tatuador = document.getElementById("tatuador").value.trim();
    const dataHora = document.getElementById("data-hora").value;
    const valor = Number(document.getElementById("valor").value);

    const novo = { cliente, tatuador, dataHora, valor };
    agendamentos.push(novo);

    renderAgendamentos();
    formAgendamento.reset();
});

function renderAgendamentos() {
    listaAgendamentos.innerHTML = "";

    agendamentos.forEach((ag) => {
        const div = document.createElement("div");
        div.classList.add("agendamento-item");
        div.innerHTML = `
            <p><strong>Cliente:</strong> ${ag.cliente}</p>
            <p><strong>Tatuador:</strong> ${ag.tatuador}</p>
            <p><strong>Data:</strong> ${new Date(ag.dataHora).toLocaleString()}</p>
            <p><strong>Valor:</strong> R$ ${ag.valor.toFixed(2)}</p>
            <hr>
        `;
        listaAgendamentos.appendChild(div);
    });
}

document.getElementById("calcular-faturamento").addEventListener("click", () => {
    const nome = document.getElementById("tatuador-faturamento").value.trim();
    const resultado = document.getElementById("faturamento-resultado");

    if (!nome) {
        resultado.innerHTML = "<p>Digite o nome de um tatuador.</p>";
        return;
    }

    const total = agendamentos
        .filter(a => a.tatuador.toLowerCase() === nome.toLowerCase())
        .reduce((soma, item) => soma + item.valor, 0);

    if (total === 0) {
        resultado.innerHTML = `<p>Nenhum agendamento encontrado para ${nome}.</p>`;
    } else {
        resultado.innerHTML = `<h3>Total faturado por ${nome}: R$ ${total.toFixed(2)}</h3>`;
    }
});

const relatorioConteudo = document.getElementById("relatorio-conteudo");

document.getElementById("agenda-tatuador-btn").addEventListener("click", () => {
    const nome = prompt("Digite o nome do tatuador:");
    if (!nome) return;

    const lista = agendamentos.filter(a =>
        a.tatuador.toLowerCase() === nome.toLowerCase()
    );

    if (lista.length === 0) {
        relatorioConteudo.innerHTML = `<p>Nenhum agendamento encontrado para ${nome}.</p>`;
        return;
    }

    renderListaRelatorio(lista, `Agenda do tatuador: ${nome}`);
});

document.getElementById("agendamentos-cliente-btn").addEventListener("click", () => {
    const nome = prompt("Digite o nome do cliente:");
    if (!nome) return;

    const lista = agendamentos.filter(a =>
        a.cliente.toLowerCase() === nome.toLowerCase()
    );

    if (lista.length === 0) {
        relatorioConteudo.innerHTML = `<p>Nenhum agendamento encontrado para cliente ${nome}.</p>`;
        return;
    }

    renderListaRelatorio(lista, `Agendamentos do cliente: ${nome}`);
});

document.getElementById("proximos-agendamentos-btn").addEventListener("click", () => {
    const agora = new Date();

    const lista = agendamentos.filter(a => new Date(a.dataHora) > agora);

    if (lista.length === 0) {
        relatorioConteudo.innerHTML = `<p>Não há próximos agendamentos.</p>`;
        return;
    }

    renderListaRelatorio(lista, "Próximos agendamentos");
});

function renderListaRelatorio(lista, titulo) {
    relatorioConteudo.innerHTML = `<h3>${titulo}</h3>`;

    lista.forEach(ag => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>Cliente:</strong> ${ag.cliente}</p>
            <p><strong>Tatuador:</strong> ${ag.tatuador}</p>
            <p><strong>Data:</strong> ${new Date(ag.dataHora).toLocaleString()}</p>
            <p><strong>Valor:</strong> R$ ${ag.valor.toFixed(2)}</p>
            <hr>
        `;
        relatorioConteudo.appendChild(div);
    });
}
