import React from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './components/homepage'
import ApiTokenProvider from './providers/api-token'
import PokemonListProvider from './providers/pokemon-list'

const root = createRoot(document.getElementById('pokedex'))

root.render(
	<ApiTokenProvider>
		<PokemonListProvider>
			<Homepage/>
		</PokemonListProvider>
	</ApiTokenProvider>
)
