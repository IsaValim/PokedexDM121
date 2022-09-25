let pokemonCardInfos = []

const UrlPokemon = () => {
  const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'
  const urls = []

  for (let i = 1; i <= 151; i++) {
    urls.push(pokemonUrl + i)
  }

  return urls
}

const obtainPokemon = async () => {
  const pokemonUrls = UrlPokemon()

  const promises = pokemonUrls.map(url => fetch(url).then(res => res.json()))
  const pokemons = await Promise.all(promises)

  return pokemons
}

const cardsPokemon = async () => {
  const pokemons = await obtainPokemon()
  const pokemonCards = pokemons.map(pokemon => createCard(pokemon))

  document.getElementById('pokemon-container').append(...pokemonCards)

  pokemonCardInfos = pokemons
  showDetailsOnClick(pokemons)
}

cardsPokemon()

const showSearch = (card, searchValue) => {
  const pokemonName = card.querySelector('.name').innerText.toLowerCase()
  if (pokemonName.includes(searchValue)) {
    card.style.display = 'block'
  } else {
    card.style.display = 'none'
  }
}

const searchPokemon = (event) => {
  const Value = event.target.value.toLowerCase()
  const Card = document.querySelectorAll('.card-pokemons')

  Card.forEach((card) => {
    showSearch(card, Value)
  })
}

document.getElementById('input-search').addEventListener('keyup', function (event) {
  searchPokemon(event)
})