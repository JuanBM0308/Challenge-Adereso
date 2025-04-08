// TODO: Archivo principal 'runner'
import { getProblemTest } from "./apiHelperTest.js";
import { interpretProblemWithAI } from "./aiHelper.js";
import { fetchStarWarsCharacter, fetchStarWarsPlanet, fetchStarWarsStarship, fetchPokemon } from "./dataFetcher.js";

async function executeChallenge() {
    try {
        // 1. Obtener problema de prueba
        const problem = await getProblemTest();
        if (!problem) {
            console.error("No se pudo obtener un problema de prueba.");
            return;
        }
        console.log("\nProblema recibido:", problem);

        // 2. Interpretar el problema con IA
        const extractedData = await interpretProblemWithAI(problem);
        if (!extractedData) {
            console.error("No se pudo extraer información clave con la IA.");
            return;
        }
        console.log("\nDatos extraídos por la IA:", extractedData);

        // 3. Obtener los valores de la API según los datos extraídos
        const fetchedData = await fetchRequiredData(extractedData);
        console.log("\nDatos obtenidos desde las APIs:", fetchedData);

        // 4. Evaluar la expresión matemática con los datos obtenidos
        const result = evaluateExpression(problem.expression, fetchedData);
        console.log("\nResultado final del cálculo:", result);
    } catch (error) {
        console.error("Error en la ejecución del desafío:", error);
    }
}

// Función para obtener los datos necesarios de las APIs
async function fetchRequiredData(extractedData) {
    const fetchedData = {};

    for (const [key, value] of Object.entries(extractedData)) {
        if (value.tipo === "personaje") {
            fetchedData[key] = await fetchStarWarsCharacter(value.nombre);
        } else if (value.tipo === "planeta") {
            fetchedData[key] = await fetchStarWarsPlanet(value.nombre);
        } else if (value.tipo === "nave") {
            fetchedData[key] = await fetchStarWarsStarship(value.nombre);
        } else if (value.tipo === "pokemon") {
            fetchedData[key] = await fetchPokemon(value.nombre);
        }
    }

    return fetchedData;
}

// Función para evaluar la expresión matemática con los datos obtenidos
function evaluateExpression(expression, data) {
    try {
        const evaluatedExpression = expression.replace(/"([^"]+)"/g, (_, key) => {
            return data[key] ? data[key] : "0";
        });

        return Function(`"use strict"; return (${evaluatedExpression})`)();
    } catch (error) {
        console.error("Error evaluando la expresión:", error);
        return null;
    }
}

executeChallenge();
