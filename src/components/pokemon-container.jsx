import React, { useState } from 'react'
import PokemonHomepage from './pokemon-homepage/pokemon-homepage'
import PokemonHeader from './pokemon-header/pokemon-header'
import PokemonFooter from './pokemon-footer/pokemon-footer'
import PokemonProfile from './pokemon-profile/pokemon-profile'
import { Redirect, Route, Switch } from 'react-router-dom'
import './pokemon-container.less'

export default function PokemonContainer () {
    const [allPokemonData, setAllPokemonData] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState('')
    const [error, setError] = useState('')
    const [showShiny, setShowShiny] = useState(false)

    return (
        <div className="pokemon-container">
            <PokemonHeader
                setError={ setError }
                error={ error }
                setShowShiny={ setShowShiny }
                showShiny={ showShiny }
            />
            <div className="pokemon-container__main-content">
                <Switch>
                    <Route exact path="/pokedex">
                        <PokemonHomepage
                            showShiny={ showShiny }
                            allPokemonData={ allPokemonData }
                            setAllPokemonData={ setAllPokemonData }
                            setError={ setError }
                            setSelectedPokemon={ setSelectedPokemon }
                        />
                    </Route>
                    <Route exact path={ `/pokemon/${ selectedPokemon }` }>
                        <PokemonProfile
                            showShiny={ showShiny }
                            selectedPokemon={ selectedPokemon }
                            allPokemonData={ allPokemonData }
                        />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/pokedex" />
                    </Route>
                </Switch>
            </div>
            <PokemonFooter
                error={ error }
                setError={ setError }
            />
        </div>
    )
}