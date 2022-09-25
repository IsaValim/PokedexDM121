
createCard = function (pokemon) {
  const id = pokemon.id.toString().padStart(3, '0') /*Identificador do pokemon com 3 dígitos*/

  const images = pokemon.sprites.other['official-artwork'].front_default

  const colors = pokemon.types[0].type.name

  var pokemonCard = document.createElement('li')
  pokemonCard.classList.add('card-pokemons')
  pokemonCard.classList.add(colors)
  
  pokemonCard.innerHTML = `
    <div class="card-image">
      <div class="number">#${id}</div>
      <img src="${images}" alt="${pokemon.name}">
    </div>
    <div class="name">${pokemon.name}</div>
    `
  return pokemonCard
}
