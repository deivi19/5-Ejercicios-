// Importaciones ajustadas para salir de la carpeta /test/
import { calculateAverage } from '../ejercicio 16.js';
import { removeDuplicates } from '../ejercicio 17.js';
import { bubbleSort } from '../ejercicio 18.js';
import { analyzeArray, multiply } from '../ejercicio 19.js';
import { countVowels } from '../ejercicio 20.js';

function ejecutarTests() {
    console.log("🚀 Iniciando pruebas unitarias desde la carpeta /test...");
    let pasadas = 0;
    let totales = 0;

    const test = (nombre, resultado, esperado) => {
        totales++;
        if (JSON.stringify(resultado) === JSON.stringify(esperado)) {
            console.log(`✅ PASADO: ${nombre}`);
            pasadas++;
        } else {
            console.error(`❌ FALLIDO: ${nombre}\n   Esperado: ${JSON.stringify(esperado)}\n   Obtenido: ${JSON.stringify(resultado)}`);
        }
    };

    // --- BLOQUE DE PRUEBAS ---
    
    // 1. Test Ejercicio 16: Promedio
    test("Act 16 - Promedio de [10, 20, 30]", calculateAverage([10, 20, 30]), 20);

    // 2. Test Ejercicio 17: Duplicados
    test("Act 17 - Quitar duplicados ['a', 'b', 'a', 'c']", removeDuplicates(['a', 'b', 'a', 'c']), ['a', 'b', 'c']);

    // 3. Test Ejercicio 18: Método Burbuja
    test("Act 18 - Ordenar [5, 2, 9, 1]", bubbleSort([5, 2, 9, 1]), [1, 2, 5, 9]);

    // 4. Test Ejercicio 19: Producto (While)
    test("Act 19 - Producto de [2, 3, 4]", analyzeArray([2, 3, 4], multiply), 24);

    // 5. Test Ejercicio 20: Contar Vocales
    test("Act 20 - Vocales en ['a', 'b', 'e', 'z', 'i']", countVowels(['a', 'b', 'e', 'z', 'i']), 3);

    console.log(`\n📊 Resultado Final: ${pasadas}/${totales} pruebas pasadas.`);
}

ejecutarTests();