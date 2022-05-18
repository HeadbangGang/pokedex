import React from 'react'
import BaseUrl from './base-url'
import PokemonData from './pokemon-data'
import Errors from './errors'
import UI from './ui'

const ProviderWrapper = ({ children }) => {
    return (
        <BaseUrl>
            <UI>
                <PokemonData>
                    <Errors>
                        { children }
                    </Errors>
                </PokemonData>
            </UI>
        </BaseUrl>
    )
}

export default ProviderWrapper
