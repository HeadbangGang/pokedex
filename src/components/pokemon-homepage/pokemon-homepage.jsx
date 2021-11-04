import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import PokemonCard from './pokemon-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GENERAL } from '../../language-map'
import spinner from '../../media/spinner.webp'
import { UrlInitContext } from '../../providers/url-init'
import './pokemon-homepage.less'

export default function PokemonHomepage (props) {
    const [nextUrl, setNextUrl] = useState()
    const [isCallInProgress, setIsCallInProgress] = useState(false)

    const urlInit = useContext(UrlInitContext)

    const {
        allPokemonData,
        setAllPokemonData,
        setSelectedPokemon,
        setError,
        showShiny
    } = props

    useEffect(() => {
        getPokemon()
    }, [])

    async function getPokemon () {
        setIsCallInProgress(true)
        try {
            await axios.post(`${ urlInit }/pokedex/data/pokemon/list`, { nextUrl })
                .then((res) => {
                    res = res.data
                    const meow = allPokemonData.concat(res.pokemonData)
                    setAllPokemonData(meow)
                    setNextUrl(res.nextUrl)
                })
        } catch (e) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsCallInProgress(false)
        }
    }

    return (
        <>
            {allPokemonData.length > 0
                ? <InfiniteScroll
                    dataLength={ allPokemonData.length }
                    next={ getPokemon }
                    hasMore={ !!nextUrl }
                >
                    <div className='pokemon-home__cards-container'>
                        { allPokemonData.map((pokemon, index) => {
                            return (
                                <PokemonCard
                                    key={ index }
                                    showShiny={ showShiny }
                                    setError={ setError }
                                    pokemonData={ pokemon }
                                    setSelectedPokemon={ setSelectedPokemon }
                                />
                            )
                        }) }
                    </div>
                    {isCallInProgress &&
                        <div style={{ textAlign: 'center' }}>
                            <img src={ spinner } alt={ GENERAL.loading } height="50" width="50" />
                        </div>}
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