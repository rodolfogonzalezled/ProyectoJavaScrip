export const toastEliminar = () => {
    Toastify({
        text: "Unidad seleccionada ha sido eliminada del carrito correctamente",
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #C70039, #F5150A)'
        }
    }).showToast();
}