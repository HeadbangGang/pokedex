import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PokemonCard from './pokemon-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GENERAL } from '../../language-map'
import spinner from '../../media/spinner.webp'
import './pokemon-homepage.less'

export default function PokemonHomepage ({ allPokemonData, setAllPokemonData, setSelectedPokemon, setError, showShiny }) {
    const [pokemonList, setPokemonList] = useState([])
    const [nextPokemonURL, setNextPokemonURL] = useState('')
    const [isCallInProgress, setIsCallInProgress] = useState(false)

    useEffect(() => {
        getPokemon()
    }, [])

    async function getPokemon () {
        let url = 'https://pokeapi.co/api/v2/pokemon/?limit=100'
        url = nextPokemonURL || url
        !nextPokemonURL && setIsCallInProgress(true)
        try {
            const res = await fetch(url)
            if (res.status === 200){
                await res.json()
                    .then(data => {
                        const { results, next } = data
                        results.forEach(item => {
                            pokemonList.push(item)
                        })
                        setPokemonList(pokemonList)
                        setNextPokemonURL(next)
                    })
            }
        } catch (e) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsCallInProgress(false)
        }
    }

    return (
        <>
            {pokemonList && !isCallInProgress
                ? <InfiniteScroll
                    dataLength={ pokemonList.length }
                    next={ getPokemon }
                    hasMore={ !!nextPokemonURL }
                >
                    <div className='pokemon-home__cards-container'>
                        { pokemonList.map((pokemon, index) => {
                            return (
                                <PokemonCard
                                    key={ index }
                                    showShiny={ showShiny }
                                    setError={ setError }
                                    pokemon={ pokemon }
                                    allPokemonData={ allPokemonData }
                                    setAllPokemonData={ setAllPokemonData }
                                    setSelectedPokemon={ setSelectedPokemon }
                                />
                            )
                        }) }
                    </div>
                </InfiniteScroll>
                :<div className="pokemon-container__spinner-wrapper">
                    <img src={ spinner } alt={ GENERAL.loading } className='pokemon-container__spinner' />
                </div>
            }
        </>
    )
}

PokemonHomepage.propTypes = {
    allPokemonData: PropTypes.array,
    setAllPokemonData: PropTypes.func,
    setError: PropTypes.func,
    setSelectedPokemon: PropTypes.func,
    showShiny: PropTypes.bool
}