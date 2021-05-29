/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'
import { typeImages } from '../media/types/index'
import spinner from '../media/spinner.webp'
import imageNotFound from '../media/image-not-found.png'

export default function PokemonCard ({ pokemon, setSelectedPokemon }) {
    const pokemonName = pokemon.name

    const [hasExtendedData, setHasExtendedData] = useState(false)
    const [pokemonData, setPokemonData] = useState()
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [errorImg, setErrorImg] = useState()
    const history = useHistory()

    useEffect(() => {
        const getPokemonData = async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemonName }`)
            if (res.status === 200){
                await res.json().then(function (data) {
                    setPokemonData({
                        baseExperience: data.base_experience,
                        id: data.id,
                        img: data.sprites.front_default,
                        img_alt: data.sprites.front_shiny,
                        name: pokemonName,
                        types: data.types
                    })
                    setHasExtendedData(true)
                })
            } else {
                console.log('Whoops, shits broke')
            }
        }
        getPokemonData()
    }, [])

    if (pokemonName) {
        const types = pokemonData && pokemonData.types.map((type, index) => {
            const typeName = type.type.name
            return (
                <img
                    className="pokemon-card-type-img" alt={ typeName }
                    key={ index }
                    src={ typeImages[typeName] }
                />
            )
        })

        return (
            <Col className='pokemon-card-container'>
                <Card border="secondary pokemon-card">
                    { hasExtendedData &&
                    <span className='pokemon-card-id'>
                        #{ pokemonData.id }
                    </span> }
                    <Card.Body>
                        <Card.Title className="pokemon-card-img-container">
                            { hasExtendedData && !isLoadingData
                                ? <img
                                    alt={ pokemonName }
                                    className="pokemon-card-img"
                                    draggable={ false }
                                    onError={ () => setErrorImg(imageNotFound) }
                                    src={ errorImg || pokemonData.img || pokemonData.img_alt }
                                />
                                : <img
                                    alt='loading'
                                    className='pokemon-card-img-loading'
                                    draggable={ false }
                                    onLoad={ () => setIsLoadingData(false) }
                                    src={ spinner }
                                />}
                        </Card.Title>
                        <Card.Subtitle className="pokemon-card-name">
                            { pokemonName }
                            <div>
                                { hasExtendedData && types }
                            </div>
                        </Card.Subtitle>
                    </Card.Body>
                    <a
                        className="stretched-link"
                        onClick={ () => {
                            setSelectedPokemon(pokemonName)
                            history.push(`/pokemon/${ pokemonName }`)
                        } }
                    ></a>
                </Card>
            </Col>
        )
    }
}

PokemonCard.propTypes ={
    pokemon: PropTypes.object,
    setSelectedPokemon: PropTypes.func
}