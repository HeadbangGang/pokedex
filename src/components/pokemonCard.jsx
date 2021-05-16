import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'
import { typeImages } from '../media/types/index'

export default function PokemonCard({pokemon}) {
    const [hasExtendedData, setHasExtendedData] = useState(false)
    const [pokemonData, setPokemonData] = useState()
    const history = useHistory()

    useEffect(() => {
        const name = pokemon.name
        const getPokemonData = async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            if (res.status === 200){
                res.json().then(function (data) {
                    setPokemonData({
                        baseExperience: data.base_experience,
                        height: data.height,
                        id: data.id,
                        img: data.sprites.front_default,
                        name: name,
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

    // const pokedexIndex = pokemonList.index
    const pokemonName = pokemon.name
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
                            { hasExtendedData && <img src={pokemonData.img} alt={pokemon.name} style={{height: '150px', width: '150px'}} draggable={ false } />}
                        </Card.Title>
                        <Card.Subtitle className="pokemon-name">
                            {pokemon.name}
                        </Card.Subtitle>
                        { hasExtendedData
                            ? <div style={{fontSize: '12px', fontWeight: 100}}>
                                <div>#{pokemonData.id}</div>
                                <div>Height: {pokemonData.height}</div>
                                <div>Base XP: {pokemonData.baseExperience}</div>
                                <div style={{textTransform: 'capitalize'}}>{pokemonData.types.length > 1 ? 'types' : 'type'}: {types}</div>
                            </div>
                            : <div>Loading...</div>
                        }
                    </Card.Body>
                    <a onClick={() => history.push('/pokemon')} className="stretched-link"></a>
                </Card>
            </Col>
        )
    }
}