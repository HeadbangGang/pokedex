import React, {createContext, useContext, useEffect, useState} from 'react'
import { PokemonDataInterface, ResponseParamsInterface } from '../interfaces'
import { isEmpty } from '../helpers/helpers'
import {BaseUrlContext} from './base-url'

export const PokemonDataContext = createContext(null)
PokemonDataContext.displayName = 'PokemonData'

const PokemonData = ({ children }) => {
    const [showShiny, setShowShiny] = useState<boolean>(false)
    const [pokemonData, setPokemonData] = useState<PokemonDataInterface[]>([])
    const [pokedexCount, setPokedexCount] = useState<number>(null)
    const [nextCallParams, setNextCallParams] = useState<ResponseParamsInterface>({})

    const baseUrl = useContext(BaseUrlContext)

    const fetchPokemonData = async () => {
        let url = `${ baseUrl }/pokemon/list`
        if (nextCallParams.offset && nextCallParams.limit) {
            const { offset, limit } = nextCallParams
            url = `${url}?offset=${offset}&limit=${limit}`
        }
        fetch(url)
            .then(res => res.json())
            .then(res => {
                const newNextCallParams = {}
                if (!isEmpty(res.pokemonData)) {
                    setPokemonData(prevState => [...prevState, ...res.pokemonData])
                }
                if (!isEmpty(res.params)) {
                    Object.keys(res.params).forEach(key => newNextCallParams[key] = res.params[key])
                    setNextCallParams({...nextCallParams, ...newNextCallParams})
                } else {
                    setNextCallParams({})
                }
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
        nextCallParams,
        pokedexCount,
        pokemonData,
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
