//---------------------------------------------------------------------------------------------------------------
//                   Primera Entrega de Proyecto Final - RODOLFO GONZALEZ
//--Proceso de compra, buscar por Nombre, categoria de producto y ordenar productos segun orden solicitada ------

//----- Objeto con las propiedades de los productos
class Producto {
    constructor(id, nombre, precio, categoria, anioPublicacion, idioma, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.anioPublicacion = anioPublicacion;
        this.idioma = idioma;
        this.cantidad = cantidad
    }

    productoComprado() {
        this.cantidad--; //Se decrementa de 1 en 1 la cantidad
    }
}
//----- Array principal de productos
const productos = [
    new Producto(1, 'NBA2K21', 5000, 'Deportes', 2021, 'Español', 2),
    new Producto(2, 'FIFA22', 8000, 'Deportes', 2022, 'Español', 5),
    new Producto(3, 'Crash Ctr', 7000, 'Conduccion', 2020, 'Español', 4),
    new Producto(4, 'Sims 4', 2000, 'Simulacion', 2019, 'Español', 3),
    new Producto(5, 'Need for Speed', 3000, 'Conduccion', 2022, 'Español', 1),
    new Producto(6, 'Mortal Kombat 11', 4000, 'Combate', 2021, 'Inglés', 5),
    new Producto(7, 'Uncharted', 6000, 'Accion', 2019, 'Español', 5),
    new Producto(8, 'Horizon II', 10000, 'Accion', 2022, 'Inglés', 2),
];

const carrito = [];
let total = 0;
let cantidad = 0;
let itemsCarrito = 0;
let seguirAgregando = false;

//-------- Menu principal de opciones ---------------------------------------------------
function menuPrincipal() {
    const opcionSeleccionada = parseInt(prompt(`Seleccione la opción que desea ejecutar:
    1. Agregar al carrito
    2. Buscar por nombre
    3. Buscar por categoria
    4. Ordenar`));
    switch (opcionSeleccionada) {
        case 1:
            agregarCarrito();
            break;
        case 2:
            buscarPorNombre();
            break;
        case 3:
            buscarPorCategoria();
            break;
        case 4:
            ordenar();
            break;
        default:
            break;
    }
}
//-------------- caso 1 - comprar -------------------------------------------------------------------

function agregarCarrito() {
    do {
        const productoAComprar = parseInt(prompt(`Ingrese el id del juego que desea comprar:
        Recuerde que comprando más de 2 unidades tiene un 10% de descuento y con mas de 5 obtienes un 20% de descuento
        Actualmente tiene en su carrito ${carrito.length} unidad(es)`));
        const productoSeleccionado = productos.find(el => el.id === productoAComprar);
        if (productoSeleccionado === undefined) {
            alert('La opcion que ingreso no existe');
        } else {

            if (productoSeleccionado.cantidad >= 1) {
                carrito.push(productoSeleccionado);
                productoSeleccionado.productoComprado();
            } else {
                console.log('Producto agotado: ', productoSeleccionado);
                alert('Lo sentimos, producto agotado');
            }
        };

        seguirAgregando = confirm('¿Desea agregar más productos?');

    } while (seguirAgregando);
    console.log('Gracias por su compra, los elementos seleccionados para su compra fueron: ', carrito);
    calcularTotal();
}

function calcularTotal() {
    if (carrito.length > 0) {
        total = carrito.reduce((acc, el) => acc + el.precio, 0); //Suma todos los precios de los elementos seleccionados
        if (carrito.length > 5) {
            console.log(`El monto total a pagar es: ${total}`); //Precio sin descuento
            console.log('¡FELICIDADES! Obtuviste un descuento del 20%'); //Precio con descuento eligiendo 6 unidades o mas
            total = total - (total * 0.20);
        } else if (carrito.length > 2) {
            console.log(`El monto total a pagar es: ${total}`); //Precio sin descuento
            console.log('¡FELICIDADES! Obtuviste un descuento del 10%'); //Precio con descuento eligiendo de 3 a 5 unidades 
            total = total - (total * 0.10);
        }

        console.log('El monto a pagar es: ' + total); // Precio total a pagar
        alert('El monto a pagar es: ' + total); // Precio total a pagar
    }
}

menuPrincipal();

//-------------- caso 2 - Buscar por nombre -------------------------------------------------------------

function buscarPorNombre() {
    const nombreIngresado = prompt('Ingrese el nombre del juego que desea buscar');

    const productosEncontrados = productos.filter(el => el.nombre.toUpperCase().includes(nombreIngresado.toUpperCase()));
    console.log(`Se encontró ${productosEncontrados.length} concidencia(s)`, productosEncontrados);
    alert('No se encontraron coincidencias para el nombre del juego que ingresó');
}

//-------------- caso 3 - Buscar por categoria -----------------------------------------------------------

function buscarPorCategoria() {
    const categoriaIngresada = prompt('Ingrese la categoría del juego que desea buscar. \nEjemplo: Deportes, Accion, Conduccion, Simulacion, Combate');

    const productosEncontrados = productos.filter(el => el.categoria.toUpperCase() == categoriaIngresada.toUpperCase());
    console.log(`Se encontró ${productosEncontrados.length} concidencia(s)`, productosEncontrados);
    alert('Asegurese de escribir correctamente la categoria que ingresó');
}

//-------------- caso 4 - Ordenar ------------------------------------------------------------------------

function ordenar() {
    const ordenarProductos = parseInt(prompt(`Seleccione como desea ordenar los productos:
    1. Nombre
    2. Precio
    3. Categoria
    4. Año de Publicación`));
    switch (ordenarProductos) {
        case 1:
            ordenarPorNombre();
            break;
        case 2:
            ordenarPorPrecio();
            break;
        case 3:
            ordenarPorCategoria();
            break;
        case 4:
            ordenarPorAnio();
            break;
        default:
            break;
    }
}

function ordenarPorNombre() {
    console.log(productos.sort((a, b) => a.nombre < b.nombre ? -1 : 1));
    alert('Seleccionó ordenar por nombre');
}

function ordenarPorPrecio() {
    console.log(productos.sort((a, b) => a.precio < b.precio ? -1 : 1));
    alert('Seleccionó ordenar por Precio');
}

function ordenarPorCategoria() {
    console.log(productos.sort((a, b) => a.categoria < b.categoria ? -1 : 1));
    alert('Seleccionó ordenar por Categoria');
}

function ordenarPorAnio() {
    console.log(productos.sort((a, b) => a.anioPublicacion < b.anioPublicacion ? -1 : 1));
    alert('Seleccionó ordenar por Año de Publicación');
}

//------------------------------------------------------------------------------------------