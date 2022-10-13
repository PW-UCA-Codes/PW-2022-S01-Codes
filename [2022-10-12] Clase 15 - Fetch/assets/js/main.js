//Variables logicas
let pokemons = [];
const POKE_KEY = "poke-party-key";

//Variables UI
let pokeForm = null;
let pokeParty = null;
let clearPokePartyBtn = null;
//bind Elements
const bindElements = () => {
  pokeForm = document.querySelector("#pokemon-form");
  pokeParty = document.querySelector("#pokemon-party-section");
  clearPokePartyBtn = document.querySelector("#clear-pokeparty-btn");
}

//Fetch pokemon info
const fetchPokemonInfo = async (identifier) => {
  let data = null;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`, {mode: "cors"});
    console.log(response);
    if(response.ok) {
      const _data = await response.json(); 
      data = castResponseToPokemon(_data);
    }
  } catch (error) {
    console.error(error);
    console.error("Ups! Ocurrió un error en la conexión");
  } finally {
    return data;
  }
}

//Cast Pokemon Methods
const normalizeStatName = (stat) => {
  const names = {
    "attack": "atk",
    "hp": "hp",
    "defense": "def",
    "special-attack": "s-atk",
    "special-defense": "s-def",
    "speed": "spd",
    "accuracy": "acc",
    "evasion": "eva"
  }

  return names[stat] || "";
}

const getColorFromType = (type) => {
  let _colors = {
    "normal": "#212121",
    "fighting": "#c62828",
    "flying": "#0277bd",
    "poison": "#6a1b9a",
    "ground": "#3e2723",
    "rock": "#616161",
    "bug": "#827717",
    "ghost": "#12005e",
    "steel": "#37474f",
    "fire": "#bf360c",
    "water": "#1a237e",
    "grass": "#1b5e20",
    "electric": "#fbc02d",
    "psychic": "#c2185b",
    "ice": "#4fc3f7",
    "dragon": "#0d47a1",
    "dark": "#000000",
    "fairy": "#9e00c5",
  }

  return _colors[type] || "##263859";
}

const castResponseToPokemon = (data) => {
  return {
    index: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    sprite: data.sprites.front_default,
    types: data.types.map(t => {
      return t.type.name;
    }),
    stats: data.stats.reduce((acc, s) => {
      return {
        ...acc,
        [normalizeStatName(s.stat.name)]: s.base_stat
      }
    }, {})
  };
}

/* stats: {
  hp: 345,
  atk: 34,
  ...
} */

//LocalStorage functions
const savePokemonsToLocalStorage = () => {
  localStorage.setItem(POKE_KEY, JSON.stringify(pokemons));
}

const getPokemonsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(POKE_KEY)) || [];
}

const removePokemonsFromLocalStorage = () => {
  localStorage.removeItem(POKE_KEY);
}

// Pokemon services
const savePokemon = (pokemonToSave) => {
  pokemons = [pokemonToSave, ...pokemons];
  savePokemonsToLocalStorage();
}

const removePokemon = (index) => {
  pokemons = pokemons.filter(pokemon => pokemon.index !== index);
  savePokemonsToLocalStorage();
}

const loadPokeParty = () => {
  pokemons = getPokemonsFromLocalStorage();
}

const clearPokeParty = () => {
  pokemons = [];
  removePokemonsFromLocalStorage();
}

//Bind event listeners
const bindSubmitListener = () => {
  pokeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(pokeForm);
    /* const _pokemon = {
      index: data.get("index"),
      name: data.get("name"),
      sprite: data.get("sprite"),
      height: data.get("height"),
      weight: data.get("weight"),
      type_1: data.get("type-1"),
      type_2: data.get("type-2"),
      hp: data.get("hp"),
      atk: data.get("atk"),
      def: data.get("def"),
      spa: data.get("spa"),
      spd: data.get("spd"),
    } */

    let _pokemon = {};
    const identifier = data.get("identifier");
    
    if(!identifier) {
      alert("Ey! Debes enviar un identificador");
      return;
    }

    _pokemon = await fetchPokemonInfo(identifier);

    if(!_pokemon) {
      alert("Pokemon no encontrado");
      return;
    }

    savePokemon(_pokemon);
    renderPokemons();
    pokeForm.reset();
  })
}

const bindClickListeners = () => {
  clearPokePartyBtn.addEventListener("click", () => {
    clearPokeParty();
    renderPokemons();
  });
}

//Create pokemon card
const createPokemonCard = (pokemon) => {
  const stats = Object.keys(pokemon.stats).map(statKey => {
    return `
    <div class="stat">
      <p> ${statKey.toUpperCase()}: </p>
      <div class="bar">
        <div style="width: ${(pokemon.stats[statKey] / 255) * 100 }% ;"></div>
      </div>
    </div>
    `;
  })
  
  const content = `
    <figure>
      <img src="${pokemon.sprite}" alt="Pokemon Sprite">
    </figure>

    <div class="info">
      <h4> ${pokemon.name} </h4>
      <p> # ${String(pokemon.index).padStart(3, "0")} </p>
      <p> Altura: ${pokemon.height} </p>
      <p> Peso: ${pokemon.weight} </p>
    </div>

    <div class="stats">
      ${stats.join("\n")}
    </div>
    <button class="delete-pokemon-btn"> <i class="fa-solid fa-trash"></i> </button>
  `;

  const _element = document.createElement("article");
  _element.innerHTML = content;
  _element.style.backgroundColor = getColorFromType(pokemon.types[0])

  _element.dataset.index = pokemon.index;

  _element.querySelector(".delete-pokemon-btn")
    .addEventListener("click", () => {
      removePokemon(pokemon.index);
      renderPokemons();
    });

  return _element;
}

const renderPokemons = () => {
  pokeParty.innerHTML = "<h3> Pokemon Party </h3>";
  pokemons.forEach(pokemon => {
    pokeParty.appendChild(createPokemonCard(pokemon));
  });
}

//Main function
const Main = () => {
  bindElements();
  bindSubmitListener();
  bindClickListeners();

  //Load poke party
  loadPokeParty();
  renderPokemons();
}

window.onload = Main;