import React, { createContext, useEffect, useState } from 'react'

export const PokemonCountContext = createContext()
export const EnvironmentContext = createContext()

export const PokemonCount = (props) => {
    const [pokemonCount, setPokemonCount] = useState(null)
    useEffect(() => {
        const urlInit = process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001'
            : null // Need to update to prod url
        const getPokedexCount = async () => {
            let res = await fetch(`${ urlInit }/pokemon/count`)
            res = await res.json()
            setPokemonCount(res.count)
        }
        getPokedexCount()
    }, [])

    return (
        <PokemonCountContext.Provider value={ pokemonCount }>
            { props.children }
        </PokemonCountContext.Provider>
    )
}
