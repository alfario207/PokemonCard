const items = document.getElementById("wrapper");
const input = document.getElementById("search-input");

let pokemons = [];

fetch("https://pokeapi.co/api/v2/pokemon")
  .then((response) => response.json())
  .then((data) => {
    pokemons = data.results;
    console.log("RES", data);
    console.log("POKE", pokemons);
    displayPokemons(pokemons);
  });

const displayPokemons = (params) => {
  console.log(params);
  items.textContent = "";
  console.log(params);

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
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonsID}.png`;
    img.alt = pokemons.name;
    image.append(img);

    const name = document.createElement("div");
    name.className = "name-wrap";
    const nameCaption = document.createElement("p");
    nameCaption.className = "fonts";
    nameCaption.textContent = `${param.name}`;
    name.append(nameCaption);

    list.append(number);
    list.append(image);
    list.append(name);

    items.append(list);
  });
};
