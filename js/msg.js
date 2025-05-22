// Conecta ao servidor WebSocket (localhost:3000)
const socket = io("http://localhost:3000");

// Pergunta ao usuário seu nome
const nomeUsuario = prompt("Digite seu nome de usuário:");
document.getElementById("usuario-logado").innerText = nomeUsuario;

// Envia o nome do usuário para o servidor
socket.emit("registrar_usuario", nomeUsuario);

// Referência aos elementos HTML
const campoMensagem = document.getElementById("mensagem");
const botaoEnviar = document.getElementById("enviar");
const areaMensagens = document.getElementById("area-mensagens");
const campoDestinatario = document.getElementById("nome-destinatario");

// Função para exibir mensagem na tela
function exibirMensagem(texto, tipo) {
  const div = document.createElement("div");       // Cria elemento da mensagem
  div.classList.add("mensagem");                   // Adiciona classe base
  div.classList.add(tipo);                         // Adiciona classe "enviada" ou "recebida"
  div.innerText = texto;                           // Define o texto da mensagem
  areaMensagens.appendChild(div);                  // Adiciona no chat
  areaMensagens.scrollTop = areaMensagens.scrollHeight; // Rola para o final
}

// Evento ao clicar em "Enviar"
botaoEnviar.addEventListener("click", () => {
  const texto = campoMensagem.value;               // Mensagem digitada
  const destinatario = campoDestinatario.value;    // Nome do destinatário

  if (!texto || !destinatario) return;             // Verifica campos obrigatórios

  // Envia a mensagem para o servidor
  socket.emit("mensagem_privada", {
    remetente: nomeUsuario,
    destinatario,
    mensagem: texto
  });

  // Mostra a mensagem na tela do remetente
  exibirMensagem("Você: " + texto, "enviada");

  // Limpa o campo de texto
  campoMensagem.value = "";
});

// Recebe mensagem do servidor
socket.on("mensagem_recebida", (dados) => {
  const { remetente, mensagem } = dados;
  exibirMensagem(remetente + ": " + mensagem, "recebida");
});
