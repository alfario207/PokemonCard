const items = document.getElementById("wrapper");
const input = document.getElementById("search-input");
const closeButton = document.querySelector(".close-button-visible");
const notFoundMessage = document.querySelector(".not-found")

let pokemons = [];

fetch("https://pokeapi.co/api/v2/pokemon?limit=500").then((response) => response.json()).then((data) => {
    pokemons = data.results;
    console.log("RES", data);
    console.log("POKE", pokemons);
    displayPokemons(pokemons);
  });

const displayPokemons = (params) => {
  // console.log(params);
  items.textContent = "";
  // console.log(params);

  params.forEach((param) => {
    const pokemonsID = param.url.split("/")[6];
    const list = document.createElement("div");
    list.className = "list-items";

    const number = document.createElement("div");
    number.className = "number-wrap";
    const numberCaption = document.createElement("p");
    numberCaption.className = "caption";
    numberCaption.textContent = `No.${pokemonsID}`;
    number.append(numberCaption);

    const image = document.createElement("div");
    image.className = "img-wrap";
    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsID}.svg`;
    img.alt = pokemons.name;
    image.append(img);

    const name = document.createElement("div");
    name.className = "name-wrap";
    const nameCaption = document.createElement("p");
    nameCaption.className = "fonts";
    nameCaption.textContent = `${param.name}`;
    name.append(nameCaption)

    list.append(number)
    list.append(image)
    list.append(name)

    items.append(list)

    list.addEventListener("click", async () => {
      items.textContent = "Loading...."
      window.location.href = `./detail.html?id=${pokemonsID}`
    })
  });
};

input.addEventListener("keyup", () => {
  const search = input.value.toLowerCase()
  let filteredPokemons = null
  console.log(input.value)
  console.log('iput',input)

  filteredPokemons = pokemons.filter((param) => {
    const pokemonsID = param.url.split("/")[6]
    console.log(param)

    return (
      param.name.toLowerCase().includes(search) || 
      pokemonsID.startsWith(search)
    )
  })

  displayPokemons(filteredPokemons)

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block"
  } else {
    notFoundMessage.style.display = "none"
  }

  console.log("Seach",search)
  if (search !== "") {
    document.getElementById("close-button").classList.remove("close-button-visible")
  } else {
    document.getElementById("close-button").classList.add("close-button-visible")
  }

  closeButton.addEventListener("click", () => {
    document.getElementById("close-button").classList.add("close-button-visible")
    console.log("IV",input.value)

    input.value = ""
    displayPokemons(pokemons)
  })
});
