const registrarUsuario = async ()=>{
    const name = document.getElementById('nombre').value;
    const surname = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('contraseña').value;
    const confirmPassword = document.getElementById('recontraseña').value;
    const profesional = document.getElementById('profesional').checked;
    const estudiante = document.getElementById('estudiante').checked;
    const policyCheck = document.getElementById('policyCheck').checked;
    let typeUserId = '';
  
    if(!policyCheck){
        return alert('Debes aceptar las politicas antes de registrarte')
    }

    if(password !== confirmPassword){
        return alert('Las contraseñas no coinciden');
    }

    if(profesional){
        typeUserId = 1;
    } else typeUserId = 2;

    console.log(typeUserId);

    const peticion = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify({name, surname, email, typeUserId, password}),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const respuesta =  await peticion.json();

    alert(respuesta.res);

    if(peticion.ok){
        return location.href ='/view/login';
    }
    
}


const loginUsuario = async ()=>{

    const email = document.getElementById('correo').value;
    const password = document.getElementById('contraseña').value;
    
    const peticion = await fetch('http://localhost:3000/api/login',{
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-type': 'application/json'
        }
    })

    const respuesta = await peticion.json();

    console.log(respuesta);

    if(peticion.ok){
        localStorage.setItem('logged', JSON.stringify({name: respuesta.name, isLogged: respuesta.isLogin}));

        alert(respuesta.res);
        return location.href = '/view/';
    }

}