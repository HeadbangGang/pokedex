/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react'
import { Card, Container, Row, Button } from 'react-bootstrap'

type PokemonProps = {
    pokemon: any
    }

export default function PokemonCard({pokemon}: PokemonProps): any {
    const [pokemonData, setPokemonData] = useState<any>({})
    const [shouldShowExtendedData, setShouldShowExtendedData] = useState<any>({})

    // const pokedexIndex = pokemonList.index
    const pokemonName = pokemon.name
    if (pokemonName) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title className="pokemon-name">
                                    {/* <div>{pokedexIndex}</div> */}
                                    {pokemon.name}
                                </Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                            <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of the cardʼs content.
                                            </Card.Text> */}
                                { shouldShowExtendedData[pokemonName] && showExtendedData(pokemonName) }
                                {shouldShowExtendedData[pokemonName] ?
                                    <Button onClick={ () => setShouldShowExtendedData({ [pokemonName]: false }) }>Hide Extended Data</Button>
                                    : <Button onClick={ () => fetchExtendedData(pokemonName) }>Show Extended Data</Button>
                                }
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </>
        )
    }

    function showExtendedData(pokemonName: any) {
        try {
            if (Object.keys(pokemonData).includes(pokemonName)) {
                const types = pokemonData[pokemonName].types.map((type: any) => {
                    return Object(type.type.name)
                })
                return (
                    <ul>
                        <dl>Height: {pokemonData[pokemonName].height}</dl>
                        <dl>Base Experience: {pokemonData[pokemonName].baseExperience}</dl>
                        <dl>Types: {types}</dl>
                    </ul>
                )
            }
        } catch (e){
            console.log(e)
        }
    }

    async function fetchExtendedData(name: string) {
        try {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(
                    function (res) {
                        res.json().then(function (data) {
                            const updatedPokemonData = { ...pokemonData,
                                [name]:{
                                    baseExperience: data.base_experience,
                                    height: data.height,
                                    name: name,
                                    types: data.types
                                } }
                            setPokemonData(updatedPokemonData)
                        })
                    }
                )
            setShouldShowExtendedData({ ...shouldShowExtendedData, [name]: true })
        }
        catch (e) {
            console.log(e)
        }
    }
}