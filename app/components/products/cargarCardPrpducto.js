//---------- Crear el HTML de cada uno de los cards de los productos ----------------------------
import agregarCarrito, { asignarStorageACarrito, pintarElementosCarrito, actualizaContadoryTotal } from "../cart/carrito.js";

let contenedorProductos = document.getElementById('productos');
let carritoStorage = [];

export function cargarCardProducto(productos) {
    cargarStorageAlCarrito();
    
    contenedorProductos.innerHTML = '';
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
            toastAgregar();
        });
    });
}

const cargarStorageAlCarrito = () => {
    if (localStorage.getItem("carrito")) {
        carritoStorage = JSON.parse(localStorage.getItem("carrito"));
        asignarStorageACarrito(carritoStorage);
        pintarElementosCarrito();
        actualizaContadoryTotal();
    }
}

const toastAgregar = () => {
    Toastify({
        text: "Juego agregado al Carrito correctamente",
        duration: 1000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #008184, #00b09b)'
        }
    }).showToast();
}
//----------------------------------------------------------------