import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const PokemonCountContext = createContext()

export const PokemonCount = (props) => {
    const [pokemonCount, setPokemonCount] = useState(null)
    useEffect(() => {
        const urlInit = process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001'
            : 'https://desolate-basin-78066.herokuapp.com/'
        const getPokedexCount = async () => {
            await axios.get(`${ urlInit }/pokedex/count`)
                .then((res) => {
                    res = res.data
                    setPokemonCount(res.count)
                })
                .catch(() => {
                    //
                })
        }
        getPokedexCount()
    }, [])

    return (
        <PokemonCountContext.Provider value={ pokemonCount }>
            { props.children }
        </PokemonCountContext.Provider>
    )
}
