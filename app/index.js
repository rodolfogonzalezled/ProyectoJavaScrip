//---------------------------------------------------------------------------------------------------------------
//                   Proyecto JavaScript - RODOLFO GONZALEZ
//---------------------------------------------------------------------------------------------------------------
import { cargarCardProducto } from "./components/products/cargarCardProducto.js";
import obtenerDatos from "./data/productos.js"

obtenerDatos()
    .then(data => cargarCardProducto(data));