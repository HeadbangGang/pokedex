import React, { useEffect, useContext } from 'react'
import { PokemonListContext } from '../../providers/pokemon-list'

const Home = (): React.ReactNode => {

	const { getPokemonList } = useContext(PokemonListContext)

	useEffect(() => {
		getPokemonList()
	}, [])

	return (
		<>
			<div>tayden</div>
			<button onClick={getPokemonList}>click</button>
		</>
	)
}


export default Home
