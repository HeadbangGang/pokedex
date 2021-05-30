import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Carousel, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { boxArt } from '../media/boxart/index'
import Arrow from '../media/arrow.png'
import { GENERAL } from './language-map'

export default function PokemonProfile ({ pokemon, pokemonData, setPokemonData }) {
    const history = useHistory()

    const [isCallInProgress, setIsCallInProgress] = useState(false)
    const [gameIndices, setGameIndices] = useState()
    const [sprites, setSprites] = useState()

    useEffect(() => {
        async function getPokemon () {
            setIsCallInProgress(true)
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemon }`)
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
            let additionalSprites = []
            pokemonData.game_indices.forEach(index => {
                completeIndices.push(index.version.name)
            })
            for (const [key, value] of Object.entries(pokemonData.sprites)) {
                if (value !== null && key !== 'other' && key !== 'versions' && !key.includes('back')){
                    allSprites.push([`${ key }`, `${ value }`])
                }
            }
            for (const game in pokemonData.sprites.versions) {
                additionalSprites.push(pokemonData.sprites.versions[game])
            }
            if (additionalSprites) {
                additionalSprites.forEach(type => {
                    if (!Object.keys(type).includes('icons')) {
                        for (const game in type) {
                            for (const spriteType in type[game]) {
                                if (typeof type[game][spriteType] !== 'object' && spriteType.indexOf('front') > -1 && !spriteType.indexOf('female') > -1){
                                    allSprites.push([spriteType, type[game][spriteType]])
                                }
                            }
                        }
                    }
                })
            }
            setGameIndices(completeIndices)
            setSprites(allSprites)
        }
    }, [pokemonData])

    return (
        <>
            { !isCallInProgress && pokemonData
                ? <div className="pokemon-profile-container">
                    <h1 className="pokemon-profile-name">
                        { pokemonData.name }
                    </h1>
                    <Col xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
                        <Carousel
                            className="pokemon-profile-carousel-container"
                            nextIcon={ <img src={ Arrow } className="pokemon-profile-carousel-navigation-icon-right" /> }
                            prevIcon={ <img src={ Arrow } className="pokemon-profile-carousel-navigation-icon-left" /> }
                            interval={ 5000 }
                        >
                            { sprites && sprites.map((sprite, index) => {
                                return (
                                    <Carousel.Item key={ index }>
                                        <div className="pokemon-profile-carousel-img-container">
                                            <img // need to set loading while image is loading
                                                alt=''
                                                className="d-block pokemon-profile-carousel-img"
                                                draggable={ false }
                                                src={ sprite[1] }
                                            />
                                        </div>
                                    </Carousel.Item>
                                )
                            }) }
                        </Carousel>
                    </Col>
                    <Row xl={ 12 } lg={ 12 } md={ 12 } sm={ 1 } xs={ 1 } className='pokemon-profile-boxart-wrapper'>
                        { gameIndices && gameIndices.map((game, index) => {
                            return (
                                <Col key={ index } className="pokemon-profile-boxart-container">
                                    <img src={ boxArt[game] } alt={ game } className="pokemon-profile-boxart" />
                                    <div className='pokemon-profile-boxart-overlay'>
                                        <div className='pokemon-profile-boxart-overlay-content'>
                                            <div className="pokemon-profile-boxart-overlay-title">
                                                { `${ game.replace('-', ' ') } version` }
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
                :<div>
                    { GENERAL.loading }
                </div>
            }
        </>
    )
}

PokemonProfile.propTypes = {
    pokemon: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    pokemonData: PropTypes.object,
    setPokemonData: PropTypes.func
}