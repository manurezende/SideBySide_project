
# Side By Side

## 🧠 Estudo de Caso

O projeto **Side By Side** nasceu com o objetivo de promover impacto social, unindo gerações e resolvendo dois grandes desafios enfrentados por grupos diferentes:

### O Problema

- **Idosos:** Enfrentam dificuldade para realizar tarefas simples do dia a dia, como ir ao mercado, consultas médicas ou simplesmente ter alguém com quem conversar.
- **Jovens:** Estudantes em busca de uma renda extra enfrentam limitações de tempo e oportunidades que se encaixem na sua rotina de estudos.

### A Solução

A proposta da plataforma é **conectar jovens dispostos a ajudar com idosos que precisam de companhia ou auxílio em tarefas básicas**, promovendo uma relação de apoio mútuo e benefícios para ambas as partes.

### Modelo de Negócio

1. **Comissão por serviço:** A cada hora trabalhada, a plataforma retém uma pequena taxa administrativa.
2. **Parcerias com instituições:** Clínicas, hospitais e ONGs podem patrocinar ou divulgar a plataforma, fortalecendo seu impacto social.

A plataforma não é apenas um intermediador de serviços, mas um elo que promove inclusão, empatia e valorização social entre gerações.

---

## 📘 Modelo Conceitual

A imagem abaixo representa o modelo conceitual do banco de dados, mostrando as entidades, atributos e seus relacionamentos principais.

![Modelo Conceitual](./imagens/modelo-conceitual.png)

---

## 🔍 Modelo Lógico

O modelo lógico é a evolução do modelo conceitual, com as entidades estruturadas em tabelas, campos, tipos de dados e relacionamentos definidos para implementação no banco de dados.

![Modelo Lógico](./imagens/modelo-logico.png)

---

## 🔄 Normalizações

Abaixo estão as etapas de normalização do banco de dados, aplicadas para garantir integridade, evitar redundância e melhorar a organização dos dados:

### 🔹 Normalização 1

![Normalização 1](./imagens/normalizacao1.png)

### 🔹 Normalização 2

![Normalização 2](./imagens/normalizacao2.png)

### 🔹 Normalização 3

![Normalização 3](./imagens/normalizacao3.png)

### 🔹 Normalização 4

![Normalização 4](./imagens/normalizacao4.png)

---

## 🧱 Modelo Físico (SQL)

Abaixo está o script SQL com a criação completa das tabelas e relacionamentos. Esse código pode ser executado diretamente em um SGBD como MySQL:

```sql
CREATE DATABASE sidedb;
USE sidedb;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    tipo_usuario BOOLEAN NOT NULL,
    nome_usuario VARCHAR(25) NOT NULL,
    senha VARCHAR(15) NOT NULL,
    foto_usuario VARCHAR(50) NOT NULL
);

CREATE TABLE agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_jovem INT NOT NULL,
    id_idoso INT NOT NULL,
    data_hora DATETIME NOT NULL,
    duracao INT NOT NULL,
    valor INT,
    confirmar_idoso BOOLEAN NOT NULL,
    confirmar_jovem BOOLEAN NOT NULL
);

CREATE TABLE endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro ENUM('Rua', 'Avenida', 'Alameda', 'Travessa', 'Praça', 'Estrada', 'Rodovia', 'Viela') NOT NULL,
    logradouro_nome VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(20),
    cidade VARCHAR(30) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    pais VARCHAR(20) NOT NULL DEFAULT 'Brasil'
);

CREATE TABLE pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE contato (
    id_contato INT AUTO_INCREMENT PRIMARY KEY,
    telefone_celular VARCHAR(15) NOT NULL,
    telefone_fixo VARCHAR(15),
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE jovem (
    id_jovem INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_endereco INT NOT NULL,
    id_contato INT NOT NULL,
    nome VARCHAR(60) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    experiencia TEXT,
    chave_pix VARCHAR(50),
    descricao VARCHAR(150) NOT NULL,
    genero VARCHAR(15) NOT NULL
);

CREATE TABLE idoso (
    id_idoso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_endereco INT NOT NULL,
    id_contato INT NOT NULL,
    nome VARCHAR(60) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    comorbidade BOOLEAN NOT NULL,
    tipo_comorbidade VARCHAR(50),
    descricao VARCHAR(150) NOT NULL,
    genero VARCHAR(15) NOT NULL
);

CREATE TABLE receber (
    id_receber INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    trabalho_realizado BOOLEAN NOT NULL
);

CREATE TABLE avaliacao (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT,
    nota DECIMAL(3,2) NOT NULL,
    avaliacao VARCHAR(150) NOT NULL
);

ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_jovem FOREIGN KEY (id_jovem) REFERENCES jovem(id_jovem);
ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_idoso FOREIGN KEY (id_idoso) REFERENCES idoso(id_idoso);
ALTER TABLE pagamento ADD CONSTRAINT fk_pagamento_agendamento FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento);
ALTER TABLE jovem ADD CONSTRAINT fk_jovem_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
                   ADD CONSTRAINT fk_jovem_contato FOREIGN KEY (id_contato) REFERENCES contato(id_contato),
                   ADD CONSTRAINT fk_jovem_endereco FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco);
ALTER TABLE idoso ADD CONSTRAINT fk_idoso_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
                   ADD CONSTRAINT fk_idoso_endereco FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco),
                   ADD CONSTRAINT fk_idoso_contato FOREIGN KEY (id_contato) REFERENCES contato(id_contato);
ALTER TABLE receber ADD CONSTRAINT fk_receber_agendamento FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento);
ALTER TABLE avaliacao ADD CONSTRAINT fk_avaliacao_agendamento FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento);
```

---

## 🔗 Modelo de Entidade Relacional

O modelo de entidade relacional é a visualização gráfica mais próxima do banco de dados real, com todas as tabelas, campos, chaves primárias e estrangeiras definidas.

![Modelo de Entidade Relacional](./imagens/modelo-entidade-relacional.png)

---

## ✅ Finalização

Esse documento reúne todas as etapas da construção do projeto **Side By Side**, desde a análise do problema até a modelagem física do banco de dados. Agora é só adicionar suas imagens nas pastas corretas e aproveitar!
