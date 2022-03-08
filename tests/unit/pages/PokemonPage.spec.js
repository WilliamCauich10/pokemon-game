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

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => { 
         
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

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        //PokemonPicture debe de existir
        expect( picture.exists() ).toBeTruthy()
        //PokemonOptions debe de existir
        expect( options.exists() ).toBeTruthy()

        //PokemonPicture debe de tener el pokemonId === 5
        expect( picture.attributes('pokemonid')).toBe( '1' )
        //pokemon debe de tener pokemon
        expect( options.attributes('pokemons')).toBeTruthy()
    })

    test('pruebas con checkAnswer', async () => { 
         
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

        await wrapper.vm.checkAnswer(1)

        expect( wrapper.find('h2').exists() ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBe(true)
        expect( wrapper.find('h2').text() ).toBe(`Correcto, ${ pokemons[0].name }`)

        await wrapper.vm.checkAnswer(2)
        expect( wrapper.vm.message ).toBe(`Oops, era ${ pokemons[0].name } `)

    })
})