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

// Função para carregar e exibir os idosos no carrossel
function carregarIdosos() {
  fetch("http://localhost:3000/idoso/listar_pos_cadastro")
    .then(res => res.json())
    .then(dados => {
      const container = document.getElementById("carrosselIdosos");

      dados.msg.forEach(idoso => {
        const idade = calcularIdade(idoso.data_nascimento);
        const online = Math.random() > 0.5; // Simula se o idoso está online

        const card = document.createElement("div");
        card.classList.add("card-idoso");
        card.innerHTML = `
          <img src="${idoso.foto_idoso}" alt="Foto de idoso">
          <h3>${idoso.nome_completo || 'Idoso'}</h3>
          <p><strong>Idade:</strong> ${idade} anos</p>
          <p><strong>Status:</strong> <span style="color:${online ? 'green' : 'gray'}">${online ? 'Online' : 'Offline'}</span></p>
           <a href=perfil_idoso.html?idIdoso=${idoso.id_idoso}>Ver perfil</a>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar idosos:", error);
    });
}



// Quando o DOM estiver carregado, chama a função
document.addEventListener("DOMContentLoaded", carregarIdosos);

// Função que salva o ID do idoso no cookie e redireciona para a página de perfil
function verPerfil(idIdoso) {
  
  // Define o cookie com o ID do idoso, expira em 1 dia
  // document.cookie = `id_idoso_selecionado=${idIdoso}; path=/; max-age=86400`;

  // Redireciona para a página de perfil
  window.location.href = `perfil_idoso.html?id_idoso=${idIdoso}`;
}
