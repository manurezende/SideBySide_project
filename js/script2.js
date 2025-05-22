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
 
  const valorSelecionado = document.querySelector('input[name="Experiencia"]:checked');
 
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
