// Função auxiliar para pegar cookies
function pegarCookie(nome) {
    const valor = `; ${document.cookie}`;
    const partes = valor.split(`; ${nome}=`);
    if (partes.length === 2) return partes.pop().split(';').shift();
  }
  
  // Pegamos o ID do idoso selecionado
  const idIdoso = pegarCookie('id_idoso_selecionado');
  
  // Simulação de nome (no real, virá do banco)
  document.getElementById("nomeContato").innerText = "Conversando com ID " + idIdoso;
  
  // Simulação de mensagens
  const mensagens = [
    { texto: "Olá! Tudo bem?", tipo: "recebida" },
    { texto: "Oi! Tudo sim, e com você?", tipo: "enviada" }
  ];
  
  // Renderiza mensagens simuladas
  const areaMensagens = document.getElementById("mensagens");
  
  mensagens.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("mensagem", msg.tipo);
    div.innerText = msg.texto;
    areaMensagens.appendChild(div);
  });
  
  // Envia nova mensagem
  function enviarMensagem() {
    const input = document.getElementById("mensagemInput");
    const texto = input.value.trim();
    if (texto === "") return;
  
    const novaMsg = document.createElement("div");
    novaMsg.classList.add("mensagem", "enviada");
    novaMsg.innerText = texto;
    areaMensagens.appendChild(novaMsg);
  
    input.value = "";
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
  }
  