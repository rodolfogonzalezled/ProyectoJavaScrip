//------ Modal Carrrito ----------------------------------------------

let btnAbrirCarrito = document.getElementById('btnAbrirCarrito');
let btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
let contenedorModal = document.getElementById('modalContenedor');
let modalCarrito = document.getElementById('modalCarrito');

btnAbrirCarrito.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
btnCerrarCarrito.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
})
contenedorModal.addEventListener('click', () => {
    cerrarCarrito();
})

export const cerrarCarrito = () => {
    btnCerrarCarrito.click();
}