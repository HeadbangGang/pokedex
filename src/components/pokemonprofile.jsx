/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export default function PokemonProfile({ pokemon, pokemonData, setPokemonData }) {
    const history = useHistory()

    const [isCallInProgress, setIsCallInProgress] = useState(false)
    const [gameIndices, setGameIndices] = useState()
    const [sprites, setSprites] = useState()

    useEffect(() => {
        async function getPokemon() {
            setIsCallInProgress(true)
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            if (res.status === 200){
                await res.json().then(function (data) {
                    setPokemonData(data)
                    setIsCallInProgress(false)
                })
            } else {
                history.push('/error')
            }
        }
        if (!pokemonData) {
            getPokemon()
        }
    }, [])

    useEffect(() => {
        if (pokemonData) {
            let completeIndices = []
            let allSprites = []
            pokemonData.game_indices.forEach(index => {
                completeIndices.push(index.version.name)
            })

            for (const [key, value] of Object.entries(pokemonData.sprites)) {
                if (value !== null && key !== 'other' && key !== 'versions'){
                    allSprites.push([`${key}`, `${value}`])
                }
            }

            for (const [key, value] of Object.entries(pokemonData.sprites)) {
                if (value !== null && key !== 'other' && key !== 'versions'){
                    allSprites.push([`${key}`, `${value}`])
                }
            }

            setGameIndices(completeIndices)
            setSprites(allSprites)
        }
    }, [pokemonData])

    return ( // Want to set pokemon name in navbar
        <>
            { !isCallInProgress && pokemonData
                ? <div style={{ textAlign: '-webkit-center' }}>
                    { sprites.map((sprite, index) => {
                        return (
                            <img
                                alt="First slide"
                                className="d-block w-100"
                                draggable={ false }
                                key={ index }
                                src={ sprite[1] }
                                style={{ maxWidth: '100px' }}
                            />
                        )
                    }) }
                    { gameIndices.map((game, index) => {
                        return (
                            <span key={ index }>{ game } </span>
                        )
                    })}
                </div>
                :<div>Loading...</div> }
        </>
    )
}

PokemonProfile.propTypes = {
    pokemon: PropTypes.string,
    pokemonData: PropTypes.object,
    setPokemonData: PropTypes.func
}