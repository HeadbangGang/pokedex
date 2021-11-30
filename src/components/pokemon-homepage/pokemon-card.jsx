import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { typeImages } from '../../media/types/index'
import spinner from '../../media/spinner.webp'
import imageNotFound from '../../media/image-not-found.png'

export default function PokemonCard ({ pokemonData, setSelectedPokemon, showShiny }) {
    const history = useHistory()

    const { name, img, img_shiny, id, types } = pokemonData

    const [image, setImage] = useState(spinner)

    useEffect(() => {
        showShiny && img_shiny
            ? setImage(img_shiny)
            : setImage(img)
    }, [showShiny, pokemonData ])

    if (name) {
        return (
            <div className="pokemon-home__card-wrapper">
                <Card border="secondary pokemon-card">
                    <span className='pokemon-card__id'>
                        #{ id }
                    </span>
                    <Card.Body>
                        <Card.Title className="pokemon-card__img-container">
                            { image &&
                            <img
                                alt={ name }
                                className="pokemon-card__img"
                                draggable={ false }
                                onError={ () => setImage(imageNotFound) }
                                src={ image }
                            /> }
                        </Card.Title>
                        <Card.Subtitle className="pokemon-card__name-container">
                            <div className="pokemon-card__name-container__name">
                                { name }
                            </div>
                            <div>
                                { types.map(type => {
                                    type = type.type.name
                                    return (
                                        <img
                                            alt={ type }
                                            className="pokemon-card__type-img"
                                            key={ type }
                                            src={ typeImages[type] }
                                        />
                                    )})
                                }
                            </div>
                        </Card.Subtitle>
                    </Card.Body>
                    <a
                        className="stretched-link"
                        onClick={ () => {
                            setSelectedPokemon(name)
                            history.push(`/pokemon/${ name }`)
                        } }
                    ></a>
                </Card>
            </div>
        )
    } else {
        return null
    }
}

PokemonCard.propTypes ={
    allPokemonData: PropTypes.array,
    pokemon: PropTypes.object,
    setAllPokemonData: PropTypes.func,
    setSelectedPokemon: PropTypes.func,
    showShiny: PropTypes.bool
}