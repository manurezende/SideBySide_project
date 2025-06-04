
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

## 🛠️ Tecnologias Utilizadas

**Backend:**
* **Node.js:** Ambiente de execução JavaScript.
* **Express.js:** Framework web para Node.js, para construção das APIs RESTful.
* **MySQL2:** Driver para conexão e interação com o banco de dados MySQL.
* **Multer:** Middleware para Node.js para manipulação de `multipart/form-data`, usado no upload de arquivos (fotos de perfil).
* **CORS:** Middleware para habilitar o Cross-Origin Resource Sharing.
* **Path:** Módulo nativo do Node.js para manipulação de caminhos de arquivo.
* **Dotenv:** Módulo para carregar variáveis de ambiente de um arquivo `.env`.
* **WS (WebSocket):** Biblioteca para implementação de comunicação em tempo real (chat).

**Frontend:**
* **HTML5:** Estrutura das páginas web.
* **CSS3:** Estilização e design responsivo da interface do usuário.
* **JavaScript (Vanilla JS):** Lógica interativa do lado do cliente, requisições de API (`fetch`), manipulação dinâmica do DOM, cálculo de idades.

**Banco de Dados:**
* **MySQL:** Sistema de gerenciamento de banco de dados relacional.


## 🚀 Como Rodar o Projeto (Localmente)

Siga estes passos para configurar e executar o projeto em sua máquina local:

### Pré-requisitos

* **Node.js e npm** (ou Yarn) instalados.
* **MySQL Server** instalado e rodando.
* Um cliente MySQL (ex: phpMyAdmin, MySQL Workbench, DBeaver) para gerenciar o banco de dados.

### Configuração do Banco de Dados

1.  **Crie o Banco de Dados:**
    * Acesse seu cliente MySQL.
    * Crie um novo banco de dados chamado `sidedb`.
        ```sql
        CREATE DATABASE sidedb;
        ```
2.  **Importe o Esquema:**
    * Execute o script SQL localizado em `backend/codigo_banco.sql` neste novo banco de dados `sidedb`. Este script criará as tabelas necessárias (`usuario`, `agendamento`, `endereco`, `pagamento`, `contato`, `jovem`, `idoso`, `receber`, `avaliacao`, `mensagens`).

### Configuração do Backend

1.  **Navegue até a pasta `backend` no seu terminal:**
    ```bash
    cd backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```
3.  **Crie a pasta de uploads:**
    * Na pasta `backend`, crie uma pasta chamada `uploads`. Esta pasta é onde as imagens enviadas pelos usuários serão armazenadas.
        ```bash
        mkdir uploads
        ```
4.  **Configure as variáveis de ambiente (opcional, mas recomendado):**
    * Crie um arquivo `.env` na pasta `backend` (ao lado de `package.json`).
    * Adicione a porta do servidor WebSocket, se quiser uma diferente da padrão (8080):
        ```
        PORT=8080
        ```
5.  **Inicie o servidor backend:**
    * Navegue até a **raiz da pasta `backend`** no seu terminal (onde estão `package.json` e a pasta `src`).
    * Execute o script principal:
        ```bash
        node src/index.js
        # ou, se você tiver nodemon instalado globalmente (recomendado para desenvolvimento):
        # nodemon src/index.js
        ```
    * Você verá a mensagem `Servidor online http://127.0.0.1:3000` no console.

### Configuração do Frontend

O frontend é composto por arquivos HTML, CSS e JavaScript puros, portanto, não requer um processo de build complexo.

1.  **Abra o Navegador:**
    * Após o backend estar rodando, abra seu navegador web.
    * Navegue até o arquivo `index.html` (ou a página inicial de sua escolha, como `pagina_inicial.html`) que está dentro da pasta `frontend`. Você pode abrir o arquivo diretamente (ex: `file:///caminho/para/SideBySide/frontend/index.html`) ou, para melhor simulação de um ambiente de servidor web e auto-reload durante o desenvolvimento, usar uma extensão como "Live Server" no VS Code, apontando para a pasta `frontend`.

## 🤝 Como Usar a Plataforma

1.  **Cadastro:** Jovens e idosos podem se cadastrar na plataforma, preenchendo seus dados e personalizando seus perfis.
2.  **Exploração:** Jovens podem navegar pelas necessidades dos idosos na plataforma, buscando por companheiros ou tarefas.
3.  **Conexão:** Após encontrar um idoso com necessidades compatíveis, os jovens podem iniciar a comunicação via chat em tempo real.
4.  **Encontro:** Depois de se conhecerem virtualmente, podem agendar um encontro pessoal para alinhar expectativas e iniciar a parceria.

## 📱 Telas da Aplicação (UI/UX)

A seguir, apresentamos uma visão geral das principais telas da aplicação, cobrindo o fluxo de cadastro, autenticação, páginas iniciais e perfis.

**Nota:** Todas as imagens desta seção devem estar localizadas na pasta `img/` na raiz do seu projeto.

