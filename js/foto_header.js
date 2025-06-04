// js/header_utils.js

function carregarFotoPerfilDoLocalStorage() {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');
    const avatarImg = document.querySelector('header .avatar'); // O avatar no header

    // Elemento da "fotona" na página de edição (se existir)
    const imgPerfilJovemEdicao = document.getElementById('imgPerfilJovem');

    if (usuarioLogadoJSON) {
        const usuarioLogado = JSON.parse(usuarioLogadoJSON);

        // Construir a URL base completa para todas as fotos
        const BASE_URL_FOTOS = 'http://localhost:3000';

        // Lógica para o avatar do HEADER (já existente)
        if (avatarImg) {
            if (usuarioLogado.foto_perfil_url) {
                const fotoUrlCompleta = `${BASE_URL_FOTOS}${usuarioLogado.foto_perfil_url}`;
                avatarImg.src = fotoUrlCompleta;
                console.log("Foto de perfil do header carregada do localStorage:", fotoUrlCompleta);
            } else {
                // Caso não tenha URL de foto salva no localStorage, usa a imagem padrão
                if (usuarioLogado.tipo_usuario === 1) { // Jovem
                    avatarImg.src = './img/fotos.jpg'; // Caminho para foto padrão de jovem
                } else if (usuarioLogado.tipo_usuario === 0) { // Idoso
                    avatarImg.src = './img/vl.jpg'; // Caminho para foto padrão de idoso
                }
                console.log("Usando foto padrão para o header, URL não encontrada no localStorage.");
            }
        }

        // NOVO CÓDIGO: Lógica para a "fotona" na página de edição (editar_jovem.html)
        // Só tenta atualizar se o elemento 'imgPerfilJovem' existir na página
        if (imgPerfilJovemEdicao) {
            // Verificar se a página atual é editar_jovem.html
            // Você pode verificar o pathname ou ter certeza que este script só é carregado em editar_jovem.html
            // A forma mais robusta é checar o elemento, pois ele só existirá na página correta.
            if (usuarioLogado.foto_perfil_url) {
                const fotoUrlCompletaEdicao = `${BASE_URL_FOTOS}${usuarioLogado.foto_perfil_url}`;
                imgPerfilJovemEdicao.src = fotoUrlCompletaEdicao;
                console.log("Fotona do perfil de edição atualizada:", fotoUrlCompletaEdicao);
            } else {
                // Caso não tenha URL de foto, usa a imagem padrão para o tipo de usuário
                if (usuarioLogado.tipo_usuario === 1) { // Jovem
                    imgPerfilJovemEdicao.src = './img/fotos.jpg'; // Caminho para foto padrão de jovem
                } else if (usuarioLogado.tipo_usuario === 0) { // Idoso (se essa página for adaptada para idoso tbm)
                    imgPerfilJovemEdicao.src = './img/vl.jpg'; // Caminho para foto padrão de idoso
                }
                console.log("Usando foto padrão para a fotona, URL não encontrada no localStorage.");
            }
        }

    } else {
        // Se não houver dados de usuário logado no localStorage
        console.warn("Nenhum usuário logado encontrado no localStorage.");
        // Opcional: Redirecionar para a página de login se não houver usuário logado e você quiser forçar login
        // window.location.href = './index.html';
        
        // Se existir um avatar, mas não há dados no localStorage, ele mantém a imagem padrão do HTML
        if (avatarImg) {
            console.log("Mantendo foto padrão do header, sem usuário logado.");
        }
        if (imgPerfilJovemEdicao) {
            console.log("Mantendo fotona padrão da edição, sem usuário logado.");
        }
    }
}

// Chama a função assim que o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', carregarFotoPerfilDoLocalStorage);