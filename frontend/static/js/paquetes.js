//funcion listar paquetes 
function listarPaquetes() {
    let listPaquetes = [];
    let url = 'http://localhost:3000/paquetes';
    fetch(url)
    .then(data => data.json())
    .then(paquetes => {
     listPaquetes = paquetes;
     // console.log(listPaquetes);
     listPaquetes.map((paquete, i) => {
         let row = document.createElement('tr');
         row.innerHTML = `
         <td>${paquete.codigo}</td>
         <td>${paquete.descripcion}</td>
         <td>${paquete.destinatario}</td>
         <td>${paquete.direccion}</td>
         <td>${paquete.provincium.nombre}</td>
         <td>
         <a href="/paquetes/editar/${paquete.codigo}" class="btn btn-warning">Editar</a>
        <button class = "btn btn-danger " onclick= "eliminarPaquete(${paquete.codigo})"> eliminar </button>
     </td>
 `;
 document.getElementById('paquetes').appendChild(row)
     })
    }).catch(error=>console.log(error))
   
 }
 
 
 
 //funcion crear paquete
 
 function crearPaquete() {
  var data = obtenerDatosPaquete()
     let url = "http://localhost:3000/paquetes/create";
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
             location.href="/paquetes"
         })
         .catch(error => console.log(error));
 }
 
 
 function eliminarPaquete(codigo){
     if(confirm("¿Está seguro que desea eliminar el paquete?")){
     let url = `http://localhost:3000/paquetes/${codigo}`;
     fetch(url, {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json'
         },
     })
         .then(response => response.json())
         .then(data => {
             console.log(data);
             location.href="/paquetes"
         })
         .catch(error => console.log(error));
     }
     alert("Paquete eliminado");
 }
 
 
 //funcion obtener codigo paquete
 function getCodigo(){
     let url = window.location.href;
     const urlArray = url.split("/");
     const codigo = urlArray[urlArray.length - 1];
     return codigo;
 }
 
 //obtener paquete 
 function obtenerPaquete(){
     let codigo = getCodigo();
     let url = `http://localhost:3000/paquetes/${codigo}`;
     fetch(url)
         .then(response => {return response.json()})
         .then(data => {
             document.getElementById("codigo").value = data.codigo;
             document.getElementById("descripcion").value = data.descripcion;
             document.getElementById("destinatario").value = data.destinatario;
             document.getElementById("direccion").value = data.direccion;
             document.getElementById("provincia").value = data.provincia;
 loadSelect(codigo_provincia = data.codigo_provincia)
         })
         .catch(error => console.log(error));
 }
 function obtenerDatosPaquete(){
     let codigo = document.getElementById("codigo").value;
     let descripcion = document.getElementById("descripcion").value;
     let destinatario = document.getElementById("destinatario").value;
     let direccion = document.getElementById("direccion").value;
     let codigo_provincia = document.getElementById("codigo_provincia").value;
     
     if(codigo.length == 0 || descripcion.length == 0 || destinatario.length == 0 || direccion.length == 0){
         return false;
     }else{
 
     let data = {codigo: codigo, descripcion: descripcion, destinatario: destinatario, direccion: direccion, codigo_provincia: codigo_provincia}
     return data;
     }
 }
 
 
 //funcion editar paquete
 
 function editarPaquete(){
     let codigo = getCodigo();
     let url = `http://localhost:3000/paquetes/edit/${codigo}`;
     var data = obtenerDatosPaquete()
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
             location.href="/paquetes"
         })
         .catch(error => console.log(error));
 }
 function getProvincia(provincias, provincia){
     let url = `http://localhost:3000/provincias`;
     fetch(url, {})
         .then(response => {return response.json()})
         .then(data => {
             let html = `<option value="null">Seleccione una provincia</option>`;
             let select =''
             data.map(item => {
                 if(item.codigo_provincia == provincia){
                     select = 'selected'
                 }else {
                     select = ''
                 }
                 html += `<option value="${item.codigo_provincia}" ${select}>${item.nombre}</option>`;
             });
             provincias.innerHTML = html;
         })
 }
 
 //funcion que verifica que coincidan los codigos de las prov
 function loadSelect(provincia = null){ 
     const provincias = document.getElementById("codigo_provincia");
     getProvincia(provincias, provincia); //pasa dos parametros
 
 }