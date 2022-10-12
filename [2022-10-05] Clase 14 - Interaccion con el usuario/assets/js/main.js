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

const setFormListener = () => {
  pokeForm.addEventListener("submit", e => {
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

    const _pokemon = {};
    let hasErrors = false;

    data.forEach((value,key) => {
      if(!value) {
        hasErrors = true;
      }

      _pokemon[key] = value;
    })

    if(hasErrors) {
      alert("Se encontraron errores");
      return;
    }

    //pokemons = [...pokemons, _pokemon];
    pokemons.unshift(_pokemon);
    renderPokemons();
    pokeForm.reset();
  });
}

const createPokemonCard = (poke) => {
  const content = `
  <figure>
    <img src=${poke.sprite} alt="Pokemon Sprite">
  </figure>

  <div class="info">
    <h4> ${poke.name} </h4>
    <p> # ${poke.index} </p>
    <p> Altura: ${poke.height} </p>
    <p> Peso: ${poke.weight} </p>
  </div>

  <div class="stats">
    <div class="stat">
      <p> HP: </p>
      <div class="bar">
        <div style="width: ${(poke.hp/255)*100}%;"></div>
      </div>
    </div>
    
    <div class="stat">
      <p> ATK: </p>
      <div class="bar">
        <div style="width: ${(poke.atk/255)*100}%;"></div>
      </div>
    </div>

    <div class="stat">
      <p> DEF: </p>
      <div class="bar">
        <div style="width: ${(poke.def/255)*100}%;"></div>
      </div>
    </div>

    <div class="stat">
      <p> SPA: </p>
      <div class="bar">
        <div style="width: ${(poke.spa/255)*100}%;"></div>
      </div>
    </div>

    <div class="stat">
      <p>SPD: </p>
      <div class="bar">
        <div style="width: ${(poke.spd/255)*100}%;"></div>
      </div>
    </div>
    
  </div>
  <button class="delete-pokemon"> basura </button>
  `;

  const _article = document.createElement("article");
  _article.innerHTML = content;
  _article.dataset.index = poke.index;

  _article.querySelector(".delete-pokemon")
    .addEventListener("click", ()=> {
      //Eliminar pokemon
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