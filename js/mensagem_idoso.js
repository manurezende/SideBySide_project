// Função auxiliar para pegar cookies
  let buscar_dados = window.location.search;
  buscar_dados=buscar_dados.split("&")
  let id_usuario = buscar_dados[0]
  id_usuario = id_usuario.split("=")
  id_usuario = id_usuario[1]
  nome_completo=buscar_dados[2]
  nome_completo=nome_completo.split("=" && "%" )
  let primeiro_nome = nome_completo[1]
  primeiro_nome=primeiro_nome.split("2" )
  primeiro_nome=primeiro_nome[2]
  let segundo_nome = nome_completo[2]
  segundo_nome=segundo_nome.split("20" )
  segundo_nome=segundo_nome[1]

  // nome_completo=nome_completo.split("2")
  

  // console.log(id_usuario)

  console.log(id_usuario)
  console.log(primeiro_nome)
  console.log(segundo_nome)

  
    
  
  
  // // Pegamos o ID do idoso selecionado
  
  
  // Simulação de nome (no real, virá do banco)
  document.getElementById("nomeContato").innerText = "Conversando com " + primeiro_nome +" "+ segundo_nome;
  
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
  

  function adicionarContatoLateral(id, nomeCompleto) {
    // Verifica se já existe (evita duplicar)
    const jaExiste = document.getElementById("contato-" + id);
    if (jaExiste) return;
  
    const li = document.createElement("li");
    li.id = "contato-" + id;
    li.textContent = nomeCompleto;
  
    // Evento de clique para abrir a conversa (opcional)
    li.addEventListener("click", () => {
      document.getElementById("nomeContato").innerText = "Conversando com " + nomeCompleto;
    });
  
    document.getElementById("listaContatos").appendChild(li);
  }
  
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
  
    // Adiciona o contato ao aside (se ainda não estiver)
    const nomeCompleto = primeiro_nome + " " + segundo_nome;
    adicionarContatoLateral(id_usuario, nomeCompleto);
  }
  