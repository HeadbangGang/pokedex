import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { PokemonDataContext } from '../../providers/pokemon-data'
import './pokemon-card.less'

const PokemonCard = ({ pokedexId }) => {
    const { showShiny, pokemonData } = useContext(PokemonDataContext)

    const { name, types, default_image, default_image_shiny } = pokemonData.find(({ id }) => id === pokedexId)

    return (
        <div className="pokemon-card__container">
            <Card border="secondary pokemon-card">
                <span className='pokemon-card__id'>
                        #{ pokedexId }
                </span>
                <Card.Body>
                    <Card.Title className="pokemon-card__img-container">
                        <img
                            alt={ name }
                            className="pokemon-card__img"
                            draggable={ false }
                            src={ showShiny && default_image_shiny ? default_image_shiny: default_image }
                        />
                    </Card.Title>
                    <Card.Subtitle className="pokemon-card__name-container">
                        <div className="pokemon-card__name-container__name">
                            { name }
                        </div>
                        <div>
                            { types.map(({ type }) => (
                                <img
                                    alt={ type.name }
                                    className="pokemon-card__type-img"
                                    key={ type.name }
                                    src={`/assets/media/types/${type.name}.png`}
                                />
                            ))}
                        </div>
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PokemonCard
