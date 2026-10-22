/* ─────────────────────────────────────────────
   data.js — Datos y cálculos con ES6+
   .map()  .filter()  .reduce()
───────────────────────────────────────────── */

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

// .map() — enriquecer cada viaje con su evaluación
const viajesEvaluados = viajes.map(({ id, tipo, pasajeros }) => {
    const { nombre, capacidad } = TIPOS_BUS[tipo];
    const porcentaje = +((pasajeros / capacidad) * 100).toFixed(1);
    const esGanancia = porcentaje >= 50;
    return { id, tipo, nombre, capacidad, pasajeros, porcentaje, esGanancia };
});

// .filter() + .reduce() — totales por tipo
const resumenPorTipo = (tipo) => {
    const filtrados = viajesEvaluados.filter((v) => v.tipo === tipo);

    const totales = filtrados.reduce(
        (acc, { pasajeros }) => ({ viajes: acc.viajes + 1, pasajeros: acc.pasajeros + pasajeros }),
        { viajes: 0, pasajeros: 0 }
    );

    return {
        nombre: TIPOS_BUS[tipo].nombre,
        capacidad: TIPOS_BUS[tipo].capacidad,
        tipo,
        viajes: totales.viajes,
        pasajeros: totales.pasajeros,
        promedio: +(totales.pasajeros / totales.viajes).toFixed(1),
        ganancias: filtrados.filter((v) => v.esGanancia).length,
        perdidas: filtrados.filter((v) => !v.esGanancia).length,
    };
};

const DATOS = {
    viajes: viajesEvaluados,
    pequeño: resumenPorTipo("PEQUEÑO"),
    grande: resumenPorTipo("GRANDE"),
};
