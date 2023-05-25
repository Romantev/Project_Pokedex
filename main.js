const pokedex = document.querySelector("#pokedex");

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites[`front_default`],
      type: data.types.map((type) => type.type.name).join(", "),
      height: data.height / 10,
      weight: data.weight / 10,
      // moves: data.moves.map((move) => move.move.name).join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (poke) =>
        `<li class="card">
                <img class="card-image" src="${poke.image}"/>
                <h2 class="card-title"> ${poke.id}. ${poke.name}</h2>
                <p class="card-type">Type: ${poke.type}</p>
                <p class="card-height">Height: ${poke.height} m</p>
                <p class="card-weight">Weight: ${poke.weight} kg</p>
                <p class="card-moves">Moves: ${poke.moves}</p>
                </li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;

  fetch("https://pokeapi.co/api/v2/language/6/")
    .then((res) => res.json)
    .then((data) => console.log(data));
};
fetchPokemon();
