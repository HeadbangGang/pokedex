import React from 'react'
import ReactDOM from 'react-dom'
import PokemonContainer from './components/pokemon-container'
import { BrowserRouter as Router } from 'react-router-dom'
import { PokemonCount } from './providers/pokemon-count'
import './index.less'

ReactDOM.render(
    <PokemonCount>
        <Router basename="/">
            <PokemonContainer />
        </Router>
    </PokemonCount>,
    document.getElementById('root')
)
