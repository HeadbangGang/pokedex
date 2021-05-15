/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from 'react'
import { Card, Col } from 'react-bootstrap'
import {Bug, Dark, Dragon, Electric, Fairy, Fighting, Fire, Flying, Ghost, Grass, Ground, Ice, Normal, Poison, Psychic, Rock, Steel, Water } from '../media/types/index'

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
                <Card border="secondary">
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
                                <div style={{textTransform: 'capitalize'}}>{types.includes('/') ? 'types' : 'type'}: {types}</div>
                            </div>
                            : <div>Loading...</div>
                        }
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}