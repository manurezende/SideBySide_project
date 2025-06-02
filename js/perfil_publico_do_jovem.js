// Função para ler o valor de um cookie
// function getCookie(nome) {
//   const valor = `; ${document.cookie}`;
//   const partes = valor.split(`; ${nome}=`);
//   if (partes.length === 2) return partes.pop().split(';').shift();
// }

// Função para calcular idade a partir da data de nascimento;
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
  
  let dados_jovem =[]

  // Buscar e exibir os dados do idoso
  async function perfil_piblico(){
  
      let idJovem = window.location.search;
      idJovem=idJovem.substring(9,idJovem.length)
      console.log(idJovem)
  
    try {
      const resposta = await fetch(`http://127.0.0.1:3000/jovem/perfil_jovem/${idJovem}`);
      const jovem = await resposta.json();
  
      console.log(jovem)
      dados_jovem = jovem.msg[0]
  
      
      const container = document.getElementById("perfilJovem");
      const idade = calcularIdade(jovem.msg[0].data_nascimento_jovem);
  
      container.innerHTML = `
        <img src="${jovem.msg[0].foto_jovem}" alt="Foto do jovem">
        <h2>${jovem.msg[0].nome_completo}</h2>
        <p><strong>Idade:</strong> ${idade} anos</p>
        <p><strong>Nascimento:</strong> ${jovem.msg[0].data_nascimento_jovem.substring(0,10)}</p>
        <p><strong>Descrição:</strong> ${jovem.msg[0].descricao_jovem}</p>
        <p><strong>Valor:</strong> ${jovem.msg[0].valor_jovem}</p>
      `;
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      alert("Erro ao carregar os dados do jovem.");
    }
  }
  
  // Ir para a página de mensagens
  const btnmensagem_para_jovem = document.getElementById("mensagem_para_jovem");
  btnmensagem_para_jovem.onclick = ()=>{
    console.log(dados_jovem)
    console.log(dados_jovem.descricao_jovem)
    window.location.href = `mensagens_do_idoso.html?id_usuario=${dados_jovem.id_jovem}&id_jovem=${dados_jovem.id_jovem}&nome="${dados_jovem.nome_completo}"`; // substitua com o nome real se for diferente

  }
    
  
  
  // Voltar para a tela anterior
  function voltar() {
    window.history.back();
  }
  