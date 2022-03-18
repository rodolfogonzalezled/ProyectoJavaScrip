//------------------------------ Carrrito ----------------------------------------------
import obtenerProductos from "../../data/obtenerProductos.js";
import { cerrarCarrito } from "../modal/modal.js";
import { toastError } from "./utils/toast.js";

let productos = [];
let totalMostrar = document.getElementById("total");
let subtotalMostrar = document.getElementById("subtotal");
let descuentoMostrar = document.getElementById("descuento");
let contadorCarrito = document.getElementsByClassName('contadorCarrito');
let carritoContenedor = document.getElementById("carritoContenedor");
let btnPagar = document.getElementById("btnPagar");
let carrito = [];
let total = 0;

obtenerProductos().then(data => productos = data);

//-------------- Agregar al Carrito -------------------------------------------------------------------

export default function agregarCarrito(idProducto) {
    deshabilitarBtnPagar(false);
    const productoSeleccionado = productos.find(el => el.id == idProducto);
    if (productoSeleccionado.stock >= 1) {
        let productoRepetido = carrito.find(el => el.id == idProducto);
        if (productoRepetido) {
            productoRepetido.cantidad++;
            ajusteNegativoStock(productoRepetido);
            actualizarCantidad(productoRepetido);
        } else {
            ajusteNegativoStock(productoSeleccionado);
            ajustePositivoCantidad(productoSeleccionado);
            carrito.push(productoSeleccionado);
            pintarElementosCarrito(); 
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
            actualizaContadoryTotal();
            calcularTotal(carrito);
            toastError("❌ Unidad seleccionada ha sido eliminada del carrito correctamente");
            !carrito.length && (deshabilitarBtnPagar(true));
        });
    });
}

//------- Calcular el total ----------------------------------------------------------------------
const calcularTotal = (carrito) => {
    total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0); //Suma todos los precios de los elementos seleccionados
    subtotalMostrar.innerText = total;
    if (carrito.reduce((acc, el) => acc + el.cantidad, 0) > 5) {
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
    for (let i = 0; i < contadorCarrito.length; i++) {
        contadorCarrito[i].textContent = carrito.length > 0 ? carrito.reduce((acc, el) => acc + el.cantidad, 0) : '';
    }
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

const ajustePositivoCantidad = (producto) => {
    producto.cantidad++;
}

const actualizarCantidad = (producto) => {
    let cantidad = document.getElementById(`cantidad${producto.id}`);
    cantidad.innerHTML = `<p id='cantidad${producto.id}'>Cantidad: ${producto.cantidad}</p>`;
}

export const asignarStorageACarrito = (carritoStorage) => {
    carrito = carritoStorage;
}

btnPagar.addEventListener('click', () => {
    if (carrito.length) {
        swal("Gracias por tu compra!", "Que lo disfrutes al máximo!", "success");
        limpiarCarrito();
        reiniciarModalCarrito();
        cerrarCarrito();
    }
});

const limpiarCarrito = () => {
    localStorage.removeItem('carrito');
    carrito.forEach(el => el.cantidad = 0);
    carrito = [];
}

const reiniciarModalCarrito = () => {
    for (let i = 0; i < contadorCarrito.length; i++) {
        contadorCarrito[i].innerText = "";
    }
    carritoContenedor.innerHTML = "";
    descuentoMostrar.innerText = "";
    subtotalMostrar.innerText = 0;
    totalMostrar.innerText = 0;
    deshabilitarBtnPagar(true);
}

const deshabilitarBtnPagar = (deshabilitar) => {
    btnPagar.disabled = deshabilitar;
}