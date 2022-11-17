//funcion listar camiones
function listarCamiones() {
    let listCamiones = [];
    let url = 'http://localhost:3000/camiones';
    fetch(url)
        .then(data => data.json())
        .then(camiones => {
        listCamiones = camiones;
        listCamiones.map((camion, i) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${camion.matricula}</td>
                <td>${camion.modelo}</td>
                <td>${camion.tipo}</td>
                <td>${camion.potencia}</td>
                <td>
                    <a href="/camiones/editar/${camion.matricula}" class="btn btn-warning">Editar</a>
                    <a href="/camiones/delete/${camion.matricula}" class="btn btn-danger">Eliminar</a>
                </td>
            `;
            document.getElementById('camiones').appendChild(row);
})
        })
        .catch(err => console.log(err));
} 

//obtener datos de camion
function obtenerDatosCamiones() {
    let matricula = document.getElementById("matricula").value;
    let tipo = document.getElementById("tipo").value;
    let modelo = document.getElementById("modelo").value;
    let potencia = document.getElementById("potencia").value;

    var data = { matricula: matricula, tipo: tipo, modelo: modelo, potencia: potencia };
    return data;
}

//funcion crear camion

function crearCamion() {
    
    let url = "http://localhost:3000/camiones";
    var data = obtenerDatosCamiones();
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}


//funcion eliminar camion
function eliminarCamion(matricula) {
    if(confirm("¿Está seguro que desea eliminar el camion?")){
    let url = `http://localhost:3000/camiones/${matricula}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
           location.href = '/camiones';
        })
        .catch(error => console.log(error));
    }
    alert("El camion ha sido eliminado");
}




//funcion para obtener matricula del camion
function getMatricula(){
    const url = window.location.href;
    const matricula = url.substring(url.lastIndexOf('/') + 1);
    return matricula;

}

//funcion obtener camion
function obtenerCamion() {
    let matricula = getMatricula();
    const url = `http://localhost:3000/camiones/${matricula}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let matricula = document.getElementById("matricula");
            let tipo = document.getElementById("tipo");
            let modelo = document.getElementById("modelo");
            let potencia = document.getElementById("potencia");
            matricula.value = data.matricula;
            tipo.value = data.tipo;
            modelo.value = data.modelo;
            potencia.value = data.potencia;
        })
        .catch(error => console.log(error));
}




//funcion editar camion

function editarCamion() {
    let matricula = getMatricula();
    let tipo = document.getElementById("tipo").value;
    let modelo = document.getElementById("modelo").value;
    let potencia = document.getElementById("potencia").value;
    let url = `http://localhost:3000/camiones/edit/${matricula}`;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            tipo: tipo,
            modelo: modelo,
            potencia: potencia
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.href = '/camiones';
        })
        .catch(error => console.log(error));
}