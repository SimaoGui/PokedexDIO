const offset = 0;
const limit = 151;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pokemon) {
    const types = pokemon.types
        .map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`)
        .join('');

    const primaryType = pokemon.types[0].type.name;
    return `
        <li class="pokemon ${primaryType}">
            <div class="primary">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            </div>
            <div class="detail">
                <ol class="types">
                    ${types}
                </ol>
                <img src="${pokemon.sprites.other['dream_world'].front_default}" alt="${pokemon.name}">
            </div>
        </li>`;
}

const pokemonListElement = document.getElementById('pokemonList');

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => {
        const fetchPromises = jsonBody.results.map((result) =>
            fetch(result.url).then((res) => res.json())
        );
        return Promise.all(fetchPromises);
    })
    .then((pokemonArray) => {
        pokemonArray.forEach((pokemon) => {
            pokemonListElement.innerHTML += convertPokemonToLi(pokemon);
        });
    })
    .catch((error) => console.error(error));
