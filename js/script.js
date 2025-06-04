
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



function cadastrar_jovem() {
  // Campos de endereço .
  const cep = document.getElementById("cep").value;
  const logradouro = document.getElementById("logradouro").value;
  const logradouro_nome = document.getElementById("logradouro_nome").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const bairro = document.getElementById("bairro").value;
  const pais = document.getElementById("pais").value;
  const complemento = document.getElementById("complemento").value;
  const numero = document.getElementById("numero").value;

  // Campos do jovem
  const id_usuario = document.getElementById("id_usuario").value;
  const cpf_jovem = document.getElementById("cpf_jovem").value;
  
  let valor_jovem_selecionado = '';
  const valor_jovem_radios = document.getElementsByName("valor_jovem");
  for (const radio of valor_jovem_radios) {
      if (radio.checked) {
          valor_jovem_selecionado = radio.value;
          break;
      }
  }
  const telefone_jovem = document.getElementById("telefone_jovem").value;
  const data_nascimento_jovem = document.getElementById("data_nascimento_jovem").value;
  const foto_jovem_input = document.getElementById("foto_jovem"); 
  
  let experiencia_jovem_selecionada = '';
  const experiencia_jovem_radios = document.getElementsByName("experiencia_jovem");
  for (const radio of experiencia_jovem_radios) {
      if (radio.checked) {
          experiencia_jovem_selecionada = radio.value;
          break;
      }
  }
  const descricao_jovem = document.getElementById("descricao_jovem").value;
  const assinante_jovem = document.getElementById("assinante_jovem").checked;
  
  let genero_jovem_selecionado = '';
  const genero_jovem_elements = document.getElementsByName("genero_jovem");
  for (const element of genero_jovem_elements) {
      if (element.type === 'radio' && element.checked) {
          genero_jovem_selecionado = element.value;
          break;
      } else if (element.tagName === 'SELECT') {
          genero_jovem_selecionado = element.value;
          break;
      }
  }

  // --- CRIAÇÃO DO FormData ---
  const formData = new FormData();

  // Adicione a foto - IMPORTANTE!
  if (foto_jovem_input.files.length > 0) {
      formData.append('foto_jovem', foto_jovem_input.files[0]); 
  } else {
      alert('Por favor, selecione uma foto para o jovem.');
      return; 
  }

  // Adicione os outros campos de texto
  formData.append('cep', cep);
  formData.append('logradouro', logradouro);
  formData.append('logradouro_nome', logradouro_nome);
  formData.append('cidade', cidade);
  formData.append('estado', estado);
  formData.append('bairro', bairro);
  formData.append('pais', pais);
  formData.append('numero', numero);
  formData.append('complemento', complemento);

  formData.append('id_usuario', id_usuario);
  formData.append('cpf_jovem', cpf_jovem);
  formData.append('valor_jovem', valor_jovem_selecionado); 
  formData.append('telefone_jovem', telefone_jovem);
  formData.append('data_nascimento_jovem', data_nascimento_jovem);
  formData.append('experiencia_jovem', experiencia_jovem_selecionada); 
  formData.append('descricao_jovem', descricao_jovem);
  formData.append('assinante_jovem', assinante_jovem); 
  formData.append('genero_jovem', genero_jovem_selecionado); 

  // Envio para o backend;
  fetch("http://localhost:3000/jovem/cadastrar", {
      method: "POST",
      body: formData 
  })
  .then(res => {
      // Sempre verifique se a resposta foi bem-sucedida antes de tentar parsear como JSON
      if (!res.ok) {
          // Se a resposta não for OK, tente ler o erro do corpo da resposta, se houver
          return res.json().then(errorData => {
              throw new Error(errorData.erro || `Erro de rede ou servidor: ${res.status}`);
          });
      }
      return res.json();
  })
  .then(rs => {
      if (rs.erro) {
          const msgErroJovem = document.getElementById("msg_erro_jovem");
          if (msgErroJovem) {
              msgErroJovem.innerHTML = rs.erro;
          } else {
              console.error("Elemento 'msg_erro_jovem' não encontrado.", rs.erro);
              alert(`Erro: ${rs.erro}`);
          }
      } else {
          alert(rs.msg);
          console.log("Resposta completa do backend:", rs); // Para depuração

          // --- NOVO CÓDIGO AQUI: ATUALIZAR A FOTO DE PERFIL ---
          // O backend retorna um array no 'payload', pegue o primeiro elemento
          const jovemCadastrado = rs.payload && rs.payload.length > 0 ? rs.payload[0] : null;

          if (jovemCadastrado && jovemCadastrado.foto_jovem) {
              const fotoUrlCompleta = `http://localhost:3000${jovemCadastrado.foto_jovem}`;
              const imgPerfilAvatar = document.getElementById("fotoPerfilAvatar"); // Seu <img> com o ID

              if (imgPerfilAvatar) {
                  imgPerfilAvatar.src = fotoUrlCompleta;
                  console.log("Foto de perfil do avatar atualizada para:", fotoUrlCompleta);
              } else {
                  console.warn("Elemento 'fotoPerfilAvatar' não encontrado no HTML. Adicione id='fotoPerfilAvatar' à sua tag <img> do avatar.");
              }
          } else {
              console.warn("Não foi possível encontrar a foto do jovem recém-cadastrado na resposta do backend.");
          }
          // --- FIM DO NOVO CÓDIGO ---

          const formJovem = document.getElementById("form-jovem");
          if (formJovem) {
              formJovem.reset();
          } else {
              console.warn("Elemento 'form-jovem' não encontrado para resetar.");
          }
          
          // Você pode redirecionar o usuário ou fazer outra ação aqui
          if (rs.msg === "Jovem cadastrado com sucesso!") {
              window.location.href = `pagina_listar_idoso.html`;
          }
      }
  })
  .catch(error => {
      console.error('Erro na requisição ou no processamento da resposta:', error);
      alert(`Ocorreu um erro ao tentar cadastrar: ${error.message}. Verifique o console para mais detalhes.`);
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
        


            console.log(rs)
            // Redirecionando por tipo de usuário
            if (rs.usuario.tipo_usuario == 0) {
                window.location.href = "./pagina_listar_idoso.html"; // Para jovens
            } 
            else if (rs.usuario.tipo_usuario == 0){
                window.location.href = "./pagina_listar_jovens.html"; // Para idosos
            }
        }
    })
    .catch((erro) => {
        console.error("Erro na requisição de login:", erro);
        document.getElementById("msg_login").innerHTML = "Erro ao tentar fazer login. Tente novamente.";
    });
}


