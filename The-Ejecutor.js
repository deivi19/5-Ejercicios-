import * as importedOnes from "./the-imported-ones.js";

// Importaciones de las funciones core para los tests
import { calculateAverage } from '../ejercicio 16.js';
import { removeDuplicates } from '../ejercicio 17.js';
import { bubbleSort } from '../ejercicio 18.js';
import { analyzeArray, multiply } from '../ejercicio 19.js';
import { countVowels } from '../ejercicio 20.js';

const ActSelected = document.getElementById("actividades");
const btnStart = document.getElementById("btnStart");
const btnTest = document.getElementById("btnTest");
const ResultadosDiv = document.getElementById("resultados");

// --- Lógica de Ejecución Normal ---
function startActv() {
    const Act = ActSelected.value;
    ResultadosDiv.innerHTML = ""; 
    if (Act === "clear") {
        ResultadosDiv.innerHTML = "<p>Por favor, selecciona una actividad.</p>";
        return;
    }
    // Ejecuta la carga visual/interactiva desde los módulos
    const key = Act.replace(" ", "").toLowerCase(); // convierte "Act 16" en "actv16"
    const actvKey = `actv${Act.split(' ')[1]}`;
    if (importedOnes[actvKey]) {
        importedOnes[actvKey][`cargarActv${Act.split(' ')[1]}`]();
    }
}

// --- Lógica de Tests Unitarios Filtrados ---
function ejecutarTestUnitario() {
    const Act = ActSelected.value;
    ResultadosDiv.innerHTML = "";

    if (Act === "clear") {
        ResultadosDiv.innerHTML = "<p style='color: orange;'>⚠️ Selecciona una actividad para testear.</p>";
        return;
    }

    console.log(`🚀 Iniciando prueba unitaria para: ${Act}`);
    let htmlResultado = `<h3>🧪 Test Unitario: ${Act}</h3><hr>`;

    // Función interna de comparación
    const correrPrueba = (nombre, resultado, esperado) => {
        const esCorrecto = JSON.stringify(resultado) === JSON.stringify(esperado);
        if (esCorrecto) {
            console.log(`✅ PASADO: ${nombre}`);
            htmlResultado += `<div style="color: #2ecc71; padding: 10px; border: 1px solid #2ecc71; border-radius: 5px; background: rgba(46, 204, 113, 0.1);">
                                <b>✅ PASADO</b><br>${nombre}
                              </div>`;
        } else {
            console.error(`❌ FALLIDO: ${nombre}`);
            htmlResultado += `<div style="color: #e74c3c; padding: 10px; border: 1px solid #e74c3c; border-radius: 5px; background: rgba(231, 76, 60, 0.1);">
                                <b>❌ FALLIDO</b><br>${nombre}<br>
                                <small>Esperado: ${JSON.stringify(esperado)} | Obtenido: ${JSON.stringify(resultado)}</small>
                              </div>`;
        }
    };

    // Estructura Switch para ejecutar SOLO el test de la actividad seleccionada
    switch (Act) {
        case "Act 16":
            correrPrueba("Validar Promedio de [10, 20, 30]", calculateAverage([10, 20, 30]), 20);
            break;
        case "Act 17":
            correrPrueba("Validar Limpieza de duplicados", removeDuplicates(['a', 'b', 'a']), ['a', 'b']);
            break;
        case "Act 18":
            correrPrueba("Validar Ordenamiento Burbuja", bubbleSort([5, 1, 4]), [1, 4, 5]);
            break;
        case "Act 19":
            correrPrueba("Validar Producto con Callback", analyzeArray([2, 5], multiply), 10);
            break;
        case "Act 20":
            correrPrueba("Validar Conteo de Vocales", countVowels(['a', 'e', 'x']), 2);
            break;
        default:
            htmlResultado += "<p>No hay pruebas definidas para esta unidad.</p>";
    }

    ResultadosDiv.innerHTML = htmlResultado;
}

// Event Listeners
btnStart.addEventListener('click', startActv);
btnTest.addEventListener('click', ejecutarTestUnitario);