/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import { Row } from 'react-bootstrap'
import PokemonCard from './pokemonCard'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function PokemonHome () {
    const [pokemonList, setPokemonList] = useState()
    const [nextPokemonURL, setNextPokemonURL] = useState()
    const [isCallInProgress, setIsCallInProgress] = useState(false)

    useEffect(() => {
        getPokemon()
    }, [])

    async function getPokemon() {
        setIsCallInProgress(true)
        try{
            const res = await fetch(nextPokemonURL || 'https://pokeapi.co/api/v2/pokemon/?limit=60')
            if (res.status === 200){
                res.json().then(function (data) {
                    setPokemonList(data.results)
                    setNextPokemonURL(data.next)
                })
            } else {
                console.log('Whoops, shits broke')
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsCallInProgress(false)
        }
    }

    if (pokemonList && !isCallInProgress){
        return (
            <InfiniteScroll
                dataLength={pokemonList.length}
                next={() => getPokemon()}
                hasMore={nextPokemonURL}
                // loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <Row xl={5} lg={4} md={3} sm={2} xs={1}>
                    { pokemonList.map(function (pokemon, index) {
                        return (
                            <PokemonCard key={ index } pokemon={ pokemon } />
                        )
                    }) }
                </Row>
            </InfiniteScroll>
        
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}