// //---------------------------------------------------------------------------------------------------------------
// //                   Desafio Complementario - RODOLFO GONZALEZ
// //---------------------------------------------------------------------------------------------------------------
// //----- Objeto con las propiedades de los productos
class Producto {
    constructor(id, nombre, precio, categoria, anioPublicacion, idioma, imagen, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.anioPublicacion = anioPublicacion;
        this.idioma = idioma;
        this.imagen = imagen;
        this.cantidad = cantidad
    }

    productoComprado() {
        this.cantidad--; //Se decrementa de 1 en 1 la cantidad
    }
}
// //----- Array principal de productos
const productos = [
    new Producto(1, 'NBA2K22', 5000, 'deportes', 2022, 'Español', './images/nba-2k22.jpg', 2),
    new Producto(2, 'FIFA22', 8000, 'deportes', 2022, 'Español', './images/fifa22.jpg', 5),
    new Producto(3, 'Resident Evil 3', 5500, 'accion', 2021, 'Inglés', './images/resident-evil-3.jpg', 5),
    new Producto(4, 'Sims 4', 2000, 'simulacion', 2019, 'Español', './images/sims4.jpg', 3),
    new Producto(5, 'Need for Speed', 3000, 'conduccion', 2022, 'Español', './images/need-for-speed.jpg', 8),
    new Producto(6, 'Crash Ctr', 7000, 'conduccion', 2020, 'Español', './images/crash-ctr.jpg', 4),
    new Producto(7, 'Uncharted', 2500, 'accion', 2019, 'Español', './images/uncharted4.jpg', 5),
    new Producto(8, 'Horizon II', 10000, 'accion', 2022, 'Inglés', './images/horizon.jpg', 2),
    new Producto(9, 'Far Cry 6', 9000, 'accion', 2022, 'Español', './images/farcry6.jpg', 1),
    new Producto(10, 'Mortal Kombat 11', 2500, 'combate', 2021, 'Inglés', './images/mortal-kombat.jpg', 5),
    new Producto(11, 'Spiderman', 4500, 'accion', 2020, 'Español', './images/spider-man.jpg', 5),
    new Producto(12, 'It Takes Two', 7000, 'simulacion', 2021, 'Inglés', './images/it-takes-two.jpg', 2),
];

const carrito = [];
let total = 0;
crearCardProductos(productos);
const btnPagar = document.getElementById('pagar');
btnPagar.disabled = true; 
btnPagar.addEventListener("click", calcularTotal);
//-------------- Agregar al Carrito -------------------------------------------------------------------

function agregarCarrito() {
    const productoSeleccionado = this.producto;
    if (productoSeleccionado.cantidad >= 1) {
        carrito.push(productoSeleccionado);
        productoSeleccionado.productoComprado();
        console.log(carrito);
        let mostrarCarrito = document.getElementById("listaCarrito");
        mostrarCarrito.innerHTML = "";
        for (const producto of carrito) {
            let li = document.createElement("li");
            li.textContent = `${producto.nombre} - Precio: ${producto.precio}`;
            btnPagar.disabled = false;    
            mostrarCarrito.appendChild(li);   //--------- Mostrar carrito ----------------------------
        }

    } else {
        console.log('Producto agotado: ', productoSeleccionado);
        alert('Lo sentimos, producto agotado');
        this.textContent = 'Agotado';
        this.disabled = true;
        console.log(this);
    }

    // console.log('Gracias por su compra, los elementos seleccionados para su compra fueron: ', carrito);
    // calcularTotal();
}

//------- Calcular el total ----------------------------------------------------------------------
function calcularTotal() {
    if (carrito.length > 0) {
        total = carrito.reduce((acc, el) => acc + el.precio, 0); //Suma todos los precios de los elementos seleccionados
        if (carrito.length > 5) {
            console.log(`El monto total a pagar es: ${total}`); //Precio sin descuento
            console.log('¡FELICIDADES! Obtuviste un descuento del 20%'); //Precio con descuento eligiendo 6 unidades o mas
            alert('¡FELICIDADES! Obtuviste un descuento del 20%'); //Precio con descuento eligiendo 6 unidades o mas
            total = total - (total * 0.20);
        } else if (carrito.length > 2) {
            console.log(`El monto total a pagar es: ${total}`); //Precio sin descuento
            console.log('¡FELICIDADES! Obtuviste un descuento del 10%'); //Precio con descuento eligiendo de 3 a 5 unidades 
            alert('¡FELICIDADES! Obtuviste un descuento del 10%'); //Precio con descuento eligiendo de 3 a 5 unidades 
            total = total - (total * 0.10);
        }

        console.log('El monto a pagar es: ' + total); // Precio total a pagar
        alert('El monto a pagar es: ' + total); // Precio total a pagar
    }
}


// //-------------- Buscar por nombre -------------------------------------------------------------

