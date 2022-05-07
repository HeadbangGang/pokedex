import React, {createContext, useContext, useEffect, useState} from 'react'
import { PokemonDataInterface } from '../interfaces'
import {BaseUrlContext} from './base-url'

export const PokemonDataContext = createContext(null)
PokemonDataContext.displayName = 'PokemonData'

const PokemonData = ({ children }) => {
    const [showShiny, setShowShiny] = useState<boolean>(false)
    const [passbackUrl, setPassbackUrl] = useState<string>(null)
    const [pokemonData, setPokemonData] = useState<PokemonDataInterface[]>([])
    const [pokedexCount, setPokedexCount] = useState<number>(null)
    const [nextUrl, setNextUrl] = useState<string>(null)
    const [previousUrl, setPreviousUrl] = useState<string>(null)

    const baseUrl = useContext(BaseUrlContext)

    const fetchPokemonData = async () => {
        fetch(`${ baseUrl }/pokemon/list`, {
            method: 'POST',
            body: JSON.stringify({ passbackUrl: passbackUrl })
        })
            .then(res => res.json())
            .then(res => {
                const { nextUrl, previousUrl } = res
                setPokemonData([...pokemonData, ...res.pokemonData])
                setNextUrl(nextUrl)
                setPreviousUrl(previousUrl)
            })
            .catch(() => {})
    }

    useEffect(() => {
        fetchPokemonData()
        fetch(`${ baseUrl }/count`)
            .then(res => res.json())
            .then(({ count }) => setPokedexCount(count))
            .catch(() => {})
    }, [])

    const data = {
        fetchPokemonData,
        nextUrl,
        passbackUrl,
        pokedexCount,
        pokemonData,
        previousUrl,
        setPassbackUrl,
        setShowShiny,
        showShiny
    }

    return (
        <PokemonDataContext.Provider value={ data }>
            { children }
        </PokemonDataContext.Provider>
    )
}

export default PokemonData
