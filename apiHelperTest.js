// TODO: Funciones para obtener los problemas y enviar respuestas
import fetch from 'node-fetch';

const API_URL = "https://recruiting.adere.so/challenge/test";
const TOKEN = "8aa6566e-9cff-49eb-9767-1d9f3a4c859c";

export async function getProblemTest() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Problema recibido:', data);

        return data;
    } catch (error) {
        console.error('Error obteniendo problema de prueba:', error);
    }
}
