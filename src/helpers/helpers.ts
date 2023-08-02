

export const getPokemonList = async (): Promise<void> => {
	const token = await getApiToken()
	const response = await fetch(process.env.API_URL + '/pokedex/pokemon/list', {
		headers: {
			'Authorization': `Bearer ${ token }`
		}
	})

	console.log(response.ok)
	console.log(response)
	const json = await response.json()

	console.log(json)

}
