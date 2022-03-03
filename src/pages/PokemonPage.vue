<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>

  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <!-- TODO img -->
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <!-- TODO Opciones @selection ="checkAnswer(1, $event)" //el 1 es el numero de elementos-->
    <PokemonOptions
      :pokemons="pokemonArr" 
      @selection ="checkAnswer"
      />

    <!-- template para no poner div y modificar el css -->
      <template v-if="showAnswer">
        <h2 class="fade-in" > {{ message }} </h2>
        <button @click="newGame">
          Nuevo Juego
        </button>
      </template>

  </div>

</template>

<script>
import PokemonOptions from '@/components/PokemonOptions'
import PokemonPicture from '@/components/PokemonPicture'

import getPokemonOptions from "@/helpers/getPokemonOptions";

// console.log( getPokemonOptions());

export default {
    name: 'PokemonPage',
    components:{
        PokemonPicture,
        PokemonOptions
    },
    data() {
      return {
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message: ''
      }
    },
    methods: {
      async mixPokemonArray() {
        this.pokemonArr = await getPokemonOptions()

        const rndInt = Math.floor( Math.random() * 4 )
        this.pokemon = this.pokemonArr[ rndInt ]
      },
      checkAnswer( selectedId) {
        // this.showPokemon = selectedId ===  this.pokemon.id ? true : false
        this.showPokemon = true
        // console.log('pokemon page called', selectedId, this.pokemon.id);
        this.showAnswer = true
        this.message = selectedId === this.pokemon.id ? `Correcto, ${ this.pokemon.name }` : `Oops, era ${ this.pokemon.name } `

      },
      newGame() {
        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
        this.mixPokemonArray()
      }
    },
    mounted() {
      this.mixPokemonArray()
    }
    
}
</script>
