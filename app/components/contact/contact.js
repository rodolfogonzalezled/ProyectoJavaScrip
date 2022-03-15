const btnEnviar = document.getElementById("btnSubmit");
const inputs = document.getElementsByTagName("input");

for (let input of inputs) {
	input.addEventListener('change', validarFormulario);
}

function validarFormulario() {
	const formularioInvalido = document.querySelector('form:invalid');

	if(!formularioInvalido) {
		btnEnviar.addEventListener('click',  function(el) {
				el.preventDefault();
				swal("Su Formulario fue enviado exitosamente", "Nos contactaremos en breve", "success")
				.then(value => {
					window.location.href = '/index.html';
				});
		});
	}
}