class Producto {
    constructor(id, nombre, precio, categoria, anioPublicacion, idioma, imagen, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.anioPublicacion = anioPublicacion;
        this.idioma = idioma;
        this.imagen = imagen;
        this.stock = stock
    }

    ajustarStock() {
        this.stock--; //Se decrementa de 1 en 1 el stock
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
    new Producto(9, 'Far Cry 6', 9000, 'accion', 2022, 'Español', './images/farcry6.jpg', 5),
    new Producto(10, 'Mortal Kombat 11', 2500, 'combate', 2021, 'Inglés', './images/mortal-kombat.jpg', 5),
    new Producto(11, 'Spiderman', 4500, 'accion', 2020, 'Español', './images/spider-man.jpg', 5),
    new Producto(12, 'It Takes Two', 7000, 'simulacion', 2021, 'Inglés', './images/it-takes-two.jpg', 2),
];