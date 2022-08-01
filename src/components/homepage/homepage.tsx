import React, { useContext } from 'react'
import PokemonCard from '../pokemon-card/pokemon-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PokemonDataContext } from '../../providers/pokemon-data'
import Loading from '../loading/loading'
import './homepage.less'
import {ResponseParamsInterface} from '../../interfaces'
import {isEmpty} from '../../helpers/helpers'

interface PokemonData {
    nextCallParams?: ResponseParamsInterface
    pokemonData?: any[]
    fetchPokemonData?: () => void,
    pokedexCount?: number
}

const Homepage = () => {
    const { nextCallParams, fetchPokemonData, pokemonData, pokedexCount }: PokemonData = useContext(PokemonDataContext)

    if (!pokemonData?.length) {
        return <Loading />
    }

    const renderPokemonCards = () => {
        return pokemonData.map((pokemon, index) => {
            if (pokemon.id > pokedexCount) return null
            return <PokemonCard key={index} pokedexId={ pokemon.id } />
        })
    }

    return (
        <InfiniteScroll
            dataLength={ pokemonData.length }
            next={ async () => await fetchPokemonData() }
            hasMore={ !isEmpty(nextCallParams) }
            loader={ <Loading spinner={false} />}
        >
            <div className='pokemon-home__cards-container'>
                { renderPokemonCards() }
            </div>
        </InfiniteScroll>
    )
}

export default Homepage
