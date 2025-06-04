// Este código deve ser colocado dentro da tag <script> no seu HTML,
// preferencialmente no final do <body>, logo antes da tag de fechamento </body>.

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos elementos dos formulários ---
    const formUsuario = document.getElementById('formUsuario');
    const formJovem = document.getElementById('formJovem');
    const formEndereco = document.getElementById('formEndereco');

    // Campos do Usuário
    const inputNomeCompleto = document.getElementById('nome_completo');
    const inputNomeUsuario = document.getElementById('nome_usuario');
    const inputEmail = document.getElementById('email');
    const inputSenhaAtual = document.getElementById('senha_atual');
    const inputNovaSenha = document.getElementById('nova_senha');

    // Campos do Jovem
    const inputCpf = document.getElementById('cpf');
    const inputDataNascimento = document.getElementById('data_nascimento');
    const inputTelefone = document.getElementById('telefone');
    const selectGenero = document.getElementById('genero');
    const textareaExperiencia = document.getElementById('experiencia');
    const textareaDescricao = document.getElementById('descricao');
    const inputValorHora = document.getElementById('valor_hora');
    const imgPerfilJovem = document.getElementById('imgPerfilJovem');
    const btnTrocarFoto = document.getElementById('btnTrocarFoto');

    // Campos do Endereço
    const inputLogradouro = document.getElementById('logradouro');
    const inputLogradouroNome = document.getElementById('logradouro_nome');
    const inputNumero = document.getElementById('numero');
    const inputBairro = document.getElementById('bairro');
    const inputComplemento = document.getElementById('complemento');
    const inputCidade = document.getElementById('cidade');
    const inputEstado = document.getElementById('estado');
    const inputCep = document.getElementById('cep');

    const API_BASE_URL = 'http://127.0.0.1:3000'; // URL base do seu back-end

    // --- Variáveis para armazenar os IDs do jovem, usuário e endereço ---
    let idJovemGlobal = null;
    let idUsuarioGlobal = null;
    let idEnderecoGlobal = null;

    // --- Função para simular um ID de usuário logado (PARA TESTE APENAS!) ---
    // EM PRODUÇÃO: Este ID deve vir da sua lógica de autenticação segura (sessão, token, etc.).
    function getSimulatedUserId() {
        let userId = localStorage.getItem('simulated_user_id');
        if (!userId) {
            userId = 1; // SUBSTITUA POR UM ID DE USUÁRIO EXISTENTE NO SEU DB PARA TESTAR!
            localStorage.setItem('simulated_user_id', userId);
        }
        return userId;
    }
    const currentUserId = getSimulatedUserId(); // Pega o ID do usuário simulado

    // --- Função para carregar os dados e pré-preencher todos os formulários ---
    async function carregarDadosCompletos() {
        if (!currentUserId) {
            alert('ID do usuário não encontrado. Não é possível carregar o perfil.');
            window.location.href = './pagina_de_login.html'; // Exemplo de redirecionamento
            return;
        }

        try {
            // Buscamos o jovem associado ao id_usuario (PODE REQUERER NOVA ROTA NO BACKEND)
            const responseJovem = await fetch(`${API_BASE_URL}/jovem/listar`);
            if (!responseJovem.ok) {
                throw new Error(`Erro ao buscar dados do jovem: ${responseJovem.statusText}`);
            }
            const dataJovem = await responseJovem.json();

            let jovemEncontrado = null;
            if (dataJovem.msg && Array.isArray(dataJovem.msg)) {
                jovemEncontrado = dataJovem.msg.find(jovem => jovem.id_usuario == currentUserId);
            }

            if (!jovemEncontrado) {
                alert('Perfil de jovem não encontrado para este usuário.');
                return;
            }

            // Armazena os IDs para uso posterior
            idJovemGlobal = jovemEncontrado.id_jovem;
            idUsuarioGlobal = jovemEncontrado.id_usuario;
            idEnderecoGlobal = jovemEncontrado.id_endereco;

            // Carregar dados do USUÁRIO
            const responseUsuario = await fetch(`${API_BASE_URL}/usuario/listar`);
            if (!responseUsuario.ok) {
                throw new Error(`Erro ao buscar dados do usuário: ${responseUsuario.statusText}`);
            }
            const dataUsuario = await responseUsuario.json();
            let usuarioEncontrado = null;
            if (dataUsuario.msg && Array.isArray(dataUsuario.msg)) {
                usuarioEncontrado = dataUsuario.msg.find(user => user.id_usuario == idUsuarioGlobal);
            }

            // Carregar dados do ENDEREÇO
            const responseEndereco = await fetch(`${API_BASE_URL}/endereco/listar`);
            if (!responseEndereco.ok) {
                throw new Error(`Erro ao buscar dados do endereço: ${responseEndereco.statusText}`);
            }
            const dataEndereco = await responseEndereco.json();
            let enderecoEncontrado = null;
            if (dataEndereco.msg && Array.isArray(dataEndereco.msg)) {
                enderecoEncontrado = dataEndereco.msg.find(end => end.id_endereco == idEnderecoGlobal);
            }

            if (!usuarioEncontrado || !enderecoEncontrado) {
                alert('Dados completos do perfil não encontrados. Pode haver inconsistência.');
                return;
            }

            // --- Pré-preencher o formulário de USUÁRIO ---
            inputNomeCompleto.value = usuarioEncontrado.nome_completo || '';
            inputNomeUsuario.value = usuarioEncontrado.nome_usuario || '';
            inputEmail.value = usuarioEncontrado.email || '';
            // Senha não é pré-preenchida

            // --- Pré-preencher o formulário de JOVEM ---
            inputCpf.value = jovemEncontrado.cpf_jovem || '';
            inputDataNascimento.value = jovemEncontrado.data_nascimento_jovem ? new Date(jovemEncontrado.data_nascimento_jovem).toISOString().split('T')[0] : '';
            inputTelefone.value = jovemEncontrado.telefone_jovem || '';
            selectGenero.value = jovemEncontrado.genero_jovem !== null ? jovemEncontrado.genero_jovem.toString() : '';
            textareaExperiencia.value = jovemEncontrado.experiencia_jovem || '';
            textareaDescricao.value = jovemEncontrado.descricao_jovem || '';
            inputValorHora.value = jovemEncontrado.valor_jovem || '';

            // Atualizar foto de perfil
            if (jovemEncontrado.foto_jovem) {
                imgPerfilJovem.src = `${API_BASE_URL}${jovemEncontrado.foto_jovem}`;
            } else {
                imgPerfilJovem.src = './img/j.jpg'; // Imagem padrão
            }

            // --- Pré-preencher o formulário de ENDEREÇO ---
            inputLogradouro.value = enderecoEncontrado.logradouro || '';
            inputLogradouroNome.value = enderecoEncontrado.logradouro_nome || '';
            inputNumero.value = enderecoEncontrado.numero || '';
            inputBairro.value = enderecoEncontrado.bairro || '';
            inputComplemento.value = enderecoEncontrado.complemento || '';
            inputCidade.value = enderecoEncontrado.cidade || '';
            inputEstado.value = enderecoEncontrado.estado || '';
            inputCep.value = enderecoEncontrado.cep || '';

        } catch (error) {
            console.error("Erro ao carregar dados do perfil:", error);
            alert("Erro ao carregar seu perfil. Tente novamente mais tarde.");
        }
    }

    // --- Lógica para o envio do Formulário de Usuário ---
    formUsuario.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!idUsuarioGlobal) {
            alert('ID de usuário não identificado para atualização.');
            return;
        }

        const dadosUsuario = {
            nome_completo: inputNomeCompleto.value,
            nome_usuario: inputNomeUsuario.value,
            email: inputEmail.value,
        };

        // Lógica de senha (precisa de verificação no back-end!)
        const senhaAtual = inputSenhaAtual.value;
        const novaSenha = inputNovaSenha.value;

        if (novaSenha) {
            if (!senhaAtual) {
                alert('Para definir uma nova senha, por favor, insira sua senha atual.');
                return;
            }
            // Aqui você enviaria a senha atual e a nova senha para o backend
            // para que ele possa verificar a senha atual antes de atualizar.
            // Para simplicidade, estamos enviando a nova senha diretamente.
            // O BACK-END DEVE VALIDAR A SENHA ATUAL E HASH A NOVA SENHA.
            dadosUsuario.senha = novaSenha;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/usuario/atualizar/${idUsuarioGlobal}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosUsuario)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ao atualizar dados da conta: ${errorData.erro || response.statusText}`);
            }

            alert('Dados da conta atualizados com sucesso!');
            inputSenhaAtual.value = ''; // Limpa os campos de senha após sucesso
            inputNovaSenha.value = '';
            carregarDadosCompletos(); // Recarrega para garantir dados atualizados
        } catch (error) {
            console.error("Erro ao atualizar dados da conta:", error);
            alert(`Erro ao atualizar dados da conta: ${error.message}.`);
        }
    });

    // --- Lógica para o envio do Formulário de Jovem ---
    formJovem.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!idJovemGlobal) {
            alert('ID do jovem não identificado para atualização.');
            return;
        }

        const dadosJovem = {
            cpf_jovem: inputCpf.value,
            data_nascimento_jovem: inputDataNascimento.value,
            telefone_jovem: inputTelefone.value,
            genero_jovem: parseInt(selectGenero.value),
            experiencia_jovem: textareaExperiencia.value,
            descricao_jovem: textareaDescricao.value,
            valor_jovem: parseFloat(inputValorHora.value),
        };

        try {
            const response = await fetch(`${API_BASE_URL}/jovem/atualizar/${idJovemGlobal}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosJovem)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ao atualizar dados pessoais: ${errorData.erro || response.statusText}`);
            }

            alert('Dados pessoais atualizados com sucesso!');
            carregarDadosCompletos();
        } catch (error) {
            console.error("Erro ao atualizar dados pessoais:", error);
            alert(`Erro ao atualizar dados pessoais: ${error.message}.`);
        }
    });

    // --- Lógica para o envio do Formulário de Endereço ---
    formEndereco.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!idEnderecoGlobal) {
            alert('ID do endereço não identificado para atualização.');
            return;
        }

        const dadosEndereco = {
            logradouro: inputLogradouro.value,
            logradouro_nome: inputLogradouroNome.value,
            numero: inputNumero.value,
            bairro: inputBairro.value,
            complemento: inputComplemento.value,
            cidade: inputCidade.value,
            estado: inputEstado.value,
            cep: inputCep.value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/endereco/atualizar/${idEnderecoGlobal}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosEndereco)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ao atualizar endereço: ${errorData.erro || response.statusText}`);
            }

            alert('Endereço atualizado com sucesso!');
            carregarDadosCompletos();
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            alert(`Erro ao atualizar endereço: ${error.message}.`);
        }
    });

    // --- Lógica para o botão "Trocar Foto" (exemplo básico, requer rota no backend) ---
    btnTrocarFoto.addEventListener('click', () => {
        alert('Funcionalidade de trocar foto em desenvolvimento! Precisaria de uma rota específica para upload.');
        // Para implementar:
        // 1. Criar um input invisível do tipo file.
        // 2. Acioná-lo com um clique programático.
        // 3. Ao selecionar o arquivo, criar um FormData e enviar para uma rota de upload de foto no backend.
        // 4. Atualizar o src da imagem de perfil após o sucesso do upload.
    });


    // --- Lógica do Dropdown do Header (já existente) ---
    function toggleDropdown() {
        const menu = document.getElementById("dropdown");
        menu.classList.toggle("active");
    }

    window.onclick = function(e) {
        if (!e.target.matches('.avatar')) {
            const dropdown = document.getElementById("dropdown");
            dropdown.classList.remove("active");
        }
    }

    window.toggleDropdown = toggleDropdown; // Torna a função acessível globalmente

    // --- Carrega todos os dados ao iniciar a página ---
    carregarDadosCompletos();
});