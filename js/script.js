

const botao_cadastrar=document.getElementById("botao_cadastrar");
botao_cadastrar.onclick=()=>{
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
            alert(rs.msg)
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


const btn_modal = document.querySelector("#btn-modal-cadastro")
const modal = document.querySelector("dialog")
const btn_fechar = document.querySelector("#btn_cancelar_cadastro")

btn_modal.onclick = function(){
    modal.showModal()
    
}

btn_fechar.onclick = function(){
    modal.close()
}

 
const btn_modal_login = document.querySelector("#btn-modal-login")
const modal_login = document.querySelector("#dialog-login")
const btn_fechar_login = document.querySelector("#btn_cancelar_login")
 
btn_modal_login.onclick = function(){
    modal_login.showModal()
   
}
 
btn_fechar_login.onclick = function(){
    modal_login.close()
}


////////////////////    limpar dados do form    ///////////////

    const form = document.getElementById("form-usuario");
    const botaoCancelar = document.getElementById("btn_cancelar_cadastro");
    
  
    

    botaoCancelar.addEventListener("click", function (event) {
        event.preventDefault(); // Impede envio e recarregamento da página
    
        
    
        // Limpa o formulário
        form.reset();
      });
  

  
  ////////////////////    levar para outra guia    ///////////////
