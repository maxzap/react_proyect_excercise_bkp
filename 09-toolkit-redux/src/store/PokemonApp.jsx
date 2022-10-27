import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons } from "./slices/pokemon"

export const PokemonApp = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( getPokemons() );
  
  }, [])

  const { isLoading, pokemons = [], page } = useSelector( state => state.pokemons );  

  return (
    <>
        <h1>PokemonApp</h1>
        <hr/>
        <span>Loading: { isLoading ? 'True': 'False' }</span>
        
        <ul>
          { 
            pokemons.map( ({ name }) => (
               <li key={name}>{name}</li>
            ))
          }
        </ul>
        <button
          disabled={ isLoading }
          onClick={ () => dispatch( getPokemons(page+1) ) }
        >
          Next
        </button>
    </>
  )
}
