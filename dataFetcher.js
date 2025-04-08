// TODO: Funciones para obtener datos de las APIs (SWAPI y PokéAPI)
import fetch from "node-fetch";

const STAR_WARS_API = "https://swapi.dev/api/";
const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function fetchStarWarsCharacter(name) {
    try {
        const response = await fetch(`${STAR_WARS_API}people/?search=${name}`);
        const data = await response.json();
        return data.results.length ? data.results[0] : null;
    } catch (error) {
        console.error(`Error obteniendo personaje de Star Wars: ${name}`, error);
        return null;
    }
}
export async function fetchStarWarsPlanet(name) {
    try {
        const response = await fetch(`${STAR_WARS_API}planets/?search=${name}`);
        const data = await response.json();
        return data.results.length ? data.results[0] : null;
    } catch (error) {
        console.error(`Error obteniendo planeta de Star Wars: ${name}`, error);
        return null;
    }
}

export async function fetchPokemon(name) {
    try {
        const response = await fetch(`${POKEMON_API}pokemon/${name.toLowerCase()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error obteniendo Pokémon: ${name}`, error);
        return null;
    }
}