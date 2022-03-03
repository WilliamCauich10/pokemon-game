<template>
  <div class="pokemon-container">
    <img
      :src="imgSrc"
      class="hidden-pokemon"
      alt="pokemon">
    <img
      v-if="showPokemon"
      :src="imgSrc"
      class="fade-in"
      alt="pokemon">
  </div>
</template>

<script>
export default {

  props: {
    pokemonId:{
      typed: Number,
      requiered: true
    },
    showPokemon:{
      typed: Boolean,
      requiered: true,
      default: false
    }
  },
  

  computed: {
    imgSrc(){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  }
  
}
</script>
<style scope>
/* escope solo es para este componente */
.pokemon-container {
    height: 200px;
}
img {
  height: 200px;
  position: absolute;
  width: 100vw;
  margin-left: -50vw;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>