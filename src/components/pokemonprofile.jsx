/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-bootstrap'

export default function PokemonProfile({ pokemon }) {

    const [isCallInProgress, setIsCallInProgress] = useState(false)
    const [pokemonData, setPokemonData] = useState()

    useEffect(() => {
        async function getPokemon() {
            setIsCallInProgress(true)
            try{
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                if (res.status === 200){
                    await res.json().then(function (data) {
                        setPokemonData(data)
                    })
                } else {
                    console.log('Whoops, shits broke') // Need to create error page to navigate to
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsCallInProgress(false)
            }
        }
        if (!pokemon) {
            pokemon = window.location.href
        }
        getPokemon()
    }, [])

    return ( // Want to set pokemon name in navbar
        <>
            { !isCallInProgress && pokemonData
                ? <div style={{ textAlign: '-webkit-center' }}>
                    <Carousel style={{ width: '50%' }}>
                        <Carousel.Item interval={5000}>
                            <img
                                className="d-block w-100"
                                src={ pokemonData.sprites.front_default }
                                alt="First slide"
                                draggable={ false }
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img
                                className="d-block w-100"
                                src={ pokemonData.sprites.front_shiny }
                                alt="Second slide"
                                draggable={ false }
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                :<div>Loading...</div> }
        </>
    )
}

PokemonProfile.propTypes = {
    pokemon: PropTypes.string
}