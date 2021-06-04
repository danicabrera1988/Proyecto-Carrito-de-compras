// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; 

cargarEventListeners();

function cargarEventListeners() {
    // Cuando se agrega un curso presionando 'Agregar al carrito'.
    listaCursos.addEventListener('click', agregarCursos)

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Mostrar los cursos del carrito
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; // Resetar arreglo

        limpiarHTML(); // Eliminar todo el HTML
    })
}

// Funciones
function agregarCursos(e) {
    e.preventDefault() // Detiene la ejecucion (<a>)

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    //console.log(e.target.classList.contains('borrar-curso'));

    if(e.target.classList.contains('borrar-curso')){
       const cursoId = e.target.getAttribute('data-id');
        // Eliminar articuloCarrito cel arreglo por data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); // FILTER: Crea un nuevo arreglo con alguna condicion
        
        carritoHTML();
    }

}

// Lee el contenido del HTML al que se dio click y extrae la info del curso
function leerDatosCurso(curso) {
    console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Controla si ya existe un elemento igual en el carrito
    const existe = articulosCarrito.some(cursoCarrito => cursoCarrito.id === infoCurso.id);
    if(existe){
        // Actualizar la cantidad
        const cursos = articulosCarrito.map( cursoCarrito => { // MAP: Crea un nuevo arreglo
            if(cursoCarrito.id === infoCurso.id){
                cursoCarrito.cantidad++;
                return cursoCarrito;
            }else{
                return cursoCarrito;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

// Mostrar array de carrito en el HTML
function carritoHTML() {

    // limpiar el HTML
    limpiarHTML();
    
    // Recorre el vector y genera un HMTL
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso; // Destructuring: Genera una variable para cada valñor del objeto. 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;

        // Agregar el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);
    })

    // Agregar el carrito al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}