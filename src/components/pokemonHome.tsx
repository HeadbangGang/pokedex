/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from 'react'
import { Row } from 'react-bootstrap'
import PokemonCard from './pokemonCard'

export default function PokemonHome (): any {
    const [pokemonList, setPokemonList] = useState<any>()

    useEffect(() => {
        async function getPokemon() {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
            if (res.status === 200){
                res.json().then(function (data) {
                    setPokemonList(data.results)
                })
            } else {
                console.log('Whoops, shits broke')
            }
        }
        getPokemon()
    }, [])

    return (
        <Row xl={5} lg={4} md={3} sm={2} xs={1}>
            { pokemonList
                ? pokemonList.map(function (pokemon: any, index: any) {
                    return (
                        <PokemonCard key={ index } pokemon={ pokemon } />
                    )
                })
                : <div>Loading...</div>}
        </Row>
    )
}