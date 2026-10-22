// ─────────────────────────────────────────────
//  reporte.js — Script Node.js con ES6+
//  node reporte.js
// ─────────────────────────────────────────────

const TIPOS_BUS = {
    PEQUEÑO: { nombre: "Pequeño", capacidad: 20 },
    GRANDE: { nombre: "Grande", capacidad: 60 },
};

const viajes = [
    { id: 1, tipo: "PEQUEÑO", pasajeros: 18 },
    { id: 2, tipo: "PEQUEÑO", pasajeros: 8 },
    { id: 3, tipo: "PEQUEÑO", pasajeros: 14 },
    { id: 4, tipo: "GRANDE", pasajeros: 55 },
    { id: 5, tipo: "GRANDE", pasajeros: 22 },
    { id: 6, tipo: "GRANDE", pasajeros: 60 },
    { id: 7, tipo: "GRANDE", pasajeros: 30 },
];

// ── .map() — evaluar cada viaje ───────────────
const viajesEvaluados = viajes.map(({ id, tipo, pasajeros }) => {
    const { nombre, capacidad } = TIPOS_BUS[tipo];
    const porcentaje = +((pasajeros / capacidad) * 100).toFixed(1);
    const resultado = porcentaje >= 50 ? "Ganancia" : "Pérdida";
    return { id, tipo, nombre, capacidad, pasajeros, porcentaje, resultado };
});

// ── Imprimir detalle ──────────────────────────
console.log("\n=== DETALLE DE VIAJES ===\n");
viajesEvaluados.forEach(({ id, nombre, capacidad, pasajeros, porcentaje, resultado }) => {
    const icono = resultado === "Ganancia" ? "✅" : "❌";
    console.log(
        `  Viaje #${String(id).padStart(2, "0")} | Bus ${nombre.padEnd(8)} (cap ${capacidad}) ` +
        `| ${String(pasajeros).padStart(2)} pax | ${String(porcentaje).padStart(5)}% | ${icono} ${resultado}`
    );
});

// ── .filter() + .reduce() por tipo ───────────
const resumen = (tipo) => {
    const filtrados = viajesEvaluados.filter((v) => v.tipo === tipo);
    const { totalViajes, totalPax } = filtrados.reduce(
        (acc, { pasajeros }) => ({ totalViajes: acc.totalViajes + 1, totalPax: acc.totalPax + pasajeros }),
        { totalViajes: 0, totalPax: 0 }
    );
    return {
        nombre: TIPOS_BUS[tipo].nombre,
        totalViajes,
        totalPax,
        promedio: +(totalPax / totalViajes).toFixed(1),
        ganancias: filtrados.filter((v) => v.resultado === "Ganancia").length,
        perdidas: filtrados.filter((v) => v.resultado === "Pérdida").length,
    };
};

const pequeño = resumen("PEQUEÑO");
const grande = resumen("GRANDE");

// ── Imprimir resumen ──────────────────────────
const imprimirResumen = ({ nombre, totalViajes, totalPax, promedio, ganancias, perdidas }) => {
    console.log(`  Bus ${nombre}`);
    console.log(`    Viajes    : ${totalViajes}`);
    console.log(`    Pasajeros : ${totalPax}`);
    console.log(`    Promedio  : ${promedio} pax`);
    console.log(`    Ganancias : ${ganancias}  |  Pérdidas: ${perdidas}`);
};

console.log("\n=== TOTALES POR TIPO DE VEHÍCULO ===\n");
imprimirResumen(pequeño);
console.log("");
imprimirResumen(grande);

// ── Global con .reduce() ──────────────────────
const global = viajesEvaluados.reduce(
    (acc, { pasajeros }) => ({ viajes: acc.viajes + 1, pax: acc.pax + pasajeros }),
    { viajes: 0, pax: 0 }
);

console.log("\n=== CONSOLIDADO GLOBAL ===\n");
console.log(`  Total viajes    : ${global.viajes}`);
console.log(`  Total pasajeros : ${global.pax}`);
console.log(`  Promedio        : ${+(global.pax / global.viajes).toFixed(1)} pax`);
console.log(`  Ganancias       : ${viajesEvaluados.filter((v) => v.resultado === "Ganancia").length}`);
console.log(`  Pérdidas        : ${viajesEvaluados.filter((v) => v.resultado === "Pérdida").length}`);
console.log("");
