function listarCamioneros() {
    let listCamioneros = [];
    let url = 'http://localhost:3000/camioneros';
    fetch(url)
        .then(data => data.json())
        .then(camioneros => {
        listCamioneros = camioneros;
        listCamioneros.map((camionero, i) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${camionero.dni}</td>
                <td>${camionero.nombre}</td>
                <td>${camionero.telefono}</td>
                <td>${camionero.direccion}</td>
                <td>${camionero.salario}</td>
                <td>${camionero.poblacion}</td>
                <td>
                    <a href="/camioneros/editar/${camionero.dni}" class="btn btn-warning">Editar</a>
                    <a href="/camioneros/delete/${camionero.dni}" class="btn btn-danger">Eliminar</a>
                </td>
            `;
            document.getElementById('camioneros').appendChild(row);
})
        })
        .catch(err => console.log(err));
} 


function obtenerDatos(){
    let dni = document.getElementById("dni").value;
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let salario = document.getElementById("salario").value;
    let poblacion = document.getElementById("poblacion").value;
    
    
    var data = {dni : dni, nombre : nombre, telefono : telefono, direccion : direccion, salario : salario, poblacion : poblacion};
    return data;
}

function crearCamionero(){
    var url = 'http://localhost:3000/camioneros';
var data = obtenerDatos();
fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data), 
  headers:{
    'Content-Type': 'application/json'
  },
})
.then(response => response.json())
.then(data => {
    console.log(data);
    location.href="/camioneros"
})
.catch(error => console.log(error));
  
}

//funcion eliminar camionero

function eliminarCamionero(dni) {
    if(confirm("¿Está seguro que desea eliminar el camionero?")){
    let url = `http://localhost:3000/camioneros/${dni}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.href = '/camioneros';
        })
        .catch(error => console.log(error));
    }
    alert("El camionero ha sido eliminado");
}

//funcion para obtener dni del camionero
function getDniCamionero() {
 const url = window.location.href;
    const urlArray = url.split('/');   
    const dni = urlArray[urlArray.length - 1];
    return dni;
    console.log(dni);
}
//funcion get camionero

function getCamionero() {
    let id = getDniCamionero();
    let url = `http://localhost:3000/camioneros/${id}`;
    fetch(url)
        .then(response => {return response.json()})
        .then(data => {
            document.getElementById("dni").value = data.dni;
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("telefono").value = data.telefono;
            document.getElementById("direccion").value = data.direccion;
            document.getElementById("salario").value = data.salario;
            document.getElementById("poblacion").value = data.poblacion;
            
        })
        .catch(error => console.log(error));
}

//funcion editar camionero

function editarCamionero(){
    let id = getDniCamionero();
    let url = `http://localhost:3000/camioneros/edit/${id}`;
    const nombre = document.getElementById('nombre');
    const dni = document.getElementById('dni');
    const direccion = document.getElementById('direccion');
    const telefono = document.getElementById('telefono');
    const salario = document.getElementById('salario');
    const poblacion = document.getElementById('poblacion');
    
    const data = {
      'nombre': nombre.value,
      'dni': dni.value,
      'direccion': direccion.value,
      'telefono': telefono.value,
      'salario': salario.value,
      'poblacion': poblacion.value
    }
    
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      },
  })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          location.href = '/camioneros';
      })
      .catch(error => console.log(error));
    }

