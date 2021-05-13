import React, {useState, useEffect} from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'

export default function Dashboard () {

    const [pokemonList, setPokemonList] = useState<any>()
    const [pokemonData, setPokemonData] = useState<any>()
    const [shouldShowExtendedData, setShouldShowExtendedData] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        try {
            fetch('https://pokeapi.co/api/v2/pokemon/')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Whoops, shits broke')
                        }
                        response.json().then(function (data) {
                            setPokemonList(data.results)
                        })
                    }
                )
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <>
            <div>Pokemon</div>
            { pokemonList && pokemonList.map(function (pokemon: any) {
                function extendedData(name: string) {
                    try {
                        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                            .then(
                                function (res) {
                                    res.json().then(function (data) {
                                        setPokemonData({
                                            baseExperiece: data.base_experience,
                                            height: data.height,
                                            name: name,
                                            types: data.types
                                        })
                                    })
                                }
                            )
                        console.log(pokemonData.types)
                    }
                    catch (e) {
                        console.log(e)
                    }
                }

                return (
                    <>
                        <Container>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{pokemon.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the cardʼs content.
                                        </Card.Text>
                                        <Button onClick={ () => extendedData(pokemon.name) }>Show More Data</Button>
                                        { pokemonData && pokemon.name === pokemonData.name && 
                                        <div>
                                            {pokemonData.height}
                                            {pokemonData.baseExperiece}
                                            {pokemonData.types.forEach((type: any) => {
                                                const meow = Object(type.type.name)
                                                return meow
                                            }
                                            )}
                                        </div> }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Container>
                    </>
                )
            })
            }
        </>
    )
}