import { productos } from "../../data/productos.js";
import { cargarCardProducto } from "../products/cargarCardPrpducto.js";

let inputBuscarNombre = document.getElementById("buscarNombre");
let categoria = document.getElementById("categoria");
let selectOrdenar = document.getElementById("ordenar");

inputBuscarNombre.addEventListener('keyup', buscarProducto);
categoria.addEventListener('change', filtrarCategoria);
selectOrdenar.addEventListener("change", ordenar);

//-------------- Buscar por nombre -------------------------------------------------------------
function buscarProducto() {
    const productosEncontrados = productos.filter(el => el.nombre.toUpperCase().includes(inputBuscarNombre.value.toUpperCase()));
    cargarCardProducto(productosEncontrados);
}

//-------------- filtrar por categoria -----------------------------------------------------------
function filtrarCategoria() {
    const productosEncontrados = productos.filter(el => el.categoria == categoria.value);
    cargarCardProducto(productosEncontrados);
}

//-------------- Ordenar ------------------------------------------------------------------------
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
    const productosOrdenados = productos.sort((a, b) => a.nombre.toUpperCase() < b.nombre.toUpperCase() ? -1 : 1); //--- reordena el array segun el nombre por orden alfabetico
    cargarCardProducto(productosOrdenados);
}

function ordenarPorPrecio() {
    const productosOrdenados = productos.sort((a, b) => a.precio < b.precio ? -1 : 1); //--- reordena el array por precio de menor a mayor precio
    cargarCardProducto(productosOrdenados);
}

function ordenarPorAnio() {
    const productosOrdenados = productos.sort((a, b) => a.anioPublicacion < b.anioPublicacion ? -1 : 1); //--- reordena el array por año de publicación desde el mas viejo al mas nuevo
    cargarCardProducto(productosOrdenados);
}
