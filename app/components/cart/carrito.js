//------------------------------ Carrrito ----------------------------------------------
import { productos } from "../../data/productos.js";
import { cerrarCarrito } from "../modal/modal.js";

let totalMostrar = document.getElementById("total");
let subtotalMostrar = document.getElementById("subtotal");
let descuentoMostrar = document.getElementById("descuento");
let contadorCarrito = document.getElementById('contadorCarrito');
let carritoContenedor = document.getElementById("carritoContenedor");
let btnPagar = document.getElementById("btnPagar");
let carrito = [];
let total = 0;

//-------------- Agregar al Carrito -------------------------------------------------------------------
export default function agregarCarrito(idProducto) {
    const productoSeleccionado = productos.find(el => el.id == idProducto);
    if (productoSeleccionado.stock >= 1) {
        let productoRepetido = carrito.find(el => el.id == idProducto);
        if (productoRepetido) {
            productoRepetido.cantidad++;
            ajusteNegativoStock(productoRepetido);
            actualizarCantidad(productoRepetido);
        } else {
            carrito.push(productoSeleccionado);
            ajusteNegativoStock(productoSeleccionado);
            pintarElementosCarrito(carrito); 
        }
        actualizaContadoryTotal();
    } 
    if (productoSeleccionado.stock == 0) {
        let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito${idProducto}`)
        btnAgregarCarrito.textContent = 'Agotado';
        btnAgregarCarrito.disabled = true;
    } 
}

export const actualizaContadoryTotal = ()  => {
    actualizarContadorCarrito(carrito);
    calcularTotal(carrito);
}

export const pintarElementosCarrito = () => {
    carritoContenedor.innerHTML = "";
    carrito.map((producto) => {
        let divContenedor = document.createElement("div");
        divContenedor.classList.add("flex-row");

        divContenedor.innerHTML = `
                    <a id="btnBorrarProducto${producto.id}"> <i class="btn bi bi-trash"></i></a>
                    <p>Juego: ${producto.nombre}</p>
                    <p id='cantidad${producto.id}' class="pl">Cantidad: ${producto.cantidad}</p>
                    <p>Precio: $ ${producto.precio}</p>
                `;
        carritoContenedor.appendChild(divContenedor);

        let btnBorrarProducto = document.getElementById(`btnBorrarProducto${producto.id}`);

        btnBorrarProducto.addEventListener('click', () => {
            producto.cantidad--;
            actualizarCantidad(producto);
            ajustePositivoStock(producto);

            if (producto.cantidad == 0) {
                btnBorrarProducto.parentElement.remove();
                carrito = carrito.filter(el => el.id != producto.id);
            }
            actualizarContadorCarrito(carrito);
            calcularTotal(carrito);
            toastEliminar();
        });
    });
}

//------- Calcular el total ----------------------------------------------------------------------
const calcularTotal = (carrito) => {
    total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0); //Suma todos los precios de los elementos seleccionados
    subtotalMostrar.innerText = total;
    if ( carrito.reduce((acc, el) => acc + el.cantidad, 0) > 5) {
        descuentoMostrar.innerText = '¡FELICIDADES! Obtuviste un descuento del 20%';
        descuentoMostrar.classList.remove("ocultar");
        descuentoMostrar.classList.add("flex-row", "flex-r-end");
        total = total - (total * 0.20);
    } else if (carrito.reduce((acc, el) => acc + el.cantidad, 0) > 2) {
        descuentoMostrar.innerText = '¡FELICIDADES! Obtuviste un descuento del 10%';
        descuentoMostrar.classList.remove("ocultar");
        descuentoMostrar.classList.add("flex-row", "flex-r-end");
        total = total - (total * 0.10);
    } else {
        descuentoMostrar.classList.remove("flex-row", "flex-r-end");
        descuentoMostrar.classList.add("ocultar");
    }
    totalMostrar.innerText = total;
}

const actualizarContadorCarrito = (carrito) => {
    contadorCarrito.textContent = carrito.length > 0 ? carrito.reduce((acc, el) => acc + el.cantidad, 0) : '';
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const ajusteNegativoStock = (producto) => {
    producto.stock--;
}

const ajustePositivoStock = (producto) => {
    producto.stock++;
    let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito${producto.id}`)
    btnAgregarCarrito.textContent = 'Añadir al carrito';
    btnAgregarCarrito.disabled = false;
}

const actualizarCantidad = (producto) => {
    let cantidad = document.getElementById(`cantidad${producto.id}`);
    cantidad.innerHTML = `<p id='cantidad${producto.id}'>Cantidad: ${producto.cantidad}</p>`;
}

const pagar = () => {
    if (carrito.length) {
        swal("Gracias por tu compra!", "Que lo disfrutes al máximo!", "success");
        carritoContenedor.innerHTML = "";
        descuentoMostrar.innerText = "";
        contadorCarrito.innerText = "";
        subtotalMostrar.innerText = 0;
        totalMostrar.innerText = 0;
        cerrarCarrito();
        localStorage.removeItem('carrito');
    }
}

btnPagar.addEventListener('click', pagar);

export const asignarStorageACarrito = (carritoStorage) => {
    carrito = carritoStorage;
}

const toastEliminar = () => {
    Toastify({
        text: "Unidad seleccionada ha sido eliminada del carrito correctamente",
        duration: 1000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #C70039, #F5150A)'
            }
    }).showToast();
}