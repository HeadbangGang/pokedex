import React, { createContext, useContext, useState } from 'react'
import { ApiTokenContext } from './api-token'
import { PokemonData, PokemonListResponseBody, PokemonListParams } from '../../types/pokemon-list'

export const PokemonListContext = createContext(null)

const PokemonListProvider = ({ children }): React.ReactNode => {
	const { getApiToken, token } = useContext(ApiTokenContext)

	const [ pokemonList, setPokemonList ] = useState<PokemonData[]>([])
	const [ params, setParams ] = useState<PokemonListParams|null>(null)

	const getPokemonList = async (): Promise<void> => {
		await getApiToken()

		let url = process.env.API_URL + '/pokedex/pokemon/list'
		const newParams = new URLSearchParams(params as any ?? {})

		if (newParams.size) {
			url += `?${ newParams }`
		}

		const response = await fetch(url, {
			headers: {
				'Authorization': `Bearer ${ token }`
			}
		})

		const json: PokemonListResponseBody = await response.json()

		setPokemonList(json.pokemonData)
		setParams(json.params)
	}

	return (
		<PokemonListContext.Provider value={{ getPokemonList, pokemonList }}>
			{children}
		</PokemonListContext.Provider>
	)
}

export default PokemonListProvider
