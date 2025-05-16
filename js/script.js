
function cadastrar_usuario(){
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
        
        if(tipo_usuario.value==1){

          window.location.href="cadastro_jovem.html"  
          }
        else{
            window.location.href="cadastro_idoso.html"
        }}
    })


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



function cadastrar_endereço(){
    const cep = document.getElementById("cep");
    const logradouro = document.getElementById("logradouro");
    const logradouro_nome = document.getElementById("logradouro_nome");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const bairro = document.getElementById("bairro");
    const pais = document.getElementById("pais");

    // alert(`${cep.value} ${logradouro.value} ${logradouro_nome.value} ${cidade.value} ${estado.value} ${bairro.value} ${pais.value}`)
   
    fetch("http://localhost:3000/endereco/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            cep: cep.value,
            logradouro: logradouro.value,
            logradouro_nome: logradouro_nome.value,
            cidade: cidade.value,
            estado: estado.value,
            bairro: bairro.value,
            pais: pais.value
        })
    })
    .then((res)=>res.json())
    .then((rs)=>
    {
              
        if(rs.erro=="erro ao tentar cadastrar endereco"){
            return document.getElementById("msg_login").innerHTML=rs.erro
        }

        
        else{
            
            alert(rs.msg)
            document.getElementById("form-idoso").reset();
        
            if(rs.msg == "endereco cadastrado"){

                window.location.href="pagina_inicial.html"  
                }
            
             }
          })
          
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
  
    if (cep === '') {
      alert('O campo CEP não pode estar vazio.');
      return;
    }
  
    if (cep.length !== 8) {
      alert('CEP inválido. Deve conter 8 dígitos.');
      return;
    }
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao consultar o CEP.');
        }
        return response.json();
      })
      .then(data => {
        if (data.erro) {
          alert('CEP não encontrado.');
          return;
        }
  
        // Preenche os campos do formulário com os dados retornados
        const logradouroCompleto = data.logradouro || '';
        const logradouroParts = logradouroCompleto.split(' ');
        const tipoLogradouro = logradouroParts[0];
        const nomeLogradouro = logradouroParts.slice(1).join(' ');
  
        // Define o tipo de logradouro no select
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
  
    
      })
      .catch(error => {
        console.error(error);
        alert('Erro ao buscar o endereço. Tente novamente.');
      });
      
      
    document.getElementsByClassName("form-step")[0].style.display = "block";
    document.getElementsByClassName("form-step-active")[0].style.display = "none";
    updateProgressBar(1); // Etapa 1
}

function form_step1() {
    if(document.getElementById("logradouro").value=="Selecione" 
    || document.getElementById("logradouro_nome").value.trim()=="")
    {
        alert("os campos não podem ser nulos");
        return
    }
    document.getElementsByClassName("form-step")[1].style.display = "block";
    document.getElementsByClassName("form-step")[0].style.display = "none";
    updateProgressBar(2); // Etapa 2

}

function form_step2() {
    if
    (document.getElementById("cidade").value.trim()==""
    || document.getElementById("estado").value.trim()=="" 
    || document.getElementById("bairro").value.trim()==""
    || document.getElementById("pais").value.trim()==""
    ){
        alert("os campos não podem ser nulos");
        return
    }

    document.getElementsByClassName("form-step")[2].style.display = "block";
    document.getElementsByClassName("form-step")[1].style.display = "none";
    updateProgressBar(3); // Etapa 3
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

function form_step3() {
    if(document.getElementById("numero").value.trim()=="" )
    {
        alert("os campos não podem ser nulos");
        return
    }

  document.getElementsByClassName("form-step")[3].style.display = "block";
  document.getElementsByClassName("form-step")[2].style.display = "none";
  updateProgressBar(4); // Etapa 4
}

function form_step4() {

    if(document.getElementById("telefone_celular_idoso").value.trim()=="" 
    || document.getElementById("data_nascimento_idoso").value.trim()=="")
    {
        alert("os campos não podem ser nulos");
        return
    }

  document.getElementsByClassName("form-step")[4].style.display = "block";
  document.getElementsByClassName("form-step")[3].style.display = "none";
  updateProgressBar(5); // Etapa 5
}

function form_step5() {

    if(document.getElementById("cpf_idoso").value.trim()==""
    || document.getElementById("foto_idoso").value.trim()=="")
    {
        alert("os campos não podem ser nulos");
        return
    }

  document.getElementsByClassName("form-step")[5].style.display = "block";
  document.getElementsByClassName("form-step")[4].style.display = "none";
  updateProgressBar(6); // Etapa 6
}

function form_step6() 
{
    if(document.getElementById("comorbidade_sim").value=="" 
    || document.getElementById("comorbidade_nao").value=="")
    {
        alert("os campos não podem ser nulos");
        return
    }
  
    

  document.getElementsByClassName("form-step")[6].style.display = "block";
  document.getElementsByClassName("form-step")[5].style.display = "none";
  updateProgressBar(7); // Etapa 7
}

function desativar_comorbidade(){
    document.querySelector("#tipo_comorbidade").disabled = true;
}
function ativar_comorbidade(){
    document.querySelector("#tipo_comorbidade").disabled = false;
}

document.getElementById("comorbidade_sim").onclick=()=>{
    tipo_comorbidade.disabled = false;
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
  ////////////////////    levar para outra guia    ///////////////
