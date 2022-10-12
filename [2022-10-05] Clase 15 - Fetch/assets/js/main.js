//Declaracion de variables logica
let pokemons = [];

//Declaracion de variables visuales
let pokeForm = null;
let pokeParty = null;

//bind views
const bindElements = () => {
  pokeForm = document.querySelector("#pokemon-form");
  pokeParty = document.querySelector("#pokemon-party-section");
}

//Fetch pokemon info
const fetchPokemonInfo = async (identifier) => {
  let data = null;

  try {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`, { mode: "cors" });
    if(response.ok) {
      //Deserializar el contenido de la petición
      const _data = await response.json();
      data = castResponseToPokemon(_data);
    }

  } catch (error) {
    console.error(error);
    console.error("Ups! Ocurrió un error en la conexión")
  } finally {
    return data;
  }
}

//Cast pokemon info
const normalizeStatName = (stat) => {
  const _names = {
    "hp": "hp",
    "attack": "atk",
    "defense":" def",
    "special-attack": "s-atk",
    "special-defense": "s-def",
    "speed": "spd"
  }

  return _names[stat] || "";
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

  return _colors[type];
}

const castResponseToPokemon = (data) => {
  return {
    index: data.id,
    name: data.name,
    sprite: data.sprites.front_default, 
    height: data.height,
    weight: data.weight,
    types: data.types.map(type => type.type.name),
    stats: data.stats.reduce((result, stat)=> {
      return {
        ...result,
        [normalizeStatName(stat.stat.name)]: stat.base_stat,
      };
    }, {})
  }
};

/* stats: {
  hp: 34,
  atk: 23,
  def: 34, 
  ...
} */

//Pokemon Services
const savePokemon = (pokemonToSave) = () => {
  pokemons = [pokemonToSave, ...pokemons];
}

const removePokemon = (index) => {
  pokemons = pokemons.filter(pkmn => pkmn.index !== index);
}

//Set event listeners
const setFormListener = () => {
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
      spd: data.get("spd")
    } */

    let _pokemon = {};
    const identifier = data.get("identifier");
    
    if(!identifier) {
      alert("Ey! falta el identificador");
      return;
    }

    _pokemon = await fetchPokemonInfo(identifier);

    if(!_pokemon) {
      alert("Pokemon no encontrado");
      return;
    }

    console.log(_pokemon);

    pokemons = [_pokemon, ...pokemons];
    //pokemons.unshift(_pokemon);
    renderPokemons();
    pokeForm.reset();
  });
}

const createPokemonCard = (poke) => {
  const stats = Object.keys(poke.stats).map(statKey => {
    return `
      <div class="stat">
        <p> ${statKey.toUpperCase()}: </p>
        <div class="bar">
          <div style="width: ${(poke.stats[statKey]/255)*100}%;"></div>
        </div>
      </div>
    `;
  })

  const content = `
  <figure>
    <img src=${poke.sprite} alt="Pokemon Sprite">
  </figure>

  <div class="info">
    <h4> ${poke.name} </h4>
    <p> # ${String(poke.index).padStart(3, "0")} </p>
    <p> Altura: ${poke.height} </p>
    <p> Peso: ${poke.weight} </p>
  </div>

  <div class="stats">
    ${stats.join("\n")}
  </div>
  <button class="delete-pokemon-btn"> <i class="fa-solid fa-trash"></i> </button>
  `;

  const _article = document.createElement("article");
  _article.innerHTML = content;
  _article.dataset.index = poke.index;
  _article.style.backgroundColor = getColorFromType(poke.types[0]);

  _article.querySelector(".delete-pokemon-btn")
    .addEventListener("click", ()=> {
      removePokemon(poke.index);
      renderPokemons();
    });
    
  return _article;
}

const renderPokemons = () => {
  pokeParty.innerHTML = "";
  pokemons.forEach(poke => {
    pokeParty.appendChild(createPokemonCard(poke));
  });
  
}

//Main function
const Main = () => {
  bindElements();
  setFormListener();
}

window.onload = Main;