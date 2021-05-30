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
                ? <div style={{ margin: '10px 0 50px' }}>
                    <h1 style={{ textTransform: 'capitalize', display: 'flex', justifyContent: 'center' }}>
                        { pokemonData.name }
                    </h1>
                    <Col xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
                        <Carousel
                            style={{ maxWidth: '450px', maxHeight: '450px', minHeight: '350px', margin: '20px auto' }}
                            nextIcon={ <img src={ Arrow } style={{ maxWidth: '30px' }} /> }
                            prevIcon={ <img src={ Arrow } style={{ transform: 'rotate(180deg)', maxWidth: '30px' }} /> }
                            interval={ null }
                        >
                            { sprites && sprites.map((sprite, index) => {
                                return (
                                    <Carousel.Item key={ index }>
                                        <div style={{ display: 'flex', justifyContent: 'center', verticalAlign: '50%' }}>
                                            <img // need to set loading while image is loading
                                                alt=''
                                                className="d-block"
                                                draggable={ false }
                                                src={ sprite[1] }
                                                style={{ maxWidth: '300px', maxHeight: '300px', width: '300px', height: '300px', border: '5px solid black', backgroundColor: 'white', borderRadius: '50%' }}
                                            />
                                        </div>
                                    </Carousel.Item>
                                )
                            }) }
                        </Carousel>
                    </Col>
                    <Row xl={ 12 } lg={ 12 } md={ 12 } sm={ 1 } xs={ 1 } className="pokemon-profile-boxart-container">
                        { gameIndices && gameIndices.map((game, index) => {
                            return (
                                <Col key={ index } className='tayden'>
                                    <img src={ boxArt[game] } alt={ game } className="pokemon-profile-boxart" />
                                    <div className='overlay'>
                                        <div className='text'>{ GENERAL.pokemon }</div>
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