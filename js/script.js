
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
    const cep=document.getElementById("cep")[0]
    const logradouro=document.getElementById("logradouro")[0]
    const logradouro_nome=document.getElementById("logradouro_nome")[0]
    const cidade=document.getElementById("cidade")[0]
    const estado =document.getElementById("estado")[0]
    const bairro=document.getElementById("bairro")[0]
    const pais =document.getElementById("pais")[0]

    alert(`${cep.value} ${logradouro.value} ${logradouro_nome.value} ${cidade.value} ${estado.value} ${bairro.value} ${pais.value}`)
   
    fetch("http://localhost:3000/endereco/cadastrar",{
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
    if(document.getElementById("cep").value.trim()==""){
        alert("os campos não podem ser nulos");
        return
    }
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

function form_step3() {
    if(document.getElementById("numero").value.trim()=="" 
    || document.getElementById("complemento").value.trim()=="")
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

function form_step6() {

    if(document.getElementById("genero_masc").value.trim()=="" 
    || document.getElementById("genero_fem").value.trim()=="")
    {
        alert("os campos não podem ser nulos");
        return
    }

  document.getElementsByClassName("form-step")[6].style.display = "block";
  document.getElementsByClassName("form-step")[5].style.display = "none";
  updateProgressBar(7); // Etapa 7
}

  
  ////////////////////    levar para outra guia    ///////////////
