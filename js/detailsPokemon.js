const details = document.getElementById('detail')
let pokemonData = []
const InfosCard = document.getElementById('detail-card')

const hideDetail = () => {
  details.classList.remove('show-flex')
  details.classList.add('hide')
}

const ObtainPokemonCard = (card) => {
  const numberText = card.querySelector('.number').innerText
  const number = numberText.split('#')
  const id = parseInt(number[1])

  return pokemonData[id - 1]
}

const detailCard = (pokemon) => {
  const type = pokemon.types[0].type.name

  InfosCard.innerHTML = `
                        <div id="detail-card" class="detail-card ${type}">
                        ${ObtainDetailCard(pokemon)}
                        <img class="pokeball-icon" src="image/pokeball.svg" alt="Pokeball">
                        ${ObtainInfoCard(pokemon)}
                        </div>
                        `
}

const DetailsPokemon = (card) => {
  const pokemon = ObtainPokemonCard(card)
  
  detailCard(pokemon)

  details.classList.remove('hide')
}

const ObtainDetailCard = (pokemon) => {
  const number = pokemon.id.toString().padStart(3, '0')
  const name = pokemon.name

  return `
        <div class="header">
            <div class="title-section">
                <h1 id="title">${name}</h1>
            </div>
            <p class="number">#${number}</p>
        </div>
        `
}

const ObtainInfoCard = (pokemon) => {
  return `
        <div class="detail-card-info">
            ${ObtainImageCard(pokemon)}
            ${ObtainTypesCard(pokemon)}
            <h3 class="text-colored">About</h2>
                ${ObtainDataCard(pokemon)}
                ${ObtainDescription(pokemon)}
                ${ObtainBaseStats(pokemon)}

        </div>
    `
}

const ObtainImageCard = (pokemon) => {
  const pokemonImg = pokemon.sprites.other['official-artwork'].front_default
  const pokemonName = pokemon.name

  return `
            <div class="pokemon-img-container">
                <img src="${pokemonImg}" alt="${pokemonName}">
            </div>
            `
}

const ObtainTypesCard = (pokemon) => {
  const types = pokemon.types
  let typesHtml = ''
  types.forEach((type) => {
    typesHtml += `<li class="${type.type.name}">${type.type.name}</li>`
  })

  return `
            <ul class="types">
                ${typesHtml}
            </ul>
            `
}

const showDetailsOnClick = (pokemons) => {
  const cards = document.querySelectorAll('.card-pokemons')
  pokemonData = pokemons

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      DetailsPokemon(card)
    })
  })
}

const ObtainDetailCharCard = (charIco, charName, charValue) => {
  return `
          <li>
                <div class="value">
                    <i class="${charIco}"></i>
                    <p>${charValue}</p>
                </div>
                <p class="char-name">${charName}</p>
            </li>
            `
}

const ObtainDataCard = (pokemon) => {
  const weight = pokemon.weight / 10
  const height = pokemon.height / 10

  let html = `
        <ul class="char">
            ${ObtainDetailCharCard('fas fa-weight', 'Weight', weight + ' Kg')}
            ${ObtainDetailCharCard('fas fa-ruler-vertical', 'Height', height + ' m')}
            ${ObtainAbilities(pokemon)}
        </ul>
        `

  return html
}

const ObtainAbilities = (pokemon) => {
  const abilities = pokemon.abilities
  let abilitiesHtml = ''
  let abilityCounter = 0

  abilities.forEach((abilityList) => {
    abilityCounter++
    if (abilityCounter <= 2) {
      abilitiesHtml += `<p>${abilityList.ability.name}</p>`
    }
  })

  return `
          <li>
                ${abilitiesHtml}
                <p class="char-name">Abilities</p>
            </li>
            `
}

const ObtainBaseStats = (pokemon) => {
  const pokemonStats = pokemon.stats
/* De acordo com o protótipo */
  return `
        <ul class="stats"> 
            ${obtainDetailStats('HP', pokemonStats[0].base_stat)}
            ${obtainDetailStats('ATK', pokemonStats[1].base_stat)}
            ${obtainDetailStats('DEF', pokemonStats[2].base_stat)}
            ${obtainDetailStats('SATK', pokemonStats[3].base_stat)}
            ${obtainDetailStats('SDEF', pokemonStats[4].base_stat)}
            ${obtainDetailStats('SPD', pokemonStats[5].base_stat)}
        </ul>
    `
}

const ObtainDescription = (pokemon) => {
  return `
            <p class="description">
            </p>
            `
}

const obtainDetailStats = (statName, statValue) => {
  return `
            <li>
            <p class="stat-name">${statName}</p>
            <p class="stat-value">${statValue}</p>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            </li>
            `
}

details.addEventListener('click', (event) => {
  if (event.target === details) {
    hideDetail(event)
  }
})
