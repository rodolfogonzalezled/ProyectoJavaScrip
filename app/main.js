//---------------------------------------------------------------------------------------------------------------
//                   Desafio - RODOLFO GONZALEZ
//---------------------------------------------------------------------------------------------------------------
import agregarCarrito, { asignarStorageACarrito, pintarElementosCarrito, actualizaContadoryTotal } from "./components/cart/carrito.js";
import { productos } from "./data/productos.js";



let inputBuscarNombre = document.getElementById("buscarNombre");
let categoria = document.getElementById("categoria");
let selectOrdenar = document.getElementById("ordenar");
let contenedorProductos = document.getElementById('productos');
let carritoStorage = [];

inputBuscarNombre.addEventListener('keyup', buscarProducto);
categoria.addEventListener('change', filtrarCategoria);
selectOrdenar.addEventListener("change", ordenar);
cargarCardProducto(productos);

//-------------- Buscar por nombre -------------------------------------------------------------
function buscarProducto() {
    const productosEncontrados = productos.filter(el => el.nombre.toUpperCase().includes(inputBuscarNombre.value.toUpperCase()));
    cargarCardProducto(productosEncontrados);
}

//-------------- filtrar por categoria -----------------------------------------------------------
function filtrarCategoria() {
    const productosEncontrados = productos.filter(el => el.categoria == categoria.value);
    cargarCardProducto(productosEncontrados);
}

//-------------- Ordenar ------------------------------------------------------------------------
function ordenar() {
    switch (selectOrdenar.value) {
        case "nombre":
            ordenarPorNombre();
            break;
        case "precio":
            ordenarPorPrecio();
            break;
        case "anio":
            ordenarPorAnio();
            break;
        default:
            break;
    }
}

function ordenarPorNombre() {
    const productosOrdenados = productos.sort((a, b) => a.nombre.toUpperCase() < b.nombre.toUpperCase() ? -1 : 1); //--- reordena el array segun el nombre por orden alfabetico
    cargarCardProducto(productosOrdenados);
}

function ordenarPorPrecio() {
    const productosOrdenados = productos.sort((a, b) => a.precio < b.precio ? -1 : 1); //--- reordena el array por precio de menor a mayor precio
    cargarCardProducto(productosOrdenados);
}

function ordenarPorAnio() {
    const productosOrdenados = productos.sort((a, b) => a.anioPublicacion < b.anioPublicacion ? -1 : 1); //--- reordena el array por año de publicación desde el mas viejo al mas nuevo
    cargarCardProducto(productosOrdenados);
}

//---------- Crear el HTML de cada uno de los cards de los productos ----------------------------
function cargarCardProducto(productos) {
    if (localStorage.getItem("carrito")) {
        carritoStorage = JSON.parse(localStorage.getItem("carrito"));
        asignarStorageACarrito(carritoStorage);
        pintarElementosCarrito();
        actualizaContadoryTotal();
    }

    contenedorProductos.innerHTML = '';
    console.log(productos);
    productos.map((producto) => {

        let divContenedor = document.createElement("div");
        divContenedor.classList.add("col-md-6", "col-lg-4");

        divContenedor.innerHTML = `
            <div class="card products">
                <img class="products__img" src=${producto.imagen} alt=${producto.nombre}>
                <div class="card-body products__info">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <div class="card-text">
                        <p>Precio: $ ${producto.precio}</p>
                        <p>Categoria: ${producto.categoria}</p>
                        <p>Año de Publicación: ${producto.anioPublicacion}</p>
                    </div>
                    <div class="d-grid col-6 mx-auto">
                        <button id="btnAgregarCarrito${producto.id}" type="button" class="btn btn-outline-primary">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(divContenedor);

        let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito${producto.id}`);

        btnAgregarCarrito.addEventListener('click', () => {
            agregarCarrito(producto.id)
        });
    });
}

//----------------------------------------------------------------

