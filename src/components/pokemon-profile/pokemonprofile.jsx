import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { boxArt } from '../../media/boxart/index'
import { GENERAL } from '../language-map'
import spinner from '../../media/spinner.webp'
import { PokemonProfileBoxArt } from './pokemon-boxart'
import{ PokemonDataChart } from './pokemon-data-chart'
import '../stylesheets/pokemon-profile.css'

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
        getPokemon()
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
                if (key.includes('front_default')){
                    allSprites.push([null, `${ key }`, `${ value }`])
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
                                if (typeof type[game][spriteType] !== 'object' && spriteType.indexOf('front_default') > -1){
                                    allSprites.push([game, spriteType, type[game][spriteType]])
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
                        { sprites?.map((sprite, index) => {
                            if(sprite[0] === null) {
                                return (
                                    <div className="pokemon-profile-img-container" key={ index }>
                                        <img
                                            alt=''
                                            className="d-block pokemon-profile-img"
                                            draggable={ false }
                                            src={ sprite[2] }
                                        />
                                        <PokemonDataChart
                                            data={ pokemonData }
                                        />
                                    </div>
                                )
                            }
                        }) }
                    </Col>
                    <Row xl={ 12 } lg={ 12 } md={ 12 } sm={ 1 } xs={ 1 } className='pokemon-profile-boxart-wrapper'>
                        { gameIndices?.map((game, index) => {
                            let gameInstanceSprite
                            let gameInstanceAlt
                            sprites.forEach(sprite => {
                                if (!gameInstanceSprite) {
                                    if (sprite[0] === game) {
                                        gameInstanceSprite = sprite[2]
                                    } else if (sprite[0]?.includes(game)) {
                                        gameInstanceSprite = sprite[2]
                                    }
                                    gameInstanceAlt = sprite[1]
                                }
                            })
                            if (gameInstanceAlt && gameInstanceSprite) {
                                return (
                                    <Col key={ index } className="pokemon-profile-boxart-container">
                                        <div className='pokemon-profile-boxart-wrapper'>
                                            { game
                                                ?
                                                <>
                                                    <img
                                                        alt={ game }
                                                        className="pokemon-profile-boxart"
                                                        draggable={ false }
                                                        src={ boxArt[game] }
                                                    />
                                                    { gameInstanceSprite &&
                                                    <PokemonProfileBoxArt
                                                        alt={ gameInstanceAlt }
                                                        pokemon={ pokemon }
                                                        sprite={ gameInstanceSprite }
                                                    />}
                                                </>
                                                :
                                                <img src={ spinner } alt={ GENERAL.loading } className='pokemon-page-spinner' />
                                            }
                                        </div>
                                    </Col>
                                )
                            }
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