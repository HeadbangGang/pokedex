import React, { createContext, useEffect, useState } from 'react'

export const PokemonCountContext = createContext()

export const PokemonCount = (props) => {
    const [pokemonCount, setPokemonCount] = useState(null)

    useEffect(() => {
        const getPokedexCount = async () => {
            try {
                let res = await fetch('https://pokeapi.co/api/v2/pokedex/1')
                res = await res.json()
                setPokemonCount(res.count)
            } catch (e) {
                console.log(e)
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
