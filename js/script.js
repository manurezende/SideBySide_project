console.log("Site SIDEBYSIDE carregado com sucesso!");
const botao_cadastrar=document.getElementById("botao_cadastrar");
botao_cadastrar.onclick=()=>{
    const nome_usuario=document.getElementsByName("nome_usuario")[0]
    const foto=document.getElementsByName("foto")[0]
    const senha=document.getElementsByName("senha")[0]
    const tipo_usuario =document.getElementsByName("tipo_usuario")[0]
    const tipo_logradouro=document.getElementsByName("tipo_logradouro")[0]
    const logradouro=document.getElementsByName("logradouro")[0]
    const numero=document.getElementsByName("numero")[0]
    const complemento=document.getElementsByName("complemento")[0]
    const estado=document.getElementsByName("estado")[0]
    const cidade=document.getElementsByName("cidade")[0]
    const bairro=document.getElementsByName("bairro")[0]
    const cep=document.getElementsByName("cep")[0]
    const pais=document.getElementsByName("pais")[0]
    const email=document.getElementsByName("email")[0]
    const telefone_celular=document.getElementsByName("telefone_celular")[0]
    const telefone_fixo=document.getElementsByName("telefone_fixo")[0]
   
    fetch("http://localhost:3000/usuario/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nome_usuario:nome_usuario.value,
            foto_usuario:foto.value,
            senha:senha.value,
            tipo_usuario:tipo_usuario.value




        })
    })


}