// A função DEVE receber o objeto 'event' para usar event.preventDefault()
// A função DEVE receber o objeto 'event' para usar event.preventDefault()
async function cadastrar_idoso() {

  // 1. Coleta de dados dos campos de endereço (valores .value)
  const cep = document.getElementById("cep").value;
  const logradouro = document.getElementById("logradouro").value;
  const logradouro_nome = document.getElementById("logradouro_nome").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const bairro = document.getElementById("bairro").value;
  const pais = document.getElementById("pais").value;
  const complemento = document.getElementById("complemento").value;
  const numero = document.getElementById("numero").value;

  // 2. Coleta de dados dos campos específicos do IDOSO (valores .value)
  const id_usuario = document.getElementById("id_usuario").value; // ID do usuário associado
  const cpf = document.getElementById("cpf_idoso").value; // CPF do idoso
  const data_nascimento = document.getElementById("data_nascimento_idoso").value; // Data de nascimento do idoso
  const tipo_comorbidade = document.getElementById("tipo_comorbidade").value; // Tipo de comorbidade (campo de texto)
  const descricao = document.getElementById("descricao_idoso").value; // Descrição do idoso
  const telefone_idoso = document.getElementById("telefone_celular_idoso").value; // Telefone do idoso

  // 3. Coleta do arquivo de foto
  const foto_idoso_input = document.getElementById("foto_idoso"); // Referência ao INPUT do tipo file

  // 4. Coleta de dados para checkboxes e radio buttons/selects (adapte conforme seu HTML)

  // Checkbox para assinante_idoso
  const assinante_idoso_checked = document.getElementById("assinante_idoso").checked;
  
  // Radio buttons para comorbidade (exemplo, ajuste se for select ou outro tipo)
  let comorbidade_selecionada = '';
  const comorbidade_elements = document.getElementsByName("comorbidade"); // "comorbidade" é o atributo name
  for (const element of comorbidade_elements) {
      if (element.type === 'radio' && element.checked) {
          comorbidade_selecionada = element.value;
          break;
      }
      // Se for um <select> com id="comorbidade", você usaria:
      // const comorbidade_select = document.getElementById("comorbidade");
      // comorbidade_selecionada = comorbidade_select.value;
  }

  // Radio buttons ou select para genero_idoso (exemplo, ajuste conforme seu HTML)
  let genero_selecionado = '';
  const genero_idoso_elements = document.getElementsByName("genero_idoso"); // "genero_idoso" é o atributo name
  for (const element of genero_idoso_elements) {
      if (element.type === 'radio' && element.checked) {
          genero_selecionado = element.value;
          break;
      } else if (element.tagName === 'SELECT') { // Se for um <select>
          genero_selecionado = element.value;
          break;
      }
  }


  // --- CRIAÇÃO DO FormData ---
  const formData = new FormData();

  // 5. Adicione a foto ao FormData - IMPORTANTE!
  if (foto_idoso_input.files.length > 0) {
      formData.append('foto_idoso', foto_idoso_input.files[0]); // 'foto_idoso' deve corresponder ao nome do campo no Multer no backend
  } else {
      alert('Por favor, selecione uma foto para o idoso.');
      return; // Interrompe a função se nenhuma foto for selecionada
  }

  // 6. Adicione os outros campos de texto ao FormData
  // Campos de endereço
  formData.append('cep', cep);
  formData.append('logradouro', logradouro);
  formData.append('logradouro_nome', logradouro_nome);
  formData.append('cidade', cidade);
  formData.append('estado', estado);
  formData.append('bairro', bairro);
  formData.append('pais', pais);
  formData.append('numero', numero);
  formData.append('complemento', complemento);

  // Campos específicos do idoso
  formData.append('id_usuario', id_usuario);
  formData.append('cpf', cpf); // Nome do campo 'cpf' no backend
  formData.append('data_nascimento', data_nascimento); // Nome do campo 'data_nascimento' no backend
  formData.append('comorbidade', comorbidade_selecionada);
  formData.append('tipo_comorbidade', tipo_comorbidade);
  formData.append('descricao', descricao);
  formData.append('telefone_idoso', telefone_idoso);
  
  // 7. Converta booleanos para 1 ou 0 se as colunas no DB são BOOLEAN/TINYINT(1)
  // Se a coluna 'assinante_idoso' no DB for BOOLEAN:
  formData.append('assinante_idoso', assinante_idoso_checked ? 1 : 0); 
  // Se a coluna 'genero' no DB for BOOLEAN:
  formData.append('genero', genero_selecionado ? 1 : 0); 
  // Se a coluna 'genero' no DB for VARCHAR ou ENUM, use:
  // formData.append('genero', genero_selecionado);

  // 8. Envio para o backend;
  try {
      const response = await fetch("http://localhost:3000/idoso/cadastrar", {
          method: "POST",
          // IMPORTANTE: NÃO defina o 'Content-Type' manualmente para 'multipart/form-data'.
          // O navegador faz isso automaticamente e adiciona o 'boundary' necessário ao usar FormData.
          body: formData // Envie o objeto FormData diretamente
      });

      // Verifica se a resposta foi bem-sucedida (status 2xx) antes de tentar parsear como JSON
      if (!response.ok) {
          // Se não for sucesso, tente ler a resposta como texto ou JSON para depurar
          const errorText = await response.text();
          console.error('Erro na resposta do servidor (HTTP status diferente de 2xx):', response.status, errorText);
          throw new Error(`Erro do servidor: ${response.status} - ${errorText.substring(0, 100)}...`); // Lança um erro para o catch
      }

      const rs = await response.json(); // Tenta parsear a resposta como JSON

      if (rs.erro) {
          const msgErroIdoso = document.getElementById("msg_erro_idoso");
          if (msgErroIdoso) {
              msgErroIdoso.innerHTML = rs.erro;
          } else {
              console.error("Elemento 'msg_erro_idoso' não encontrado.", rs.erro);
              alert(`Erro: ${rs.erro}`);
          }
      } else {
          alert(rs.msg);
          const formIdoso = document.getElementById("form-idoso");
          if (formIdoso) {
              formIdoso.reset();
          } else {
              console.warn("Elemento 'form-idoso' não encontrado para resetar.");
          }
          
          // Ajuste a mensagem para coincidir com o backend ("Idoso cadastrado com sucesso!")
          if (rs.msg === "Idoso cadastrado com sucesso!") { 
              window.location.href = "pagina_listar_jovens.html"; // Ou para a página de listar idosos
          }
      }
  } catch (error) {
      console.error('Erro na requisição (rede, servidor ou parse do JSON):', error);
      // Exiba a mensagem de erro detalhada no elemento HTML
      const msgErroIdoso = document.getElementById("msg_erro_idoso");
      if (msgErroIdoso) {
          msgErroIdoso.innerHTML = `Ocorreu um erro: ${error.message || error}`;
      } else {
          alert(`Ocorreu um erro ao tentar cadastrar: ${error.message || error}. Verifique o console.`);
      }
  }
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