let inputBuscarNombre = document.getElementById("buscarNombre");
inputBuscarNombre.addEventListener('keyup', buscarProducto);

function buscarProducto() {
    const productosEncontrados = productos.filter(el => el.nombre.toUpperCase().includes(inputBuscarNombre.value.toUpperCase()));
    crearCardProductos(productosEncontrados);
    // console.log(`Se encontró ${productosEncontrados.length} concidencia(s)`, productosEncontrados);
}

// //-------------- filtrar por categoria -----------------------------------------------------------
let categoria = document.getElementById("categoria");
categoria.addEventListener('change', filtrarCategoria);

function filtrarCategoria() {
    const productosEncontrados = productos.filter(el => el.categoria == categoria.value);
    crearCardProductos(productosEncontrados);
    //console.log(`Se encontró ${productosEncontrados.length} concidencia(s)`, productosEncontrados);
}

// //-------------- caso 4 - Ordenar ------------------------------------------------------------------------
let selectOrdenar = document.getElementById("ordenar");
selectOrdenar.addEventListener("change", ordenar);

function ordenar() {
    switch (selectOrdenar.value) {
        case "nombre":
            ordenarPorNombre();
            break;
        case "precio":
            ordenarPorPrecio();
            break;
        case "anio":
            ordenarPorAnio();
            break;
        default:
            break;
    }
}

function ordenarPorNombre() {
    const productosOrdenados = productos.sort((a, b) => a.nombre < b.nombre ? -1 : 1); //--- reordena el array segun el nombre por orden alfabetico
    crearCardProductos(productosOrdenados);
}

function ordenarPorPrecio() {
    const productosOrdenados = productos.sort((a, b) => a.precio < b.precio ? -1 : 1); //--- reordena el array por precio de menor a mayor precio
    crearCardProductos(productosOrdenados);
}

function ordenarPorAnio() {
    const productosOrdenados = productos.sort((a, b) => a.anioPublicacion < b.anioPublicacion ? -1 : 1); //--- reordena el array por año de publicación desde el mas viejo al mas nuevo
    crearCardProductos(productosOrdenados);
}

// function ordenarPorCategoria() {
//     console.log(productos.sort((a, b) => a.categoria < b.categoria ? -1 : 1)); //--- reordena el array segun la categoria por orden alfabetico
//     alert('Seleccionó ordenar por Categoria por orden Alfabetico');
// }


//---------- Crear el HTML de cada uno de los cards de los productos ----------------------------
function crearCardProductos(productos) {
    const padre = document.getElementById('productos');
    padre.innerHTML = '';
    for (const producto of productos) {

        let divContenedor = document.createElement("div");
        divContenedor.classList.add("col-md-6", "col-lg-4");

        let divCard = document.createElement("div");
        divCard.classList.add("card", "products");

        let img = document.createElement("img");
        img.classList.add("products__img");
        img.src = producto.imagen;

        let divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body", "products__info");

        let titulo = document.createElement("h3");
        titulo.classList.add("card-title");
        titulo.textContent = producto.nombre;

        let divInfoProducto = document.createElement("div");
        divInfoProducto.classList.add("card-text");

        let precio = document.createElement("p");
        precio.textContent = `Precio: $ ${producto.precio}`;

        let categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${producto.categoria}`;

        let anioPublicacion = document.createElement("p");
        anioPublicacion.textContent = `Año de publicacion: ${producto.anioPublicacion}`;

        let divBtn = document.createElement("div");
        divBtn.classList.add("d-grid", "col-6", "mx-auto");

        let btn = document.createElement("button");
        btn.classList.add("btn", "btn-outline-primary");
        btn.type = 'button';
        btn.textContent = 'Agregar al carrrito';
        btn.addEventListener('click', agregarCarrito);
        btn.producto = producto;

        divContenedor.appendChild(divCard);
        divCard.appendChild(img);
        divCard.appendChild(divCardBody);
        divCardBody.appendChild(titulo);
        divCardBody.appendChild(divInfoProducto);
        divInfoProducto.appendChild(precio);
        divInfoProducto.appendChild(categoria);
        divInfoProducto.appendChild(anioPublicacion);
        divCardBody.appendChild(divBtn);
        divBtn.appendChild(btn);
        padre.appendChild(divContenedor);



        // <div class="col-md-6 col-lg-4">
        //     <div class="card products">
        //         <img class="products__img" src="./images/spider-man.jpg" alt="spiderman">
        //         <div class="card-body products__info">
        //             <h3 class="card-title">Spiderman</h3>
        //             <div cla>
        //                 <p>Precio: $ 4.000</p>
        //                 <p>Categoria: Acción</p>
        //                 <p>Año de Publicación: 2020</p>
        //             </div>
        //             <div class="d-grid col-6 mx-auto">
        //                 <a href="#" class="btn btn-outline-primary">Añadir al carrito</a>
        //             </div>
        //         </div>
        //     </div>
        // </div>


    }
}