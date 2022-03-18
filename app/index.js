//---------------------------------------------------------------------------------------------------------------
//                   Proyecto JavaScript - RODOLFO GONZALEZ
//---------------------------------------------------------------------------------------------------------------
import { cargarCardProducto } from "./components/products/cargarCardProducto.js";
import obtenerProductos from "./data/obtenerProductos.js"

obtenerProductos()
    .then(data => cargarCardProducto(data));