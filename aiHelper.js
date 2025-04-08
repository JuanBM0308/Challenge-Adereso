// TODO: Funciones para procesar enunciados con IA
import fetch from "node-fetch";

const AI_API_URL = "https://recruiting.adere.so/chat_completion";
const TOKEN = "8aa6566e-9cff-49eb-9767-1d9f3a4c859c";

export async function interpretProblemWithAI(problem) {
    try {
        const response = await fetch(AI_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "gpt-4o-mini",
                "messages": [
                  {role: 'system', content: 'Eres un asistente experto en resolver problemas matemáticos con datos de Star Wars y Pokémon.'},
                  {role: 'user', content: `Analiza el siguiente enunciado y extrae los datos clave en JSON: "${problem.problem}"`}
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la IA: ${response.statusText}`);
        }

        const iaData = await response.json();
        console.log('Datos extraidos por la IA:', iaData);

        if (iaData.choices && iaData.choices.length > 0) {
            return iaData.choices[0].message.content;
        } else {
            throw new Error('La IA no devolvió una respuesta válida.');
        }

        return iaData;
    } catch (error) {
        console.error('Error interpretando el problema con IA:', error);
    }
}