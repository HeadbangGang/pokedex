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
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
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
                <img key={index} src={typeImages[typeName]} style={{ maxWidth: '50px', margin: '0 2.5px' }} alt={typeName} />
            )
        })

        return (
            <Col>
                <Card border="secondary pokemon-card">
                    { hasExtendedData && <span style={{ padding: '5px 0 0 10px', fontSize: '16px', fontWeight: 100, textAlign: 'left' }}>#{ pokemonData.id }</span> }
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center' }}>
                            { hasExtendedData && !isLoadingData
                                ? <img
                                    src={ errorImg || pokemonData.img || pokemonData.img_alt }
                                    alt={pokemonName}
                                    style={{ height: '175px', width: '175px' }} // Need to set width of error image to 200px
                                    draggable={ false }
                                    onError={() => setErrorImg(imageNotFound)}
                                />
                                : <img
                                    src={ spinner }
                                    alt='loading'
                                    style={{ height: '75px', width: '75px', margin: '38px' }}
                                    draggable={ false }
                                    onLoad={() => setIsLoadingData(false)}
                                />}
                        </Card.Title>
                        <Card.Subtitle className="pokemon-name">
                            {pokemonName}
                            <div>
                                { hasExtendedData && types }
                            </div>
                        </Card.Subtitle>
                    </Card.Body>
                    <a
                        className="stretched-link"
                        onClick={() => {
                            setSelectedPokemon(pokemonName)
                            history.push(`/pokemon/${pokemonName}`)
                        }}
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