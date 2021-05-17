import React from 'react'
import ReactDOM from 'react-dom'
import PokemonContainer from './components/pokemonContainer'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

ReactDOM.render(
    <Router history={ history }>
        <PokemonContainer />
    </Router>,
    document.getElementById('root')
)
