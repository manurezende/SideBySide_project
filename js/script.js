
function cadastrar_usuario(){
  document.cookie=""
    const email=document.getElementsByName("email")[0]
    const nome_usuario=document.getElementsByName("nome_usuario")[0]
    const nome_completo=document.getElementsByName("nome_completo")[0]
    const senha=document.getElementsByName("senha")[0]
    const tipo_usuario =document.getElementsByName("tipo_usuario")[0]
    if(tipo_usuario.checked)
    {
        tipo_usuario.value=1

    }
    else
    {

        tipo_usuario.value=0
    }

    // alert(`${email.value} ${nome_usuario.value} ${nome_completo.value} ${senha.value} ${tipo_usuario.value}`)
   
    fetch("http://localhost:3000/usuario/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            email:email.value,
            nome_usuario:nome_usuario.value,
            nome_completo:nome_completo.value,
            senha:senha.value,
            tipo_usuario:tipo_usuario.value

        })
    })
    .then((res)=>res.json())
    .then((rs)=>
    {
              
        if(rs.erro=="Email ou usuario já cadastrado!"){
            return document.getElementById("msg_cadastro").innerHTML=rs.erro
        }

        
        else{
            // alert(rs.msg)
            document.getElementById("form-usuario").reset();


            // criando o cookie
            let usuario = {
              idusuario:rs.payload.insertId
          }
          document.cookie = `usuario_id=${JSON.stringify(usuario)};`

          // terminando de criar o cookie
        
        if(tipo_usuario.value==1){

          window.location.href="cadastro_jovem.html"  
          }
        else{
            window.location.href="cadastro_idoso.html"
        }
       
      
      }
    })


}

