let totalMostrar = document.getElementById("total");
let subtotalMostrar = document.getElementById("subtotal");
let descuentoMostrar = document.getElementById("descuento");
let abrirCarrito = document.getElementById('btnAbrirCarrito');
let cerrarCarrito = document.getElementById('btnCerrarCarrito');
let contadorCarrito = document.getElementById('contadorCarrito');
let carritoContenedor = document.getElementById("carritoContenedor");
let contenedorModal = document.getElementById('modalContenedor');
let modalCarrito = document.getElementById('modalCarrito');
let carrito = [];
let total = 0;

abrirCarrito.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
cerrarCarrito.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
})
contenedorModal.addEventListener('click', () => {
    cerrarCarrito.click()
})

//-------------- Agregar al Carrito -------------------------------------------------------------------

function agregarCarrito(idProducto) {
    const productoSeleccionado = productos.find(x => x.id == idProducto);
    if (productoSeleccionado.stock >= 1) {
        carrito.push(productoSeleccionado);
        actualizarContadorCarrito();
        productoSeleccionado.ajustarStock();
        carritoContenedor.innerHTML = "";
        for (const producto of carrito) {
            let divContenedor = document.createElement("div");
            divContenedor.classList.add("flex-row");

            divContenedor.innerHTML = `
                <a id="btnBorrarProducto${producto.id}"> <i class="btn bi bi-trash"></i></a>
                <p>Juego: ${producto.nombre}</p>
                <p>Precio: $ ${producto.precio}</p>
            `;
            carritoContenedor.appendChild(divContenedor);

            let btnBorrarProducto = document.getElementById(`btnBorrarProducto${producto.id}`);

            btnBorrarProducto.addEventListener('click', () => {
                btnBorrarProducto.parentElement.remove();
                carrito = carrito.filter(el => el.id != producto.id);
                actualizarContadorCarrito();
                calcularTotal();
            });
        }
        calcularTotal();
    } 
    if (productoSeleccionado.stock == 0) {
        let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito${idProducto}`)
        btnAgregarCarrito.textContent = 'Agotado';
        btnAgregarCarrito.disabled = true;
    }
}

//------- Calcular el total ----------------------------------------------------------------------
function calcularTotal() {
    total = carrito.reduce((acc, el) => acc + el.precio, 0); //Suma todos los precios de los elementos seleccionados
    subtotalMostrar.innerText = total;
    if (carrito.length > 5) {
        descuentoMostrar.innerText = '¡FELICIDADES! Obtuviste un descuento del 20%';
        descuentoMostrar.classList.remove("ocultar");
        descuentoMostrar.classList.add("flex-row", "flex-r-end");
        total = total - (total * 0.20);
    } else if (carrito.length > 2) {
        descuentoMostrar.innerText = '¡FELICIDADES! Obtuviste un descuento del 10%';
        descuentoMostrar.classList.remove("ocultar");
        descuentoMostrar.classList.add("flex-row", "flex-r-end");
        total = total - (total * 0.10);
    } else {
        descuentoMostrar.classList.remove("flex-row", "flex-r-end");
        descuentoMostrar.classList.add("ocultar");
    }
    totalMostrar.innerText = total;
    console.log('El monto a pagar es: ' + total); // Precio total a pagar
}

function actualizarContadorCarrito() {
    contadorCarrito.textContent = carrito.length > 0 ? carrito.length : '';
}