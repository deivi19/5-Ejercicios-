export function cargarActv18() {
    const contenedorPrincipal = document.getElementById("resultados");
    contenedorPrincipal.innerHTML = `
        <h3> Ordenar vector usando el método Burbuja </h3>
        <input type="text" id="sortInput" placeholder="5, 2, 9, 1">
        <button id="procesarOrdenamiento"> Ordenar </button>
        <p id="resultado18"></p>
    `;
    document.getElementById("procesarOrdenamiento").addEventListener("click", procesarOrdenamiento);
}

export function procesarOrdenamiento() {
    const input = document.getElementById("sortInput").value;
    const numeros = input.split(",").map(num => Number(num.trim()));
    const resultado = bubbleSort(numeros);
    // Corrección de outerHTML a innerHTML:
    document.getElementById("resultado18").innerHTML = "Vector ordenado: [ " + resultado.join(", ") + " ]";
}

export function bubbleSort(numeros) {
    const arr = [...numeros]; 
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}