import * as importedOnes from "./the-imported-ones.js";

// Importaciones de las funciones core para los tests (Rutas relativas a tu proyecto)
import { calculateAverage } from '../ejercicio 16.js';
import { removeDuplicates } from '../ejercicio 17.js';
import { bubbleSort } from '../ejercicio 18.js';
import { analyzeArray, multiply } from '../ejercicio 19.js';
import { countVowels } from '../ejercicio 20.js';

const ActSelected = document.getElementById("actividades");
const btnStart = document.getElementById("btnStart");
const btnTest = document.getElementById("btnTest");
const btnAllTests = document.getElementById("btnAllTests");
const ResultadosDiv = document.getElementById("resultados");

// --- Función Auxiliar para Renderizar Pruebas ---
const comparar = (nombre, resultado, esperado) => {
    const esCorrecto = JSON.stringify(resultado) === JSON.stringify(esperado);
    return `
        <div style="text-align: left; padding: 10px; margin-bottom: 8px; border-radius: 5px; background: ${esCorrecto ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)'}; border-left: 5px solid ${esCorrecto ? '#2ecc71' : '#e74c3c'};">
            <b>${esCorrecto ? '✅ PASADO' : '❌ FALLIDO'}:</b> ${nombre} <br>
            <small style="opacity: 0.8;">Obtenido: ${JSON.stringify(resultado)} | Esperado: ${JSON.stringify(esperado)}</small>
        </div>`;
};

// --- 1. Empezar Actividad Normal ---
function startActv() {
    const Act = ActSelected.value;
    ResultadosDiv.innerHTML = ""; 
    if (Act === "clear") {
        ResultadosDiv.innerHTML = "<p>Por favor, selecciona una actividad.</p>";
        return;
    }
    
    // Ejecuta dinámicamente según el valor del select
    const num = Act.split(' ')[1];
    const key = `actv${num}`;
    if (importedOnes[key]) {
        importedOnes[key][`cargarActv${num}`]();
    }
}

// --- 2. Test Unitario (Solo actividad seleccionada) ---
function ejecutarTestUnitario() {
    const Act = ActSelected.value;
    ResultadosDiv.innerHTML = "";

    if (Act === "clear") {
        ResultadosDiv.innerHTML = "<p style='color: orange;'>⚠️ Por favor, selecciona una actividad para testear.</p>";
        return;
    }

    let htmlReporte = `<h3>🧪 Test Unitario: ${Act}</h3>`;

    switch (Act) {
        case "Act 16":
            htmlReporte += comparar("Promedio de [10, 20, 30]", calculateAverage([10, 20, 30]), 20);
            break;
        case "Act 17":
            htmlReporte += comparar("Eliminar duplicados ['a', 'b', 'a']", removeDuplicates(['a', 'b', 'a']), ['a', 'b']);
            break;
        case "Act 18":
            htmlReporte += comparar("Ordenar [5, 2, 9, 1]", bubbleSort([5, 2, 9, 1]), [1, 2, 5, 9]);
            break;
        case "Act 19":
            htmlReporte += comparar("Multiplicación [2, 3, 4] con While", analyzeArray([2, 3, 4], multiply), 24);
            break;
        case "Act 20":
            htmlReporte += comparar("Contar vocales en 'Murcielago'", countVowels(['m','u','r','c','i','e','l','a','g','o']), 5);
            break;
    }
    ResultadosDiv.innerHTML = htmlReporte;
}

// --- 3. Test General (Todas las actividades) ---
function ejecutarTodosLosTests() {
    ResultadosDiv.innerHTML = "<h3>📊 Informe General de Pruebas Unitarias</h3><hr>";
    
    let globalHtml = "";
    globalHtml += comparar("Act 16 - Promedio", calculateAverage([10, 20, 30]), 20);
    globalHtml += comparar("Act 17 - Duplicados", removeDuplicates(['x', 'y', 'x', 'z']), ['x', 'y', 'z']);
    globalHtml += comparar("Act 18 - Ordenamiento", bubbleSort([3, 1, 2]), [1, 2, 3]);
    globalHtml += comparar("Act 19 - Callback/While", analyzeArray([10, 2], multiply), 20);
    globalHtml += comparar("Act 20 - Conteo Vocales", countVowels(['h', 'o', 'l', 'a']), 2);

    ResultadosDiv.innerHTML += globalHtml;
}

// --- Listeners ---
btnStart.addEventListener('click', startActv);
btnTest.addEventListener('click', ejecutarTestUnitario);
btnAllTests.addEventListener('click', ejecutarTodosLosTests);