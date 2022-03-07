import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from "../mocks/pokemons.moc";

describe('PokemonPage Component', () => { 

    let wrapper

    beforeEach( () => { 
        wrapper = shallowMount( PokemonPage ) 
    })
  
    test('debe de hacer match con el snapshot', () => { 
         expect( wrapper.html() ).toMatchSnapshot( )
    })

    test('debe de llamar mixPokemonArray al montar', () => { 
      
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
        const wrapper = shallowMount( PokemonPage ) 

        expect( mixPokemonArraySpy ).toHaveBeenCalled(  )
    })

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => { 
         //con mount crea el ciclo de vida del componente, el shallowMount no 
        const wrapper = shallowMount( PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect( wrapper.html() ).toMatchSnapshot( )
    })
})