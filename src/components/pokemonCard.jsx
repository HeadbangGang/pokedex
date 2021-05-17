/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'
import { typeImages } from '../media/types/index'
import spinner from '../media/spinner.webp'
import imageNotFound from '../media/image-not-found.png'

export default function PokemonCard({ pokemon, setSelectedPokemon }) {
    const pokemonName = pokemon.name

    const [hasExtendedData, setHasExtendedData] = useState(false)
    const [pokemonData, setPokemonData] = useState()
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [errorImg, setErrorImg] = useState()
    const history = useHistory()

    useEffect(() => {
        const getPokemonData = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                if (res.status === 200){
                    res.json().then(function (data) {
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
            } catch (e) {
                console.log(e)
            }
        }
        getPokemonData()
    }, [])

    if (pokemonName) {
        const types = pokemonData && pokemonData.types.map((type, index) => {
            const typeName = type.type.name
            return (
                <img key={index} src={typeImages[typeName]} style={{ maxWidth: '35px', margin: '0 2.5px' }} alt={typeName} />
            )
        })

        return (
            <Col>
                <Card border="secondary pokemon-card">
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center'}}>
                            { hasExtendedData && !isLoadingData
                                ? <img
                                    src={ errorImg || pokemonData.img || pokemonData.img_alt }
                                    alt={pokemonName}
                                    style={{height: '150px', width: '150px'}} // Need to set width of error image to 200px
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
                        </Card.Subtitle>
                        { hasExtendedData
                            ? <div style={{fontSize: '12px', fontWeight: 100}}>
                                <div>#{pokemonData.id}</div>
                                <div>Base XP: {pokemonData.baseExperience}</div>
                                <div>{pokemonData.types.length > 1 ? 'Types' : 'Type'}: {types}</div>
                            </div>
                            : <div>Loading...</div>
                        }
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