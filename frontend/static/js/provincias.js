//funcion listar provincias
function listarProvincias() {
    let url = "http://localhost:3000/provincias";
    let listProvincias = [];
    fetch(url)
        .then(response => response.json())
        .then(data => {
            listProvincias= data
            listProvincias.map((provincia,i)=>{
                let fila= document.createElement("tr")
                fila.innerHTML = `
                <td>${provincia.nombre}</td>
                <td>${provincia.codigo_provincia}</td>
                <td>
                <a href="/provincias/editar/${provincia.codigo_provincia}" class="btn btn-warning">Editar</a>
                <button onclick="eliminarProvincia('${provincia.codigo_provincia}')" class="btn btn-danger">Eliminar</button>

                </td>
                `
                document.getElementById("provincias").appendChild(fila)
            })
        })
        .catch(error => console.log(error));
}
//funcion crear provincia
function crearProvincia() {
    if (obtenerDatosProvincia()== false){
        alert ('Ingresar datos completos')

    } else {
    var data = obtenerDatosProvincia()
    let url = "http://localhost:3000/provincias/create";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).then(location.href="/provincias") 
     .catch(error => console.log(error));}
}
//funcion obtener datos
function obtenerDatosProvincia(){
    let codigo_provincia = document.getElementById("codigo_provincia").value;
    let nombre = document.getElementById("nombre").value;
    if (codigo_provincia.length == 0 || nombre.length == 0) {
        return false;
    } else {
    let provincia = {codigo_provincia: codigo_provincia, nombre: nombre};
    return provincia;
    }
}


//funcion obtener codigo provincia
function getCodigo_Provincia(){
   const url = window.location.href;
   const codigo_provincia = url.substring(url.lastIndexOf('/') + 1);
    return codigo_provincia;
}


function obtenerProvincia(){
    let codigo_provincia = getCodigo_Provincia();
    let url = `http://localhost:3000/provincias/${codigo_provincia}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let codigo_provincia = document.getElementById("codigo_provincia");
            let nombre = document.getElementById("nombre");
            codigo_provincia.value = data.codigo_provincia;
            nombre.value = data.nombre;
        })
        .catch(error => console.log(error));

}

function editarProvincia(){
    let codigo_provincia = getCodigo_Provincia()
    let nombre = document.getElementById("nombre").value;
    let url = `http://localhost:3000/provincias/edit/${codigo_provincia}`;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            codigo_provincia: codigo_provincia,
            nombre: nombre
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.href="/provincias"
        })
        .catch(error => console.log(error));
}

//funcion eliminar provincia
function eliminarProvincia(codigo_provincia) {
    if(confirm("¿Está seguro de eliminar la provincia?")){
    let url = `http://localhost:3000/provincias/${codigo_provincia}`;
    fetch(url, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.href = "/provincias";
        })
        .catch(error => console.log(error));
    }
    alert("Provincia eliminada");
}
