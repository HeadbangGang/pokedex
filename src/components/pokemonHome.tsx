/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from 'react'
import PokemonCard from './pokemonCard'

export default function PokemonHome (): any {
    const [pokemonList, setPokemonList] = useState<any>()

    useEffect(() => {
        try {
            fetch('https://pokeapi.co/api/v2/pokemon/')
                .then(
                    function (res) {
                        if (res.status !== 200) {
                            console.log('Whoops, shits broke')
                        }
                        res.json().then(function (data) {
                            setPokemonList(data.results)
                        })
                    }
                )
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <>
            <div>Pokemon</div>
            { pokemonList
                ? pokemonList.map(function (pokemon: any, index: any) {
                    return (
                        <PokemonCard key={index} pokemon={ pokemon } />
                    )
                })
                : <div>Loading...</div>}
        </>
    )
}