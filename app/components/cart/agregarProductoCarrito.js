export const toastAgregar = () => {
    Toastify({
        text: "Juego agregado al Carrito correctamente",
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #008184, #00b09b)'
        }
    }).showToast();
    }