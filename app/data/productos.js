export default function obtenerDatos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                fetch('app/data/productos.json')
                .then((resp) => resp.json())
                .then((data) => {
                    return data;
                }))
        }, 1000)
    })
}
