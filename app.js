/* ─────────────────────────────────────────────
   app.js — Renderiza tarjetas, tabla y filtros
───────────────────────────────────────────── */

const $ = (id) => document.getElementById(id);

// ── 1. TARJETAS DE RESUMEN ──────────────────
const renderCard = ({ nombre, tipo, capacidad, viajes, pasajeros, promedio, ganancias, perdidas }) => {
    const div = document.createElement("div");
    div.className = `card${tipo === "GRANDE" ? " card--grande" : ""}`;
    div.innerHTML = `
    <h3>🚌 Bus ${nombre} (cap. ${capacidad})</h3>
    <div class="card-fila"><span>Viajes realizados</span> <span>${viajes}</span></div>
    <div class="card-fila"><span>Total pasajeros</span>   <span>${pasajeros}</span></div>
    <div class="card-fila"><span>Promedio por viaje</span><span>${promedio} pax</span></div>
    <div class="card-fila"><span>Con Ganancia</span>      <span class="verde">✅ ${ganancias}</span></div>
    <div class="card-fila"><span>Con Pérdida</span>       <span class="rojo">❌ ${perdidas}</span></div>
  `;
    $("cards").appendChild(div);
};

renderCard(DATOS.pequeño);
renderCard(DATOS.grande);

// ── 2. TABLA DE VIAJES ──────────────────────
const renderFilas = (lista) => {
    const tbody = $("tabla-body");
    tbody.innerHTML = "";

    lista.forEach(({ id, nombre, tipo, capacidad, pasajeros, porcentaje, esGanancia }) => {
        const tr = document.createElement("tr");
        const clsFill = esGanancia ? "barra-fill--g" : "barra-fill--p";

        tr.innerHTML = `
      <td>#${String(id).padStart(2, "0")}</td>
      <td><span class="chip chip--${tipo.toLowerCase()}">${nombre}</span></td>
      <td>${capacidad}</td>
      <td><strong>${pasajeros}</strong></td>
      <td>
        <div class="barra-wrap">
          <div class="barra-pista">
            <div class="barra-fill ${clsFill}" style="width:${Math.min(porcentaje, 100)}%"></div>
          </div>
          <span class="barra-txt">${porcentaje}%</span>
        </div>
      </td>
      <td class="${esGanancia ? "res-ganancia" : "res-perdida"}">
        ${esGanancia ? "✅ Ganancia" : "❌ Pérdida"}
      </td>
    `;
        tbody.appendChild(tr);
    });

    $("contador").textContent = `Mostrando ${lista.length} de ${DATOS.viajes.length} viajes`;
};

renderFilas(DATOS.viajes);

// ── 3. FILTROS ──────────────────────────────
document.querySelectorAll(".btn-filtro").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-filtro").forEach((b) => b.classList.remove("activo"));
        btn.classList.add("activo");

        const f = btn.dataset.filtro;
        const filtrados = f === "todos"
            ? DATOS.viajes
            : DATOS.viajes.filter((v) => {
                if (f === "ganancia") return v.esGanancia;
                if (f === "perdida") return !v.esGanancia;
                return v.tipo === f;
            });

        renderFilas(filtrados);
    });
});
