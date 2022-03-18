var btnTop = document.getElementById("btnTop");
// Cuando el usuario hace scroll hacia abajo de 30px desde el inicio de pagina, se visualiza el boton

window.addEventListener('scroll', function() {
    document.body.scrollTop > 30 || document.documentElement.scrollTop > 30 ? btnTop.style.display = "block" : btnTop.style.display = "none";
});

// Cuando el usuario hace click sobre el boton, se hace un scroll al inicio de la pagina
btnTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