function getCookie(nome) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nome}=`);
  if (partes.length === 2) return partes.pop().split(';').shift();
}


function ligarcookies(){
const socket = new WebSocket("http://127.0.0.1:3000");

socket.addEventListener("open", () => {
  const id = getCookie("id_usuario"); // pega o ID do cookie

  if (id) {
    socket.send(JSON.stringify({
      tipo: "login",
      id: parseInt(id) // envia para o backend
    }));
  }
});
}

function cadastrar_jovem() {
  // Campos de endereço .
  const cep = document.getElementById("cep");
  const logradouro = document.getElementById("logradouro");
  const logradouro_nome = document.getElementById("logradouro_nome");
  const cidade = document.getElementById("cidade");
  const estado = document.getElementById("estado");
  const bairro = document.getElementById("bairro");
  const pais = document.getElementById("pais");
  const complemento = document.getElementById("complemento");
  const numero = document.getElementById("numero");


  // Campos do idoso
  const id_usuario = document.getElementById("id_usuario");
  const cpf_jovem = document.getElementById("cpf_jovem");
  const valor_jovem = document.getElementsByName("valor_jovem");
  const telefone_jovem = document.getElementById("telefone_jovem");
  const data_nascimento_jovem = document.getElementById("data_nascimento_jovem");
  const foto_jovem = document.getElementById("foto_jovem");
  const experiencia_jovem = document.getElementsByName("experiencia_jovem");
  const descricao_jovem = document.getElementById("descricao_jovem");
  const assinante_jovem = document.getElementById("assinante_jovem");
  const genero_jovem =document.getElementsByName("genero_jovem")[0]

  // Envio para o backend;
  fetch("http://localhost:3000/jovem/cadastrar", {
      method: "POST",
      headers: {
          "accept": "application/json",
          "content-type": "application/json"
      },
      body: JSON.stringify({
        cep: cep.value,
        logradouro: logradouro.value,
        logradouro_nome: logradouro_nome.value,
        cidade: cidade.value,
        estado: estado.value,
        bairro: bairro.value,
        pais: pais.value,
        numero: numero.value,
        complemento: complemento.value, 

        id_usuario: id_usuario.value,
        cpf_jovem: cpf_jovem.value,
        valor_jovem: valor_jovem.value,
        telefone_jovem: telefone_jovem.value,
        data_nascimento_jovem: data_nascimento_jovem.value,
        foto_jovem: foto_jovem.value,
        experiencia_jovem: experiencia_jovem.value,
        descricao_jovem: descricao_jovem.value,
        assinante_jovem: assinante_jovem.value,
        genero_jovem: genero_jovem.value
        
      })
  })
  .then(res => res.json())
  .then(rs => {
      if (rs.erro) {
          document.getElementById("msg_erro_jovem").innerHTML = rs.erro;
      } else {
          alert(rs.msg);
          document.getElementById("form-jovem").reset();
          if (rs.msg === "jovem cadastrado") {
              window.location.href = "pagina_listar_idosos.html";
          }
      }
  });
}


// barra de progresso
// Atualiza a barra de progresso com base na etapa atual
function atualizarBarraProgresso(step) {
  const totalSteps = 11;

  const progressBar = document.getElementById('progress-bar');
  const percentage = (step / totalSteps) * 100;
  progressBar.style.width = percentage + '%';



}





function form_active_jovem() {
  const cepInput = document.getElementById('cep');
  const cep = cepInput.value.replace(/\D/g, '');
  const erroMsg_cep = document.getElementById('erro-etapa-1');
 
  // Limpa mensagens de erro anteriores
  erroMsg_cep.style.display = 'none';
  erroMsg_cep.textContent = '';
 
  // Validação local
  if (cep === '') {
    erroMsg_cep.style.display = 'block';
    erroMsg_cep.textContent = 'O campo CEP não pode estar vazio.';
    return;
  }
 
  if (cep.length !== 8) {
    erroMsg_cep.style.display = 'block';
    erroMsg_cep.textContent = 'CEP inválido. Deve conter 8 dígitos.';
    return;
  }
 
  // Consulta ao ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao consultar o CEP.');
      }
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        erroMsg_cep.style.display = 'block';
        erroMsg_cep.textContent = 'CEP não encontrado.';
        return; // NÃO AVANÇA DE ETAPA
      }
 
      // Preenche os campos com os dados do ViaCEP
      const logradouroCompleto = data.logradouro || '';
      const logradouroParts = logradouroCompleto.split(' ');
      const tipoLogradouro = logradouroParts[0];
      const nomeLogradouro = logradouroParts.slice(1).join(' ');
 
      const logradouroSelect = document.getElementById('logradouro');
      for (let i = 0; i < logradouroSelect.options.length; i++) {
        if (logradouroSelect.options[i].value.toLowerCase() === tipoLogradouro.toLowerCase()) {
          logradouroSelect.selectedIndex = i;
          break;
        }
      }
 
      document.getElementById('logradouro_nome').value = nomeLogradouro;
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('cidade').value = data.localidade || '';
      document.getElementById('estado').value = data.uf || '';
      document.getElementById('pais').value = 'Brasil';
 
      // SÓ AGORA pode mudar de etapa:
      document.getElementsByClassName("form-step")[0].style.display = "block";
      document.getElementsByClassName("form-step-active")[0].style.display = "none";
      updateProgressBar(1); // Etapa 1
    })
    .catch(error => {
      console.error(error);
      erroMsg_cep.style.display = 'block';
      erroMsg_cep.textContent = 'Erro ao buscar o endereço. Tente novamente.';
    });
    atualizarBarraProgresso();
}
 
 
function form_step1_jovem() {
    const erroMsg = document.getElementById('erro-etapa-2');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
 
    if(document.getElementById("logradouro").value=="Selecione"
    || document.getElementById("logradouro_nome").value.trim()=="") {
        erroMsg.style.display = 'block';
        erroMsg.textContent = 'Os campos não podem ser nulos.';
        return;
    }
 
    document.getElementsByClassName("form-step")[1].style.display = "block";
    document.getElementsByClassName("form-step")[0].style.display = "none";
    atualizarBarraProgresso(2); // Etapa 2
  }
 
  function form_step2_jovem() {
    const erroMsg = document.getElementById('erro-etapa-3');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
 
    if (
      document.getElementById("cidade").value.trim() == "" ||
      document.getElementById("estado").value.trim() == "" ||
      document.getElementById("bairro").value.trim() == "" ||
      document.getElementById("pais").value.trim() == ""
    ) {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Os campos não podem ser nulos.';
      return;
    }
 
    document.getElementsByClassName("form-step")[2].style.display = "block";
    document.getElementsByClassName("form-step")[1].style.display = "none";
    atualizarBarraProgresso(3);  }
 
  function form_step3_jovem() {
    const erroMsg = document.getElementById('erro-etapa-4');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
 
    if(document.getElementById("numero").value.trim() == "") {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Os campos não podem ser nulos.';
      return;
    }
 
    document.getElementsByClassName("form-step")[3].style.display = "block";
    document.getElementsByClassName("form-step")[2].style.display = "none";
    atualizarBarraProgresso(4);  }
 
  function form_step4_jovem() {
    const erroMsg = document.getElementById('erro-etapa-5');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
 
    if (document.getElementById("cpf_jovem").value.trim() == "") {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Os campos não podem ser nulos.';
      return;
    }
 
    document.getElementsByClassName("form-step")[4].style.display = "block";
    document.getElementsByClassName("form-step")[3].style.display = "none";
    atualizarBarraProgresso(5);  }
 
function form_step5_jovem() {
  const erroMsg = document.getElementById('erro-etapa-6');
  erroMsg.style.display = 'none';
  erroMsg.textContent = '';
 
  const valorSelecionado = document.querySelector('input[name="valor_jovem"]:checked');
 
  if (!valorSelecionado) {
    erroMsg.style.display = 'block';
    erroMsg.textContent = 'Selecione uma opção de valor.';
    return;
  }
 
  document.getElementsByClassName("form-step")[4].style.display = "none";
  document.getElementsByClassName("form-step")[5].style.display = "block";
  atualizarBarraProgresso(6);}
 

 
function form_step6_jovem() {
  const erroMsg = document.getElementById('erro-etapa-7');
  erroMsg.style.display = 'none';
  erroMsg.textContent = '';
 
  const telefone_jovem = document.getElementById("telefone_jovem").value.trim();
  const data_nascimento_jovem = document.getElementById("data_nascimento_jovem").value.trim();

  // Obtém a data do input
  const data_nascimento_validar = document.getElementById("data_nascimento_jovem");
  const dataNascimento = data_nascimento_validar.value;

  // Cria um objeto Date a partir da data de nascimento
  const data_nascimento = new Date(dataNascimento);

  // Obtém a data atual
  const data_atual = new Date();

  // Calcula a idade
  let idade = data_atual.getFullYear() - data_nascimento.getFullYear();

  // Ajusta a idade se a data de nascimento ainda não aconteceu este ano
  if (data_nascimento.getMonth() > data_atual.getMonth() ||
      (data_nascimento.getMonth() === data_atual.getMonth() && data_nascimento.getDate() > data_atual.getDate())) {
    idade--;
  }

  // Realiza a validação
  if (idade >= 18 ) {
  } else {
    erroMsg.style.display = 'block';
    erroMsg.textContent = 'Você não tem idade o suficiente';
    return;
  }
 
  if (telefone_jovem =="" || data_nascimento_jovem =="") {
    erroMsg.style.display = 'block';
    erroMsg.textContent = 'Preencha o campo de telefone e data de nascimento.';
    return;
  }
  
 
  document.getElementsByClassName("form-step")[5].style.display = "none";
  document.getElementsByClassName("form-step")[6].style.display = "block";
  atualizarBarraProgresso(7);}
// ETAPA 8 

function form_step7_jovem() {
  const erroMsg = document.getElementById('erro-etapa-7');
  erroMsg.style.display = 'none';
  erroMsg.textContent = '';
 
  const foto_jovem = document.getElementById("foto_jovem").value.trim();
 
  if (foto_jovem =="") {
    erroMsg.style.display = 'block';
    erroMsg.textContent = 'Envei uma foto, este campo não pode ser nulo.';
    return;
  }
 
  document.getElementsByClassName("form-step")[6].style.display = "none";
  document.getElementsByClassName("form-step")[7].style.display = "block";
  atualizarBarraProgresso(8);}


// Etapa 9 - Valida experiência
function form_step8_jovem() {
  const erroMsg = document.getElementById('erro-etapa-9');
  erroMsg.style.display = 'none';
  erroMsg.textContent = '';
 
  const valorSelecionado = document.querySelector('input[name="experiencia_jovem"]:checked');
 
  if (!valorSelecionado) {
    erroMsg.style.display = 'block';
    erroMsg.textContent = 'Selecione uma opção de valor.';
    return;
  }
 
  document.getElementsByClassName("form-step")[7].style.display = "none";
  document.getElementsByClassName("form-step")[8].style.display = "block";
  atualizarBarraProgresso(9);}

// Etapa 10 - Valida descrição
function form_step9_jovem() {
  const erroMsg = document.getElementById('erro-etapa-10');
  erroMsg.style.display = 'none';
  erroMsg.textContent = '';
 
  const descricao_jovem = document.getElementById("descricao_jovem").value.trim();
 
  if (descricao_jovem =="") {
    erroMsg.style.display = 'block';
    erroMsg.textContent = 'Envei uma descrição, este campo não pode ser nulo.';
    return;
  }
 
  document.getElementsByClassName("form-step")[8].style.display = "none";
  document.getElementsByClassName("form-step")[9].style.display = "block";
}

// Etapa 11 - Valida gênero
function form_step10_jovem() {
  const erroMsg = document.getElementById('erro-etapa-11');
  erroMsg.style.display = 'none';
  erroMsg.textContent = '';

  const generoMasc = document.getElementById("genero_masc").checked;
  const generoFem = document.getElementById("genero_fem").checked;

  if (!generoMasc && !generoFem) {
    erroMsg.textContent = "Por favor, selecione seu gênero.";
    return;
  }

  // Última etapa, não avança
}
 

 

 
function form_past1_jovem() {
  document.getElementsByClassName("form-step-active")[0].style.display = "block";
  document.getElementsByClassName("form-step")[0].style.display = "none";
  
}

function form_past2_jovem() {
  document.getElementsByClassName("form-step")[0].style.display = "block";
  document.getElementsByClassName("form-step")[1].style.display = "none";
  
}
 


function form_past3_jovem() {
  document.getElementsByClassName("form-step")[1].style.display = "block";
  document.getElementsByClassName("form-step")[2].style.display = "none";
  
}

function form_past4_jovem() {
  document.getElementsByClassName("form-step")[2].style.display = "block";
  document.getElementsByClassName("form-step")[3].style.display = "none";
  
}

function form_past5_jovem() {
  document.getElementsByClassName("form-step")[3].style.display = "block";
  document.getElementsByClassName("form-step")[4].style.display = "none";
  
}

function form_past6_jovem() {
  document.getElementsByClassName("form-step")[4].style.display = "block";
  document.getElementsByClassName("form-step")[5].style.display = "none";
  
}
 


function form_past7_jovem() {
  document.getElementsByClassName("form-step")[5].style.display = "block";
  document.getElementsByClassName("form-step")[6].style.display = "none";
  
}

function form_past8_jovem() {
  document.getElementsByClassName("form-step")[6].style.display = "block";
  document.getElementsByClassName("form-step")[7].style.display = "none";
  
}

function form_past9_jovem() {
  document.getElementsByClassName("form-step")[7].style.display = "block";
  document.getElementsByClassName("form-step")[8].style.display = "none";
  
}

function form_past10_jovem() {
  document.getElementsByClassName("form-step")[8].style.display = "block";
  document.getElementsByClassName("form-step")[9].style.display = "none";
  
}


// ///////////////////  MASCARAS DOS INPUTS //////////////////////////////////


function dadosUsuarios(){

    const txt_id_usuario = document.getElementById("id_usuario")

  //Obter os dados que foram inseridos no cookie
   let cookie = document.cookie;
   console.log(cookie)
  // //  console.log(cookie)
   let separa_igual = cookie.split(':')
   //console.log(separa_igual[1].substring(0,separa_igual[1].length-1))
 let id_usuario = separa_igual[1].substring(0,separa_igual[1].length-1)
 txt_id_usuario.value = id_usuario;
}

function logar_usuario(){
    const email=document.getElementsByName("email")[0]
    const nome_usuario=document.getElementsByName("nome_usuario")[0]
    const senha=document.getElementsByName("senha")[0]
   
   
    //    alert(`${email.value} ${nome_usuario.value} ${senha.value}`)


    fetch("http://localhost:3000/usuario/logar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            email:email.value,
            nome_usuario:nome_usuario.value,
            senha:senha.value,
            
        })
    })
    .then((res)=>res.json())
    .then((rs)=>
    {
              
        if(rs.erro=="Email, usuário ou senha incorretos."){
            return document.getElementById("msg_login").innerHTML=rs.erro
        }

        
        else{
            
            alert(rs.msg)
            document.getElementById("form-login").reset();
        
            if(rs.msg == "Login realizado com sucesso"){

                window.location.href="pagina_inicial.html"  
                }
            
             }
          })
          
}



function cadastrar_idoso() {
  // Campos de endereço .
  const cep = document.getElementById("cep");
  const logradouro = document.getElementById("logradouro");
  const logradouro_nome = document.getElementById("logradouro_nome");
  const cidade = document.getElementById("cidade");
  const estado = document.getElementById("estado");
  const bairro = document.getElementById("bairro");
  const pais = document.getElementById("pais");
  const complemento = document.getElementById("complemento");
  const numero = document.getElementById("numero");


  // Campos do jovem
  const id_usuario = document.getElementById("id_usuario");
  const foto_idoso = document.getElementById("foto_idoso");
  const assinante_idoso = document.getElementById("assinante_idoso");
  const cpf = document.getElementById("cpf_idoso");
  const data_nascimento = document.getElementById("data_nascimento_idoso");
  const comorbidade =document.getElementsByName("comorbidade")[0]
  const tipo_comorbidade = document.getElementById("tipo_comorbidade");
  const descricao = document.getElementById("descricao_idoso");
  const telefone_idoso = document.getElementById("telefone_celular_idoso");
  const genero =document.getElementsByName("genero_idoso")[0]

  // Envio para o backend
  fetch("http://localhost:3000/idoso/cadastrar", {
      method: "POST",
      headers: {
          "accept": "application/json",
          "content-type": "application/json"
      },
      body: JSON.stringify({
        cep: cep.value,
        logradouro: logradouro.value,
        logradouro_nome: logradouro_nome.value,
        cidade: cidade.value,
        estado: estado.value,
        bairro: bairro.value,
        pais: pais.value,
        numero: numero.value,
        complemento: complemento.value,      
        id_usuario: id_usuario.value,
        foto_idoso: foto_idoso.value,
        assinante_idoso:assinante_idoso.value,
        cpf:cpf.value,
        data_nascimento: data_nascimento.value,
        comorbidade: comorbidade.value,
        tipo_comorbidade: tipo_comorbidade.value,
        descricao: descricao.value,
        telefone_idoso: telefone_idoso.value,
        genero: genero.value
        
      })
  })
  .then(res => res.json())
  .then(rs => {
      if (rs.erro) {
          document.getElementById("msg_erro_idoso").innerHTML = rs.erro;
      } else {
          alert(rs.msg);
          document.getElementById("form-idoso").reset();
          if (rs.msg === "endereco cadastrado") {
              window.location.href = "pagina_listar_jovens.html";
          }
      }
  });
}


////////////////////    modal    ///////////////

const form = document.getElementById("form-usuario");
const btn_modal = document.querySelector("#btn-modal-cadastro")
const modal = document.querySelector("dialog")
const btn_fechar = document.querySelector("#btn_cancelar_cadastro")

function abrir_modal(){
btn_modal.onclick 
    modal.showModal()
    
}

function fechar_modal(){
btn_fechar.onclick 
    modal.close()
    form.reset();

}

const formLogin = document.getElementById("form-login");
const btn_modal_login = document.querySelector("#btn-modal-login")
const modal_login = document.querySelector("#dialog-login")
const btn_fechar_login = document.querySelector("#btn_cancelar_login")
 

function abrir_modal_login(){
btn_modal_login.onclick 
    modal_login.showModal()
   
}
function fechar_login(){
btn_fechar_login.onclick 
    modal_login.close()
    formLogin.reset();
}

////////////////////    progress bar     ///////////////

const totalSteps = 8;

function updateProgressBar(step) {
  const progressBar = document.getElementById('progress-bar');
  const percentage = (step / totalSteps) * 100;
  progressBar.style.width = percentage + '%';
}




////////////////////    form múltiplas etapas IDOSO     ///////////////

function form_active() {
  const cepInput = document.getElementById('cep');
  const cep = cepInput.value.replace(/\D/g, '');
  const erroMsg_cep = document.getElementById('erro-etapa-1');

  // Limpa mensagens de erro anteriores
  erroMsg_cep.style.display = 'none';
  erroMsg_cep.textContent = '';

  // Validação local
  if (cep === '') {
    erroMsg_cep.style.display = 'block';
    erroMsg_cep.textContent = 'O campo CEP não pode estar vazio.';
    return;
  }

  if (cep.length !== 8) {
    erroMsg_cep.style.display = 'block';
    erroMsg_cep.textContent = 'CEP inválido. Deve conter 8 dígitos.';
    return;
  }

  // Consulta ao ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao consultar o CEP.');
      }
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        erroMsg_cep.style.display = 'block';
        erroMsg_cep.textContent = 'CEP não encontrado.';
        return; // NÃO AVANÇA DE ETAPA
      }

      // Preenche os campos com os dados do ViaCEP
      const logradouroCompleto = data.logradouro || '';
      const logradouroParts = logradouroCompleto.split(' ');
      const tipoLogradouro = logradouroParts[0];
      const nomeLogradouro = logradouroParts.slice(1).join(' ');

      const logradouroSelect = document.getElementById('logradouro');
      for (let i = 0; i < logradouroSelect.options.length; i++) {
        if (logradouroSelect.options[i].value.toLowerCase() === tipoLogradouro.toLowerCase()) {
          logradouroSelect.selectedIndex = i;
          break;
        }
      }

      document.getElementById('logradouro_nome').value = nomeLogradouro;
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('cidade').value = data.localidade || '';
      document.getElementById('estado').value = data.uf || '';
      document.getElementById('pais').value = 'Brasil';

      // SÓ AGORA pode mudar de etapa:
      document.getElementsByClassName("form-step")[0].style.display = "block";
      document.getElementsByClassName("form-step-active")[0].style.display = "none";
      updateProgressBar(1); // Etapa 1
    })
    .catch(error => {
      console.error(error);
      erroMsg_cep.style.display = 'block';
      erroMsg_cep.textContent = 'Erro ao buscar o endereço. Tente novamente.';
    });
}


function form_step1() {
    const erroMsg = document.getElementById('erro-etapa-2');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
  
    if(document.getElementById("logradouro").value=="Selecione" 
    || document.getElementById("logradouro_nome").value.trim()=="") {
        erroMsg.style.display = 'block';
        erroMsg.textContent = 'Os campos não podem ser nulos.';
        return;
    }
  
    document.getElementsByClassName("form-step")[1].style.display = "block";
    document.getElementsByClassName("form-step")[0].style.display = "none";
    updateProgressBar(2); // Etapa 2
  }
  
  function form_step2() {
    const erroMsg = document.getElementById('erro-etapa-3');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
  
    if (
      document.getElementById("cidade").value.trim() == "" ||
      document.getElementById("estado").value.trim() == "" ||
      document.getElementById("bairro").value.trim() == "" ||
      document.getElementById("pais").value.trim() == ""
    ) {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Os campos não podem ser nulos.';
      return;
    }
  
    document.getElementsByClassName("form-step")[2].style.display = "block";
    document.getElementsByClassName("form-step")[1].style.display = "none";
    updateProgressBar(3); // Etapa 3
  }
  
  function form_step3() {
    const erroMsg = document.getElementById('erro-etapa-4');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
  
    if(document.getElementById("numero").value.trim() == "") {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Os campos não podem ser nulos.';
      return;
    }
  
    document.getElementsByClassName("form-step")[3].style.display = "block";
    document.getElementsByClassName("form-step")[2].style.display = "none";
    updateProgressBar(4); // Etapa 4
  }
  

  function form_step4() {
    const erroMsg = document.getElementById('erro-etapa-5');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
  
    if(
      document.getElementById("telefone_celular_idoso").value.trim() == "" ||
      document.getElementById("data_nascimento_idoso").value.trim() == ""
    ) {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Os campos não podem ser nulos.';
      return;
    }
  
    document.getElementsByClassName("form-step")[4].style.display = "block";
    document.getElementsByClassName("form-step")[3].style.display = "none";
    updateProgressBar(5); // Etapa 5
  }
  
  function form_step5() {
    const erroMsg = document.getElementById('erro-etapa-6');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
    
    if(
      document.getElementById("cpf_idoso").value.trim() == "" ||
      document.getElementById("foto_idoso").value.trim() == ""
    ) {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Os campos não podem ser nulos.';
      return;
    }
  
    document.getElementsByClassName("form-step")[5].style.display = "block";
    document.getElementsByClassName("form-step")[4].style.display = "none";
    updateProgressBar(6); // Etapa 6
    
  }
  
  function form_step6() {
    const erroMsg = document.getElementById('erro-etapa-7');
    erroMsg.style.display = 'none';
    erroMsg.textContent = '';
  
    // Note: Aqui o código original verifica valores dos radio, que não está correto. 
    // O correto é verificar se algum dos radios está marcado (checked).
    const simChecked = document.getElementById("comorbidade_sim").checked;
    const naoChecked = document.getElementById("comorbidade_nao").checked;
  
    if(!simChecked && !naoChecked) {
      erroMsg.style.display = 'block';
      erroMsg.textContent = 'Selecione uma opção.';
      return;
    }
  
    document.getElementsByClassName("form-step")[6].style.display = "block";
    document.getElementsByClassName("form-step")[5].style.display = "none";
    updateProgressBar(7); // Etapa 7
  }
  


function cpf_mascara(){
    document.getElementById('cpf_idoso').addEventListener('input', function(e) {
        var value = e.target.value;
        var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                              .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                              .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                              .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                              .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
        e.target.value = cpfPattern;
      });
    }

function form_past1() 
{
    document.getElementsByClassName("form-step-active")[0].style.display = "block";
    document.getElementsByClassName("form-step")[0].style.display = "none";
    updateProgressBar(0);
}

function form_past2() 
{
    document.getElementsByClassName("form-step")[0].style.display = "block";
    document.getElementsByClassName("form-step")[1].style.display = "none";
    updateProgressBar(1);
}

function form_past3() 
{
    document.getElementsByClassName("form-step")[1].style.display = "block";
    document.getElementsByClassName("form-step")[2].style.display = "none";
    updateProgressBar(2);
}

function form_past4() 
{
    document.getElementsByClassName("form-step")[2].style.display = "block";
    document.getElementsByClassName("form-step")[3].style.display = "none";
    updateProgressBar(3);
}

function form_past5() 
{
    document.getElementsByClassName("form-step")[3].style.display = "block";
    document.getElementsByClassName("form-step")[4].style.display = "none";
    updateProgressBar(4);
}
  
function form_past6() 
{
    document.getElementsByClassName("form-step")[4].style.display = "block";
    document.getElementsByClassName("form-step")[5].style.display = "none";
    updateProgressBar(5);
}

function form_past7() 
{
    document.getElementsByClassName("form-step")[5].style.display = "block";
    document.getElementsByClassName("form-step")[6].style.display = "none";
    updateProgressBar(6);
}
