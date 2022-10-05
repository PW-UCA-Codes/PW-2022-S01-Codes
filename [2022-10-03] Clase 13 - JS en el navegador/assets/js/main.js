let data = [
  { name: "Name 1", carnet: "00000001" },
  { name: "Name 2", carnet: "00000002" },
  { name: "Name 3", carnet: "00000003" },
  { name: "Name 4", carnet: "00000004" },
  { name: "Name 5", carnet: "00000005" },
  { name: "Name 6", carnet: "00000006" },
]

//console.warn("Hola, pero con cuidado");
let titleElement    = null;
let buttonElement   = null;
//let buttonElements = document.querySelectorAll("button");

let toggleSectBtn   = null;
let showModalBtn    = null;

let infoModal       = null;
let elementsSection = null;

const bindElements = () => {
  titleElement = document.querySelector("#title");
  buttonElement = document.querySelector("button");
  //buttonElements = document.querySelectorAll("button");

  toggleSectBtn = document.querySelector("#toggle-sect-btn");
  showModalBtn = document.querySelector("#show-modal-btn");

  infoModal = document.querySelector("#modal");
  elementsSection = document.querySelector("#elements-section");
}

const bindClickListeners = () => {
  toggleSectBtn.addEventListener("click", ()=> {
    const sections = document.querySelectorAll(".test-section");

    sections.forEach(section => {
      section.classList.toggle("hidden");
      console.log(section.classList);
    })
  });

  showModalBtn.addEventListener("click", ()=> {
    infoModal.classList.add("visible");
  });

  infoModal.addEventListener("click", ()=> {
    infoModal.classList.remove("visible");
  });

  infoModal.querySelector(".content").addEventListener("click", e => {
    e.stopPropagation();
  });

  buttonElement.addEventListener("click", () => {
    alert("Esta es una alerta!");
  });

  elementsSection.querySelectorAll("article").forEach(art => {
    art.addEventListener("click", () => {
      console.log(`Le di click al ${art.dataset.id}`);
    });
  });

  /* buttonElements.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      console.log(`Alerta de botón ${i+1}`);
    });

    btn.addEventListener("mouseenter", ()=> {
      console.warn("Entro el mouse");
    })
  }) */
}

const renderElements = () => {
  data.forEach((elementInfo) => {
    const element = document.createElement("article");
    element.innerHTML = `
      <h3> ${elementInfo.name} </h3>
      <p> ${elementInfo.carnet} </p>
    `;

    element.dataset.id = elementInfo.carnet;
    elementsSection.appendChild(element);
  })
}

let Main = () => {
  
  bindElements();
  renderElements();
  
  bindClickListeners();
  console.log(titleElement);
  titleElement.innerHTML = "Titulo dinámico v2";
}

window.onload = Main;