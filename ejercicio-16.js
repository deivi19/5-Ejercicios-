export function cargarActv16() {
    const contenedorPrincipal = document.getElementById("resultados");
    contenedorPrincipal.innerHTML = `
        <hr width="60%">
        <h3> Promedio de elementos de un vector </h3>
        <hr width="60%"><br>
        <label> Ingrese valores separados por comas: </label>
        <input type="text" id="valuesInput" placeholder="10, 20, 30">
        <button id="btnProcesar16"> Calcular promedio </button>
        <p id="resultado16"></p>
    `;
    document.getElementById("btnProcesar16").addEventListener('click', procesarValores);
}

export function procesarValores() {
    const input = document.getElementById("valuesInput").value;
    if(!input) return;
    const valuesArray = input.split(",").map(num => Number(num.trim()));
    const promedio = calculateAverage(valuesArray);
    // Corrección de la coma:
    document.getElementById("resultado16").innerHTML = "El promedio es: " + promedio;
}

export function calculateAverage(valuesArray) {
    let suma = 0;
    for (let i = 0; i < valuesArray.length; i++) {
        suma += valuesArray[i];
    }
    return valuesArray.length > 0 ? (suma / valuesArray.length) : 0;
}