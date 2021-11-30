import React from 'react'
import ReactDOM from 'react-dom'
import PokemonContainer from './components/pokemon-container'
import { BrowserRouter as Router } from 'react-router-dom'
import { PokemonCount } from './providers/pokemon-count'
import { UrlInit } from './providers/url-init'
import './index.less'

ReactDOM.render(
    <UrlInit>
        <PokemonCount>
            <Router basename="/">
                <PokemonContainer />
            </Router>
        </PokemonCount>
    </UrlInit>,
    document.getElementById('root')
)
