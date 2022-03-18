import { toastSuscription } from "../cart/utils/toast.js";

const btnSuscribirse = document.getElementById("btnSuscribirse");
const inputs = document.getElementById("email");
inputs.addEventListener('change', validarEmail);

function validarEmail() {
	const formInvalido = document.querySelector('#suscription:invalid');
	if(!formInvalido) {
		btnSuscribirse.addEventListener('click',  function(el) {
			el.preventDefault();
			toastSuscription("Gracias por suscribirse")
		});
	}
}