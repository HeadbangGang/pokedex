import React, { useContext } from 'react'
import PokemonCard from '../pokemon-card/pokemon-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PokemonDataContext } from '../../providers/pokemon-data'
import Loading from '../loading/loading'
import './homepage.less'
import {ResponseParamsInterface} from '../../interfaces'
import {isEmpty} from "../../helpers/helpers";

interface PokemonData {
    nextCallParams?: ResponseParamsInterface
    pokemonData?: any[]
    fetchPokemonData?: () => void
}

const Homepage = () => {
    const { nextCallParams, fetchPokemonData, pokemonData }: PokemonData = useContext(PokemonDataContext)

    if (!pokemonData?.length) {
        return <Loading />
    }

    return (
        <InfiniteScroll
            dataLength={ pokemonData.length }
            next={ async () => await fetchPokemonData() }
            hasMore={ !isEmpty(nextCallParams) }
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
