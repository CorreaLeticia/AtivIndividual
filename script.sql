
CREATE DATABASE IF NOT EXISTS estudio_tatuagem;
USE estudio_tatuagem;

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE tatuadores (
    id_tatuador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE agendamentos (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_tatuador INT NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    desenho VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Confirmado',

    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_tatuador) REFERENCES tatuadores(id_tatuador)
);

INSERT INTO clientes (nome, telefone, email) VALUES
('Letícia Souza', '11999999999', 'leticia@gmail.com'),
('João Martins', '11988888888', 'joao@gmail.com');

INSERT INTO tatuadores (nome, especialidade, telefone) VALUES
('Carlos Ribeiro', 'Realismo', '11977777777'),
('Ana Lima', 'Minimalista', '11966666666');

INSERT INTO agendamentos (id_cliente, id_tatuador, data, horario, desenho, valor, status) VALUES
(1, 1, '2025-11-20', '14:00:00', 'Rosa vermelha no braço', 350.00, 'Confirmado'),
(2, 2, '2025-11-22', '16:00:00', 'Símbolo infinito', 250.00, 'Concluido'),
(1, 2, '2025-12-05', '10:30:00', 'Borboleta colorida', 400.00, 'Confirmado');
