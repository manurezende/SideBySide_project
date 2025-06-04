// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }
  
  // Função para carregar e exibir os idosos no carrossel;
  function carregarJovens() {
    fetch("http://localhost:3000/jovem/listar_para_idoso")
      .then(res => res.json())
      .then(dados => {
        const container = document.getElementById("carrosselJovens");
  
        dados.msg.forEach(jovem => {
          const idade = calcularIdade(jovem.data_nascimento_jovem);
          const online = Math.random() > 0.5; // Simula se o idoso está online

          const fotoUrlCompleta = `http://localhost:3000${jovem.foto_jovem}`;

  
          const card = document.createElement("div");
          card.classList.add("card-jovem");
          card.innerHTML = `
          <img src="${fotoUrlCompleta}" alt="Foto de jovem">
          <h3>${jovem.nome_completo || 'Jovem'}</h3>
          <p><strong>Idade:</strong> ${idade} anos</p>
          <p><strong>Status:</strong> <span style="color:${online ? 'green' : 'gray'}">${online ? 'Online' : 'Offline'}</span></p>
           <a href=perfil_jovem.html?idJovem=${jovem.id_jovem}>Ver perfil</a>

        `;
  
          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Erro ao carregar jovem:", error);
      });
  }
  
  
  
  // Quando o DOM estiver carregado, chama a função
  
  document.addEventListener('DOMContentLoaded', () => {
    carregarJovens(); // Chama a função carregarIdosos quando o DOM estiver pronto

    // Se você tiver a função exibirFotoUsuarioLogado, chame-a aqui também
    // exibirFotoUsuarioLogado(); 
});
  // Função que salva o ID do idoso no cookie e redireciona para a página de perfil
  function verPerfil(idJovem) {
    
    // Define o cookie com o ID do idoso, expira em 1 dia
    // document.cookie = `id_idoso_selecionado=${idIdoso}; path=/; max-age=86400`;
  
    // Redireciona para a página de perfil
    window.location.href = `perfil_jovem.html?id_jovem=${idJovem}`;
  }

  function scrollCarrossel(direcao) {
    const container = document.getElementById("carrosselJovens");
    const larguraCard = container.querySelector(".card-jovem")?.offsetWidth || 250;
    container.scrollLeft += direcao * (larguraCard + 16); // 16 = gap entre os cards
  }
  
  