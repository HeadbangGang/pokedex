import React, { useContext } from 'react'
import PokemonCard from '../pokemon-card/pokemon-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PokemonDataContext } from '../../providers/pokemon-data'
import Loading from '../loading/loading'
import './homepage.less'

interface PokemonData {
    nextUrl?: string,
    pokemonData?: any[],
    fetchPokemonData?: () => void
}

const Homepage = () => {
    const { nextUrl, fetchPokemonData, pokemonData }: PokemonData = useContext(PokemonDataContext)

    if (!pokemonData?.length) {
        return <Loading />
    }

    return (
        <InfiniteScroll
            dataLength={ pokemonData.length }
            next={ async () => await fetchPokemonData() }
            hasMore={ !!nextUrl }
            loader={ <Loading spinner={false} />}
        >
            <div className='pokemon-home__cards-container'>
                { pokemonData.map((data, idx) => (
                    <PokemonCard
                        pokedexId={ data.id }
                        key={ idx }
                    />
                )
                ) }
            </div>
        </InfiniteScroll>
    )
}

export default Homepage
