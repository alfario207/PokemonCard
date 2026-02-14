const name = document.querySelector(".name")

let detailPokemons = null

document.addEventListener("DOMContentLoaded", () => {
    const pokemonsID = new URLSearchParams(window.location.search).get("id")
    const id = parseInt(pokemonsID)

    detailPokemons = id 
    loadPokemon(id)
})


const leftArrow = document.querySelector("#left-arrow")
const rightArrow = document.querySelector("#right-arrow")

leftArrow.addEventListener("click", () => {
    if (detailPokemons > 1) {
        navigatePokemon(detailPokemons - 1)
        console.log('left arrow clicked')
    } 
})

rightArrow.addEventListener("click", () => {
    navigatePokemon(detailPokemons + 1)
    console.log('right arrow clicked')
})


navigatePokemon = (id) => {
    console.log("ID",id)
    document.querySelector(".type-pokemon").innerHTML = ""
    document.querySelector(".detail-move-wrap .detail-move").innerHTML = ""
    document.querySelector(".stats-content-wrap").innerHTML = ""

    // update URL agar id sinkron

    const newURL = `${window.location.pathname}?id=${id}`
    window.history.pushState({ id:id }, "" , newURL)
   
    detailPokemons = id
    loadPokemon(id)
}


const loadPokemon = async (id) => {
    // console.log("ID LOAD",id)
    try {
        const pokemonRespos = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = await pokemonRespos.json()
        const speciesRespons = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        const pokemonSpecies = await speciesRespons.json()
        console.log(pokemon)
        console.log(pokemonSpecies)

        // const {flavor_text_entries} = pokemonSpecies
        // console.log(flavor_text_entries)
        // flavor_text_entries.map(({flavor_text}) => {
        //     const description = pokemonSpecies.flavor_text_entries[1].flavor_text

        //     const descriptionPokemon = document.querySelector(".pokemon-description")
        //     descriptionPokemon.textContent = description

        //     console.log(descriptionPokemon)

        //     console.log(description)
        // })

        const {flavor_text_entries} = pokemonSpecies 
        const englishDescription = flavor_text_entries.find(entry => entry.language.name === "en").flavor_text
        const cleanText = englishDescription.replace(/\f/g, ' ');

        const pokemonDescription = document.querySelector(".pokemon-description")
        pokemonDescription.textContent = cleanText

        console.log(cleanText)
        console.log(englishDescription)

        displayPokemonsDetails(pokemon)

    } catch {
        
    }
}


const typeColors = {
    normal: "#A8A77A",
	fire: "#EE8130",
	water: "#6390F0",
	electric: "#F7D02C",
	grass: "#7AC74C",
	ice: "#96D9D6",
	fighting: "#C22E28",
	poison: "#A33EA1",
	ground: "#E2BF65",
	flying: "#A98FF3",
	psychic: "#F95587",
	bug: "#A6B91A",
	rock: "#B6A136",
	ghost: "#735797",
	dragon: "#6F35FC",
	dark: "#705746",
	steel: "#B7B7CE",
	fairy: "#D685AD",
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const displayPokemonsDetails = (pokemon) => {
    const {name, id, weight, height, abilities, types, stats} = pokemon
    // console.log("st",stats)
    const capitalizeName = capitalize(name)
    // console.log("pokemons", capitalizeName)
    document.querySelector("title").textContent = capitalizeName
    document.querySelector(".name-detail .name").textContent = capitalizeName
    document.querySelector(".pokemon-id .pokemon2-fonts").textContent = `#${String(id).padStart(3, "0")}`
    
    const imgElement = document.querySelector("#detail-img")
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    
    const weightPokemon = document.querySelector(".weight")
    weightPokemon.textContent = weight
    
    const heightPokemon = document.querySelector(".height")
    heightPokemon.textContent = height
    
    
    const abilitiesDetail = document.querySelector(".detail-move-wrap .detail-move");
    abilities.map(({ability}, index) => {
        // console.log(index)
        // console.log(ability.name)
        // console.log(abilitiesDetail)
        const para = document.createElement("p")
        para.classList = "move-fonts"
        para.innerHTML = ability.name
        abilitiesDetail.append(para)
    })
    
    
    const typePokemon = document.querySelector(".type-pokemon")
    // typePokemon.innerHTML = ""
    types.map(({type}, index) => {
        // console.log(type.name)
        const tp = document.createElement("p")
        tp.className = "type-font"
        tp.innerHTML = type.name

        const color = typeColors[type.name]
        // console.log("COLOR", color, tp)
        tp.style.backgroundColor = color

        
        typePokemon.append(tp)
    })
    const statistic = document.querySelector(".stats-content-wrap")
    
    const nameMapping = {
        hp: "HP",
        attack: "ATK",
        defense: "DEF",
        "special-attack": "SATK",
        "special-defense": "SDEF",
        speed: "SPD",
    }
    
    stats.map(({stat, base_stat}) => {
        // console.log(base_stat)
        const statDiv = document.createElement("div")
        statDiv.className = "stats-content"
        statistic.append(statDiv)
        
        const namee = document.createElement("p")
        namee.classList = "namee"
        namee.textContent = nameMapping[stat.name]
        statDiv.append(namee)

        const base = document.createElement("p")
        base.classList = "base"
        base.textContent = base_stat
        statDiv.append(base)
                
       const prog = document.createElement("progress")
        prog.classList = "progress-bar"
        prog.setAttribute("value", base_stat)
        prog.setAttribute("max", "100")
        statDiv.append(prog)
                
        // console.log(base_stat)

    })
    typeBackgroundColor(pokemon)      
}
        

const typeBackgroundColor = (pokemon) => {
    const mainType = pokemon.types[0].type.name
    const color = typeColors[mainType]
    
    const main = document.querySelector(".detail-main")
    main.style.backgroundColor = color

    const about = document.querySelector(".about h3")
    about.style.color = color

    const baseStats = document.querySelector(".base-stats h3")
    baseStats.style.color = color
 
    document.querySelectorAll(".namee").forEach(statName => {
        statName.style.color = color        
    });

    document.querySelectorAll(".progress-bar").forEach(progBar => {
        progBar.style.setProperty('--progress-color', color)
    })
    
}