### Fluxo de Cadastro e Autenticação

Essas telas guiam o usuário desde o registro até o acesso à plataforma.

* **`cadastro_usuario.png`**
    [![Tela de Cadastro de Usuário](./img/cadastro_usuario.png)](./img/cadastro_usuario.png)
    Interface inicial para novos usuários realizarem seu cadastro na plataforma.

* **`cadastro_usuario_preenchido.png`**
    [![Tela de Cadastro de Usuário Preenchida](./img/cadastro_usuario_preenchido.png)](./img/cadastro_usuario_preenchido.png)
    Exemplo da tela de cadastro de usuário com os campos preenchidos, pronta para envio.

* **`logar_usuario.png`**
    [![Tela de Login de Usuário](./img/logar_usuario.png)](./img/logar_usuario.png)
    Página de autenticação para usuários já cadastrados acessarem suas contas.

* **`cadastro_endereco.png`**
    [![Tela de Cadastro de Endereço](./img/cadastro_endereco.png)](./img/cadastro_endereco.png)
    Formulário dedicado à inserção de informações de endereço do usuário.

* **`cadastro_endereco2.png`**
    [![Tela de Cadastro de Endereço - Detalhes](./img/cadastro_endereco2.png)](./img/cadastro_endereco2.png)
    (Se for diferente da anterior) Uma segunda etapa ou visualização alternativa do processo de cadastro de endereço.

* **`cadastro_idoso.png`**
    ![Tela de Cadastro de Idoso](./img/cadastro_idoso.png)
    Formulário específico para o cadastro de perfis de idosos na plataforma.

* **`cadastro_idoso2.png`**
    ![Tela de Cadastro de Idoso - Etapa 2](./img/cadastro_idoso2.png)
    (Se for uma etapa) Continuação do formulário de cadastro de idosos.

* **`cadastro_idoso3.png`**
    ![Tela de Cadastro de Idoso - Etapa 3](./img/img/cadastro_idoso3.png)
    (Se for uma etapa) Etapa final ou visualização adicional do formulário de idosos.

### Telas Iniciais e Navegação

Visualizações da página principal da aplicação, mostrando diferentes layouts ou conteúdos.

* **`pagina_inicial.png`**
    [![Página Inicial](./img/pagina_inicial.png)](./img/pagina_inicial.png)
    A primeira visualização da aplicação após o login ou acesso inicial.

* **`pagina_inicial2.png`**
    [![Página Inicial - Variação 2](./img/pagina_inicial2.png)](./img/pagina_inicial2.png)
    Uma variação ou diferente estado da página inicial.

* **`pagina_inicial3.png`**
    [![Página Inicial - Variação 3](./img/pagina_inicial3.png)](./img/pagina_inicial3.png)
    Outra variação da página principal, possivelmente com diferentes elementos ou destaque.

* **`pagina_inicial4.png`**
    [![Página Inicial - Variação 4](./img/pagina_inicial4.png)](./img/pagina_inicial4.png)
    Mais uma visualização da página inicial, mostrando a evolução do design ou conteúdo.

### Perfil e Listagem

Telas dedicadas à visualização e gestão de perfis.

* **`perfil_idoso.png`**
    [![Tela de Perfil do Idoso](./img/perfil_idoso.png)](./img/perfil_idoso.png)
    Página de visualização detalhada do perfil de um idoso, exibindo suas informações e necessidades.

* **`listar_idosos.png`**
    [![Tela de Listagem de Idosos](./img/listar_idosos.png)](./img/listar_idosos.png)
    Interface que apresenta uma lista ou carrossel de idosos disponíveis para interação.

* **`editar_perfil.png`**
    [![Tela de Edição de Perfil](./img/editar_perfil.png)](./img/editar_perfil.png)
    Formulário para o usuário realizar alterações em seu próprio perfil cadastrado.

### Outras Telas Úteis

Telas que apoiam funcionalidades específicas da plataforma.

* **`pagina_msg.png`**
    [![Página de Mensagens](./img/pagina_msg.png)](./img/pagina_msg.png)
    Interface de chat ou sistema de mensagens para comunicação entre usuários.

* **`pagina_salvo.png`**
    [![Página de Sucesso/Salvo](./img/pagina_salvo.png)](./img/pagina_salvo.png)
    Uma tela de confirmação, geralmente exibida após uma ação bem-sucedida (ex: cadastro, edição).

## 📘 Modelo Conceitual

A imagem abaixo representa o modelo conceitual do banco de dados, mostrando as entidades, atributos e seus relacionamentos principais, abstraindo detalhes de implementação.

![Modelo Conceitual](./imagens/modelo-conceitual.png)

## 🔍 Modelo Lógico

O modelo lógico é a evolução do modelo conceitual, com as entidades estruturadas em tabelas, campos, tipos de dados e relacionamentos definidos para implementação no banco de dados, sem considerar o SGBD específico.

![Modelo Lógico](./imagens/modelo-logico.png)

