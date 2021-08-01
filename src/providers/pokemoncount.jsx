/* eslint-disable no-console */
import React, { createContext, useEffect, useState } from 'react'

export const PokemonCountContext = createContext()

export default function PokemonCount (props) {
    const [pokemonCount, setPokemonCount] = useState([])

    useEffect(() => {
        async function getPokedexCount () {
            const res = await fetch('https://pokeapi.co/api/v2/pokedex/1')
            if (res.status === 200){
                await res.json().then(function (data) {
                    setPokemonCount(data.pokemon_entries.length)
                })
            } else {
                console.log('Whoops, something went wrong')
            }
        }
        getPokedexCount()
    }, [])

    return (
        <PokemonCountContext.Provider value={ pokemonCount }>
            { props.children }
        </PokemonCountContext.Provider>
    )
}