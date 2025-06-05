// js/editar_jovem.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos elementos dos formulários ---
    const formUsuario = document.getElementById('formUsuario');
    const formJovem = document.getElementById('formJovem'); // Este é o formulário de dados pessoais do jovem
    const formEndereco = document.getElementById('formEndereco');

    // Campos do Usuário (seção "Dados da Conta")
    const inputNomeCompleto = document.getElementById('nome_completo');
    const inputNomeUsuario = document.getElementById('nome_usuario');
    const inputEmail = document.getElementById('email');
    // Você pode adicionar inputs para senha aqui se for permitir a alteração na mesma tela:
    // const inputSenhaAtual = document.getElementById('senha_atual');
    // const inputNovaSenha = document.getElementById('nova_senha');

    // Campos do Jovem (seção "Dados Pessoais do Jovem")
    const inputCpf = document.getElementById('cpf');
    const inputDataNascimento = document.getElementById('data_nascimento');
    const inputTelefone = document.getElementById('telefone');
    const selectGenero = document.getElementById('genero');
    const textareaExperiencia = document.getElementById('experiencia'); // Seu HTML de edição tem 'experiencia'
    const textareaDescricao = document.getElementById('descricao');
    const inputValorHora = document.getElementById('valor_hora');
    const imgPerfilJovem = document.getElementById('imgPerfilJovem'); // A fotona
    const inputFotoJovem = document.getElementById('foto_perfil'); // ID do input type="file" no HTML de edição do jovem

    // Campos do Endereço (seção "Endereço")
    const inputLogradouro = document.getElementById('logradouro');
    const inputLogradouroNome = document.getElementById('logradouro_nome');
    const inputNumero = document.getElementById('numero');
    const inputBairro = document.getElementById('bairro');
    const inputComplemento = document.getElementById('complemento');
    const inputCidade = document.getElementById('cidade');
    const inputEstado = document.getElementById('estado');
    const inputCep = document.getElementById('cep');

    const API_BASE_URL = 'http://127.0.0.1:3000';

    // --- Variáveis para armazenar os IDs do jovem, usuário e endereço (carregados da API) ---
    let idJovemGlobal = null;
    let idUsuarioGlobal = null;
    let idEnderecoGlobal = null;

    // --- Função para obter o ID do usuário logado do localStorage ---
    function getLoggedUserId() {
        const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
        if (usuarioLogadoJSON) {
            const usuarioLogado = JSON.parse(usuarioLogadoJSON);
            // Certifique-se que você está salvando o id_usuario no localStorage durante o login/cadastro
            return usuarioLogado.id_usuario;
        }
        return null;
    }
    const currentUserId = getLoggedUserId();

    // --- Função para carregar os dados e pré-preencher todos os formulários ---
    async function carregarDadosCompletos() {
        if (!currentUserId) {
            alert('ID do usuário não encontrado. Por favor, faça login novamente.');
            window.location.href = './index.html'; // Redireciona para a página inicial/login
            return;
        }

        try {
            // Nova rota GET para buscar perfil completo do jovem
            const response = await fetch(`${API_BASE_URL}/jovem/perfil_completo/${currentUserId}`);

            if (!response.ok) {
                // Se a resposta não for OK, pode ser que o perfil não exista, ou erro no servidor
                const errorData = await response.json();
                throw new Error(errorData.msg || `Erro ao buscar perfil: ${response.statusText}`);
            }

            const data = await response.json();
            const perfilCompleto = data.payload;

            if (!perfilCompleto) {
                alert('Dados completos do perfil não encontrados. Pode haver inconsistência.');
                return;
            }

            // Armazena os IDs para uso posterior nas atualizações
            idJovemGlobal = perfilCompleto.id_jovem;
            idUsuarioGlobal = perfilCompleto.id_usuario;
            idEnderecoGlobal = perfilCompleto.id_endereco;

            // --- Pré-preencher o formulário de USUÁRIO ---
            inputNomeCompleto.value = perfilCompleto.nome_completo || '';
            inputNomeUsuario.value = perfilCompleto.nome_usuario || '';
            inputEmail.value = perfilCompleto.email || '';

            // --- Pré-preencher o formulário de JOVEM ---
            inputCpf.value = perfilCompleto.cpf_jovem || '';
            // Formatar data para YYYY-MM-DD para input type="date"
            inputDataNascimento.value = perfilCompleto.data_nascimento_jovem ? new Date(perfilCompleto.data_nascimento_jovem).toISOString().split('T')[0] : '';
            inputTelefone.value = perfilCompleto.telefone_jovem || '';
            // Gênero: 1 para masculino, 0 para feminino. Certifique-se que o select tem essas options.
            selectGenero.value = perfilCompleto.genero_jovem !== null ? perfilCompleto.genero_jovem.toString() : '';
            textareaExperiencia.value = perfilCompleto.experiencia_jovem || '';
            textareaDescricao.value = perfilCompleto.descricao_jovem || '';
            inputValorHora.value = perfilCompleto.valor_jovem || ''; // Valor por hora pode ser string ou number, dependendo do seu DB

            // Atualizar foto de perfil na "fotona"
            if (perfilCompleto.foto_jovem) {
                imgPerfilJovem.src = `${API_BASE_URL}${perfilCompleto.foto_jovem}`;
            } else {
                imgPerfilJovem.src = './img/fotos.jpg'; // Imagem padrão
            }

            // --- Pré-preencher o formulário de ENDEREÇO ---
            inputLogradouro.value = perfilCompleto.logradouro || '';
            inputLogradouroNome.value = perfilCompleto.logradouro_nome || '';
            inputNumero.value = perfilCompleto.numero || '';
            inputBairro.value = perfilCompleto.bairro || '';
            inputComplemento.value = perfilCompleto.complemento || '';
            inputCidade.value = perfilCompleto.cidade || '';
            inputEstado.value = perfilCompleto.estado || '';
            inputCep.value = perfilCompleto.cep || '';

        } catch (error) {
            console.error("Erro ao carregar dados do perfil:", error);
            alert(`Erro ao carregar seu perfil: ${error.message}. Tente novamente mais tarde.`);
        }
    }

    // --- Lógica para o envio do Formulário de Usuário ---
    // (Este código permanece o mesmo que discutimos para atualização de dados da conta)
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
            // Adicione campos de senha se houver
            // senha_atual: inputSenhaAtual ? inputSenhaAtual.value : '',
            // nova_senha: inputNovaSenha ? inputNovaSenha.value : ''
        };

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
            // Opcional: Limpar campos de senha
            // if (inputSenhaAtual) inputSenhaAtual.value = '';
            // if (inputNovaSenha) inputNovaSenha.value = '';
            
            // Atualizar nome_completo no localStorage se foi alterado
            const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
            if (usuarioLogado && usuarioLogado.nome_completo !== dadosUsuario.nome_completo) {
                usuarioLogado.nome_completo = dadosUsuario.nome_completo;
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            }

            carregarDadosCompletos(); // Recarrega para garantir dados atualizados
        } catch (error) {
            console.error("Erro ao atualizar dados da conta:", error);
            alert(`Erro ao atualizar dados da conta: ${error.message}.`);
        }
    });

    // --- Lógica para o envio do Formulário de Jovem (Dados Pessoais + FOTO) ---
    // Você precisa adicionar a rota de PUT no seu backend para `/jovem/atualizar/:id_jovem`
    formJovem.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!idJovemGlobal) {
            alert('ID do jovem não identificado para atualização.');
            return;
        }

        const formData = new FormData();

        // Adicione todos os campos do formulário de jovem ao FormData
        formData.append('cpf_jovem', inputCpf.value);
        formData.append('data_nascimento_jovem', inputDataNascimento.value);
        formData.append('telefone_jovem', inputTelefone.value);
        formData.append('genero_jovem', selectGenero.value); // Já é 1 ou 0
        formData.append('experiencia_jovem', textareaExperiencia.value);
        formData.append('descricao_jovem', textareaDescricao.value);
        formData.append('valor_jovem', inputValorHora.value);

        // Se uma nova foto foi selecionada, adicione-a ao FormData
        if (inputFotoJovem && inputFotoJovem.files.length > 0) {
            formData.append('foto_jovem', inputFotoJovem.files[0]);
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/jovem/atualizar/${idJovemGlobal}`, {
                method: 'PUT', // Ou 'POST' se o backend não suportar PUT com FormData facilmente
                body: formData // Envie o FormData diretamente
            });

            if (!response.ok) {
                const errorData = await response.json(); // Tenta ler erro como JSON
                throw new Error(`Erro ao atualizar dados pessoais do jovem: ${errorData.erro || response.statusText}`);
            }

            const rs = await response.json();
            alert(rs.msg || 'Dados pessoais atualizados com sucesso!');
            console.log("Resposta atualização jovem:", rs);

            // Se a atualização foi bem-sucedida e o backend retorna o novo caminho da foto,
            // atualize o localStorage e a imagem do header/fotona.
            if (rs.payload && rs.payload.length > 0 && rs.payload[0].foto_jovem) {
                const jovemAtualizado = rs.payload[0];
                const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                if (usuarioLogado) {
                    usuarioLogado.foto_perfil_url = jovemAtualizado.foto_jovem;
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                    // Chamar a função que atualiza as fotos no DOM (se estiver em um script separado)
                    // window.carregarFotoPerfilDoLocalStorage(); // Assumindo que essa função é global
                }
            }

            carregarDadosCompletos(); // Recarrega o formulário com os dados mais recentes do DB
        } catch (error) {
            console.error("Erro ao atualizar dados pessoais do jovem:", error);
            alert(`Erro ao atualizar dados pessoais: ${error.message}.`);
        }
    });

    // --- Lógica para o envio do Formulário de Endereço ---
    // (Este código permanece o mesmo que discutimos para atualização de endereço)
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

    // --- Lógica para o botão "Trocar Foto" (aciona o input file) ---
    // Adicione um botão no HTML: <button class="btn btn-outline-secondary btn-sm" id="btnTrocarFoto">Trocar Foto</button>
    // E um input file: <input type="file" id="inputFotoJovem" name="foto_jovem" accept="image/*" style="display: none;">
    const btnTrocarFoto = document.getElementById('btnTrocarFoto');
    const inputFotoJovemElement = document.getElementById('foto_perfil'); // ID do seu input file

    if (btnTrocarFoto && inputFotoJovemElement) {
        btnTrocarFoto.addEventListener('click', () => {
            inputFotoJovemElement.click(); // Simula o clique no input file
        });

        // Opcional: pré-visualização da imagem ao selecionar
        inputFotoJovemElement.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imgPerfilJovem.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Lógica do Dropdown do Header (geralmente em header_utils.js ou script.js) ---
    // Se você tem a função toggleDropdown e window.onclick em um script global como header_utils.js,
    // não precisa delas aqui. Se não, mantenha ou mova para um script compartilhado.
    // window.toggleDropdown = toggleDropdown; // Pode ser necessário se a função for definida aqui e usada no HTML
    
    // --- Carrega todos os dados ao iniciar a página ---
    carregarDadosCompletos();
});