//Simulación del kiosko 
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Lista de productos
const productos = {
    1: { nombre: "Papas fritas", precio: 17 },
    2: { nombre: "Vaso de frutas", precio: 25 },
    3: { nombre: "Jugo de naranja", precio: 30 },
    4: { nombre: "Agua de Jamaica", precio: 15 },
    5: { nombre: "Torta de Jamón", precio: 25 }
};

// Carrito como objeto para guardar productos 
let carrito = {};

console.log("==  Kiosco FES ARAGON  ==");
for (let codigo in productos) {
    let p = productos[codigo];
    console.log(`${codigo}) ${p.nombre.padEnd(20, ".")} $${p.precio}`);
}
console.log('\nEscribe "codigo,cantidad" (por ejemplo 1,2). Escribe "fin" para cobrar.\n');

// Preguntar cantidad 
function preguntar() {
    rl.question("> ", (entrada) => {
        if (entrada.toLowerCase() === "fin") {
            mostrarResumen();
            rl.close();
            return;
        }

        let partes = entrada.split(",");
        if (partes.length === 2) {
            let codigo = parseInt(partes[0]);
            let cantidad = parseInt(partes[1]);

            if (productos[codigo] && cantidad > 0) {
                let prod = productos[codigo];

                // Si ya existe en el carrito, sumar cantidad
                if (carrito[codigo]) {
                    carrito[codigo].cantidad += cantidad;
                    carrito[codigo].subtotal += prod.precio * cantidad;
                } else {
                    carrito[codigo] = {
                        nombre: prod.nombre,
                        precio: prod.precio,
                        cantidad: cantidad,
                        subtotal: prod.precio * cantidad
                    };
                }

                console.log(
                    `Has añadido: ${cantidad} x ${prod.nombre} ($${prod.precio} c/u) = $${prod.precio * cantidad}`
                );
            } else {
                console.log("Entrada no válida. Intenta de nuevo.");
            }
        } else {
            console.log("Formato incorrecto. Utiliza por favor: codigo,cantidad");
        }

        preguntar();
    });
}

// Mostrar resumen de lo que pidio
function mostrarResumen() {
    console.log("\n------------------ RESUMEN ------------------");

    let subtotal = 0;
    for (let codigo in carrito) {
        let item = carrito[codigo];
        console.log(
            `${item.nombre.padEnd(15)} x${item.cantidad} = $${item.subtotal}`
        );
        subtotal += item.subtotal;
    }

    let iva = subtotal * 0.16;
    let total = subtotal + iva;

    console.log("---------------------------------------------");
    console.log(`Subtotal`.padEnd(25) + ` $${subtotal.toFixed(2)}`);
    console.log(`IVA (16%)`.padEnd(25) + ` $${iva.toFixed(2)}`);
    console.log(`TOTAL`.padEnd(25) + ` $${total.toFixed(2)}`);
    console.log("\nGracias por su compra.");
}
//Ejecutar
preguntar();
