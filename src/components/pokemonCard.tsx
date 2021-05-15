/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from 'react'
import { Card, Col } from 'react-bootstrap'

type PokemonProps = {
    pokemon: any,
    }

export default function PokemonCard({pokemon}: PokemonProps): any {
    const [hasExtendedData, setHasExtendedData] = useState<any>(false)
    const [pokemonData, setPokemonData] = useState<any>()

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
        const types = pokemonData && pokemonData.types.map((type: any) => {
            return type.type.name
        }).join('/')
        return (
            <Col>
                <Card style={{ width: '13rem' }}>
                    <Card.Body>
                        <Card.Title className="pokemon-name">
                            {/* <div>{pokedexIndex}</div> */}
                            {pokemon.name}
                            { hasExtendedData && <img src={pokemonData.img} alt={pokemon.name} style={{height: '50px', width: '50px'}} /> }
                        </Card.Title>
                        { hasExtendedData &&
                        <div>
                            <div>PokeDex ID #{pokemonData.id}</div>
                            <div>Height: {pokemonData.height}</div>
                            <div>Base Experience: {pokemonData.baseExperience}</div>
                            <div style={{textTransform: 'capitalize'}}>{types.includes('/') ? 'types' : 'type'}: {types}</div>
                        </div>
                        }
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}