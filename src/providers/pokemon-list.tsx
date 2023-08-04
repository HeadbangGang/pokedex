import React, { createContext, useContext, useEffect, useState } from 'react'
import { ApiTokenContext } from './api-token'
import {
	PokemonData,
	PokemonListResponseBody,
	PokemonListParams
} from '../../types/pokemon-list'

export const PokemonListContext = createContext(null)
PokemonListContext.displayName = 'PokemonListContext'

const PokemonListProvider = ({ children }): React.ReactNode => {
	const { token } = useContext(ApiTokenContext)

	const [ pokemonList, setPokemonList ] = useState<PokemonData[]>([])
	const [ params, setParams ] = useState<PokemonListParams | null>(null)

	const getPokemonList = async (): Promise<void> => {
		let url = process.env.API_URL + '/pokedex/pokemon/list'
		const newParams = new URLSearchParams((params as any) ?? {})

		if (newParams.size) {
			url += `?${ newParams }`
		}

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${ token }`
			}
		})

		const json: PokemonListResponseBody = await response.json()

		setPokemonList((prevState: PokemonData[]): PokemonData[] => {
			return [ ...prevState, ...json.pokemonData.sort((a, b) => a.id - b.id) ]
		})
		setParams(json.params)
	}

	useEffect(() => {
		if (token) getPokemonList()
	}, [ token ])

	return (
		<PokemonListContext.Provider value={{ pokemonList }}>
			{children}
		</PokemonListContext.Provider>
	)
}

export default PokemonListProvider
