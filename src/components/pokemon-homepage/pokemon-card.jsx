import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { typeImages } from '../../media/types/index'
import spinner from '../../media/spinner.webp'
import imageNotFound from '../../media/image-not-found.png'

export default function PokemonCard ({ allPokemonData, pokemon, setAllPokemonData, setError, setSelectedPokemon, showShiny }) {
    const history = useHistory()

    const { name } = pokemon

    const [isLoading, setIsLoading] = useState(true)
    const [pokemonData, setPokemonData] = useState({})
    const [image, setImage] = useState(spinner)

    useEffect(() => {
        const getPokemonData = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ name }`)
                await res.json()
                    .then(data => {
                        const { id, sprites, types } = data
                        allPokemonData.push(data)
                        setAllPokemonData(allPokemonData)
                        setPokemonData({
                            id,
                            img: sprites.front_default,
                            img_shiny: sprites.front_shiny,
                            types
                        })
                        setImage(sprites.front_default)
                        setIsLoading(false)
                    })
            } catch (e) {
                setError('Something went wrong. Please try again.')
            } finally {
                setIsLoading(false)
            }

        }
        if (allPokemonData.length < 1 || allPokemonData.findIndex(item => item.name === name) < 0) {
            getPokemonData()
        } else {
            const dataInstances = allPokemonData.reduce((array, item, index) => {
                if (item.name === name) {
                    array.push(index)
                }
                return array
            }, [])

            allPokemonData.findIndex(item => item.name === name)
            const data = allPokemonData[allPokemonData.findIndex(item => item.name === name)]
            const { id, sprites, types } = data
            dataInstances.length < 1 && allPokemonData.push(data)
            setAllPokemonData(allPokemonData)
            setPokemonData({
                id,
                img: sprites.front_default,
                img_shiny: sprites.front_shiny,
                types
            })
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const { img_shiny, img } = pokemonData
        showShiny && img_shiny
            ? setImage(img_shiny)
            : setImage(img)
    }, [showShiny, pokemonData ])

    const { id, types } = pokemonData

    if (name && !isLoading) {
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