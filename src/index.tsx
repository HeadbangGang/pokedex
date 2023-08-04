import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './components/homepage'
import ApiTokenProvider from './providers/api-token'
import PokemonListProvider from './providers/pokemon-list'
import './index.css'

const root = createRoot(document.getElementById('pokedex'))

root.render(
	<StrictMode>
		<ApiTokenProvider>
			<PokemonListProvider>
				<Homepage />
			</PokemonListProvider>
		</ApiTokenProvider>
	</StrictMode>
)
