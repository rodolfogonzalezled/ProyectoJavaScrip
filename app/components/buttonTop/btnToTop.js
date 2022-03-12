var buttonTop = document.getElementById("button-to-top");
// Cuando el usuario hace scroll hacia abajo de 30px desde el inicio de pagina, se visualiza el boton

window.addEventListener('scroll', function() {
    scrollFunction()
})

function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        buttonTop.style.display = "block";
    } else {
        buttonTop.style.display = "none";
    }
}
// Cuando el usuario hace click sobre el boton, se hace un scroll al inicio de la pagina
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

buttonTop.addEventListener('click', topFunction);