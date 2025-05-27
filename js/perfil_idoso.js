// Função para ler o valor de um cookie
// function getCookie(nome) {
//   const valor = `; ${document.cookie}`;
//   const partes = valor.split(`; ${nome}=`);
//   if (partes.length === 2) return partes.pop().split(';').shift();
// }

// Função para calcular idade a partir da data de nascimento
function calcularIdade(dataNascimento) {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

// Buscar e exibir os dados do idoso
async function carregarPerfilIdosos(){

    let idIdoso = window.location.search;
    idIdoso=idIdoso.substring(9,idIdoso.length)

  try {
    const resposta = await fetch(`http://127.0.0.1:3000/idoso/perfil_idoso/${idIdoso}`);
    const idoso = await resposta.json();

    console.log(idoso)


    
    const container = document.getElementById("perfilIdoso");
    const idade = calcularIdade(idoso.msg[0].data_nascimento);

    container.innerHTML = `
      <img src="${idoso.msg[0].foto_idoso}" alt="Foto do idoso">
      <h2>${idoso.msg[0].nome_completo}</h2>
      <p><strong>Idade:</strong> ${idade} anos</p>
      <p><strong>Nascimento:</strong> ${idoso.msg[0].data_nascimento.substring(0,10)}</p>
      <p><strong>Descrição:</strong> ${idoso.msg[0].descricao}</p>
      <p><strong>comorbidade:</strong> ${idoso.msg[0].tipo_comorbidade}</p>
    `;
  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
    alert("Erro ao carregar os dados do idoso.");
  }
}

// Ir para a página de mensagens
function enviarMensagem() {
  window.location.href = "mensagem_jovem.html"; // substitua com o nome real se for diferente
}

// Voltar para a tela anterior
function voltar() {
  window.history.back();
}
