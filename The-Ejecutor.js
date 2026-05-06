import * as importedOnes from "./the-imported-ones.js";

// Importaciones corregidas para GitHub Pages (Sin espacios y ruta relativa local)
import { calculateAverage } from './ejercicio-16.js';
import { removeDuplicates } from './ejercicio-17.js';
import { bubbleSort } from './ejercicio-18.js';
import { analyzeArray, multiply } from './ejercicio-19.js';
import { countVowels } from './ejercicio-20.js';

const ActSelected = document.getElementById("actividades");
const btnStart = document.getElementById("btnStart");
const btnTest = document.getElementById("btnTest");
const btnAllTests = document.getElementById("btnAllTests");
const ResultadosDiv = document.getElementById("resultados");

/**
 * Genera el HTML para visualizar el resultado de un test de forma centrada.
 */
const comparar = (nombre, resultado, esperado) => {
    const esCorrecto = JSON.stringify(resultado) === JSON.stringify(esperado);
    return `
        <div style="text-align: center; padding: 15px; margin-bottom: 12px; border-radius: 8px; 
             background: ${esCorrecto ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)'}; 
             border: 1px solid ${esCorrecto ? '#2ecc71' : '#e74c3c'};
             width: 100%; box-sizing: border-box;">
            <b style="color: ${esCorrecto ? '#2ecc71' : '#ff7675'}; font-size: 1.1em;">
                ${esCorrecto ? '✅ PASADO' : '❌ FALLIDO'}: ${nombre}
            </b> <br>
            <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 0.9em; opacity: 0.9;">
                Obtenido: ${JSON.stringify(resultado)} | Esperado: ${JSON.stringify(esperado)}
            </p>
        </div>`;
};

// --- 1. Lógica para "Empezar Actividad" ---
function startActv() {
    const Act = ActSelected.value;
    ResultadosDiv.innerHTML = ""; 
    
    if (Act === "clear") {
        ResultadosDiv.innerHTML = "<p>Por favor, selecciona una actividad.</p>";
        return;
    }
    
    // Extrae el número para llamar a la función correspondiente en the-imported-ones.js
    const num = Act.split(' ')[1];
    const key = `actv${num}`;
    
    if (importedOnes[key]) {
        importedOnes[key][`cargarActv${num}`]();
    } else {
        ResultadosDiv.innerHTML = "<p>Error: No se encontró la lógica para esta actividad.</p>";
    }
}

// --- 2. Lógica para "Test Unitario" (Solo la actividad seleccionada) ---
function ejecutarTestUnitario() {
    const Act = ActSelected.value;
    ResultadosDiv.innerHTML = "";

    if (Act === "clear") {
        ResultadosDiv.innerHTML = "<p style='color: #ff9f00;'>⚠️ Selecciona una actividad para testear.</p>";
        return;
    }

    let htmlReporte = `<h3 style="color: #00d4ff; margin-bottom: 20px;">🧪 Test Unitario: ${Act}</h3>`;

    switch (Act) {
        case "Act 16":
            htmlReporte += comparar("Act 16 - Promedio de [10, 20, 30]", calculateAverage([10, 20, 30]), 20);
            break;
        case "Act 17":
            htmlReporte += comparar("Act 17 - Quitar duplicados", removeDuplicates(['a', 'b', 'a']), ['a', 'b']);
            break;
        case "Act 18":
            htmlReporte += comparar("Act 18 - Ordenamiento Burbuja", bubbleSort([5, 2, 9, 1]), [1, 2, 5, 9]);
            break;
        case "Act 19":
            htmlReporte += comparar("Act 19 - Producto con Callback", analyzeArray([2, 3, 4], multiply), 24);
            break;
        case "Act 20":
            htmlReporte += comparar("Act 20 - Conteo de Vocales", countVowels(['a', 'e', 'i', 'o', 'u', 'z']), 5);
            break;
    }
    ResultadosDiv.innerHTML = htmlReporte;
}

// --- 3. Lógica para "Test General" (Todas las actividades a la vez) ---
function ejecutarTodosLosTests() {
    ResultadosDiv.innerHTML = `
        <h3 style="color: #6f42c1; margin-bottom: 5px;">📊 Informe General de Tests</h3>
        <hr style="border: 0; height: 1px; background: #6f42c1; width: 100%; margin-bottom: 20px;">
    `;
    
    let totalHtml = "";
    // Ejecución masiva de pruebas
    totalHtml += comparar("Act 16 - Promedio", calculateAverage([5, 10, 15]), 10);
    totalHtml += comparar("Act 17 - Duplicados", removeDuplicates([1, 2, 2, 3]), [1, 2, 3]);
    totalHtml += comparar("Act 18 - Ordenamiento", bubbleSort([3, 1, 2]), [1, 2, 3]);
    totalHtml += comparar("Act 19 - Multiplicación", analyzeArray([10, 5], multiply), 50);
    totalHtml += comparar("Act 20 - Vocales", countVowels(['h', 'o', 'l', 'a']), 2);

    ResultadosDiv.innerHTML += totalHtml;
}

// --- Listeners de Eventos ---
btnStart.addEventListener('click', startActv);
btnTest.addEventListener('click', ejecutarTestUnitario);
btnAllTests.addEventListener('click', ejecutarTodosLosTests);