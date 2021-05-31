/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-bootstrap'
import PokemonCard from './pokemonCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GENERAL } from './language-map'
import spinner from '../media/spinner.webp'
import './stylesheets/pokemon-home.css'

export default function PokemonHome ({ setSelectedPokemon }) {
    const [pokemonList, setPokemonList] = useState()
    const [nextPokemonURL, setNextPokemonURL] = useState()
    const [isCallInProgress, setIsCallInProgress] = useState(false)

    useEffect(() => {
        async function getPokemon () {
            try {
                setIsCallInProgress(true)
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
                if (res.status === 200){
                    await res.json().then(function (data) {
                        setPokemonList(data.results)
                        setNextPokemonURL(data.next)
                    })
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsCallInProgress(false)
            }
        }
        getPokemon()
    }, [])

    async function updatePokemonList () {
        try{
            const res = await fetch(nextPokemonURL)
            if (res.status === 200){
                await res.json().then(function (data) {
                    const mergedData = pokemonList.concat(data.results)
                    setPokemonList(mergedData)
                    setNextPokemonURL(data.next)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    if (pokemonList && !isCallInProgress) {
        return (
            <InfiniteScroll
                dataLength={ pokemonList.length }
                next={ () => updatePokemonList() }
                hasMore={ !!nextPokemonURL }
            >
                <Row xl={ 3 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 1 } className='pokemon-home-cards-container'>
                    { pokemonList.map((pokemon, index) => {
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
        )
    } else {
        return (
            <img src={ spinner } alt={ GENERAL.loading } className='pokemon-page-spinner' />
        )
    }
}

PokemonHome.propTypes = {
    setSelectedPokemon: PropTypes.func
}