//---------------------------------------------------------------------------------------------------------------
//                   Proyecto JavaScript - RODOLFO GONZALEZ
//---------------------------------------------------------------------------------------------------------------
import { cargarCardProducto } from "./components/products/cargarCardPrpducto.js";
import obtenerDatos from "./data/productos.js"

obtenerDatos()
    .then(data => cargarCardProducto(data));