## 🔄 Normalizações

Abaixo estão as etapas de normalização do banco de dados, aplicadas para garantir integridade, evitar redundância e melhorar a organização dos dados, seguindo as Formas Normais.

### 🔹 Normalização 1 (1FN)

![Normalização 1](./imagens/normalizacao1.png)

### 🔹 Normalização 2 (2FN)

![Normalização 2](./imagens/normalizacao2.png)

### 🔹 Normalização 3 (3FN)

![Normalização 3](./imagens/normalizacao3.png)

### 🔹 Normalização 4 (4FN)

![Normalização 4](./imagens/normalizacao4.png)

## 🧱 Modelo Físico (SQL)

Abaixo está o script SQL com a criação completa das tabelas e relacionamentos. Esse código pode ser executado diretamente em um SGBD como MySQL para configurar o banco de dados.

```sql
create database sidedb;
use sidedb;
CREATE TABLE usuario ( 
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(50) NOT NULL,
nome_completo VARCHAR(80) NOT NULL,
nome_usuario VARCHAR(25) NOT NULL,
senha VARCHAR(255) NOT NULL,
tipo_usuario BOOLEAN NOT NULL);
 
 

 
CREATE TABLE endereco ( 
id_endereco INT AUTO_INCREMENT PRIMARY KEY,
logradouro VARCHAR(20) NOT NULL,
logradouro_nome VARCHAR(50) NOT NULL,
numero VARCHAR(5) NOT NULL,
complemento VARCHAR(20),
cidade VARCHAR(30) NOT NULL,
estado VARCHAR(20) NOT NULL,
bairro VARCHAR(30) NOT NULL,
cep VARCHAR(9) NOT NULL,
pais VARCHAR(20) NOT NULL DEFAULT 'Brasil' );



CREATE TABLE jovem (
id_jovem INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_endereco INT NOT NULL,
cpf_jovem VARCHAR(14) UNIQUE NOT NULL,
valor_jovem varchar(20),
foto_jovem varchar(255),
assinante_jovem BOOLEAN NOT NULL,
data_nascimento_jovem DATE NOT NULL,
experiencia_jovem TEXT,
descricao_jovem VARCHAR(150) NOT NULL,
telefone_jovem VARCHAR(14) UNIQUE NOT NULL,
genero_jovem BOOLEAN NOT NULL);


CREATE TABLE idoso (
id_idoso INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_endereco INT NOT NULL,
foto_idoso varchar(255),
assinante_idoso BOOLEAN NOT NULL,
cpf VARCHAR(14) UNIQUE NOT NULL,
data_nascimento DATE NOT NULL,
comorbidade BOOLEAN NOT NULL,
tipo_comorbidade VARCHAR(50),
descricao VARCHAR(150) NOT NULL,
telefone_idoso VARCHAR(14) UNIQUE NOT NULL,
genero BOOLEAN NOT NULL);

CREATE TABLE avaliacao (
id_avaliacao int auto_increment primary key,
id_agendamento int,
nota decimal (3,2) not null,
avaliacao varchar(150) not null
);


CREATE TABLE mensagens (
    id_messagem INT AUTO_INCREMENT PRIMARY KEY,
    id_remetente INT NOT NULL,        -- -> id da tabela 'usuario'
    id_destinatario INT NOT NULL,     -- -> id da tabela 'usuario'
    conteudo TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_remetente) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_destinatario) REFERENCES usuario(id_usuario)
);




-- relacionar a tabela jovem com a tabela usuario
ALTER TABLE jovem
ADD CONSTRAINT `fk_jovem_pk_usuario` 
FOREIGN KEY jovem(`id_usuario`)
REFERENCES usuario(`id_usuario`);
 
-- relacionar a tabela jovem com a tabela endereco
ALTER TABLE jovem
ADD CONSTRAINT `fk_jovem_pk_endereco` 
FOREIGN KEY jovem(`id_endereco`)
REFERENCES endereco(`id_endereco`);
-- relacionar a tabela idoso com a tabela usuario
ALTER TABLE idoso
ADD CONSTRAINT `fk_idoso_pk_usuario` 
FOREIGN KEY idoso(`id_usuario`)
REFERENCES usuario(`id_usuario`);
-- relacionar a tabela idoso com a tabela endereço .
ALTER TABLE idoso
ADD CONSTRAINT `fk_idoso_pk_endereco` 
FOREIGN KEY idoso(`id_endereco`)
REFERENCES endereco(`id_endereco`);

-- relacionar a tabela avaliação com a tabela agendamento
ALTER TABLE avaliacao
ADD CONSTRAINT `fk_avalicao_pk_agendamento` 
FOREIGN KEY avaliacao(`id_agendamento`)
REFERENCES agendamento(`id_agendamento`);
```

📞 Contato
 Nome/GitHub: [SEU NOME OU LINK DO GITHUB AQUI]
Email: [SEU EMAIL AQUI]

