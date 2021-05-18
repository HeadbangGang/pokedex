/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-bootstrap'
import PokemonCard from './pokemonCard'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function PokemonHome ({ setPokemonCount, setSelectedPokemon }) {
    const [pokemonList, setPokemonList] = useState()
    const [nextPokemonURL, setNextPokemonURL] = useState()
    const [isCallInProgress, setIsCallInProgress] = useState(false)

    useEffect(() => {
        async function getPokedexCount() {
            const res = await fetch('https://pokeapi.co/api/v2/pokedex/1')
            if (res.status === 200){
                await res.json().then(function (data) {
                    setPokemonCount(data.pokemon_entries.length)
                })
            } else {
                console.log('Whoops, shits broke')
            }
        }
        getPokedexCount()
        getPokemon()
    }, [])

    async function getPokemon() {
        setIsCallInProgress(true)
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=60')
        if (res.status === 200){
            await res.json().then(function (data) {
                setPokemonList(data.results)
                setNextPokemonURL(data.next)
                setIsCallInProgress(false)
            })
        } else {
            console.log('Whoops, shits broke')
        }
    }

    async function updatePokemonList() {
        try{
            const res = await fetch(nextPokemonURL)
            if (res.status === 200){
                await res.json().then(function (data) {
                    const mergedData = pokemonList.concat(data.results)
                    setPokemonList(mergedData)
                    setNextPokemonURL(data.next)
                })
            } else {
                console.log('Whoops, shits broke')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            { pokemonList && !isCallInProgress
                ?    <InfiniteScroll
                    dataLength={pokemonList.length}
                    next={() => updatePokemonList()}
                    hasMore={!!nextPokemonURL}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <Row xl={ 3 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 1 } style={{ justifyContent: 'center' }}>
                        { pokemonList.map(function (pokemon, index) {
                            return (
                                <PokemonCard
                                    key={ index }
                                    pokemon={ pokemon }
                                    setSelectedPokemon={ setSelectedPokemon }
                                />
                            )
                        }) }
                    </Row>
                </InfiniteScroll>
                : <div>Loading...</div> }
        </div>
    )
}

PokemonHome.propTypes = {
    alertParams: PropTypes.string,
    setAlertParams: PropTypes.func,
    setPokemonCount: PropTypes.func,
    setSelectedPokemon: PropTypes.func,
    setShowAlert: PropTypes.func,
    showAlert: PropTypes.bool
}