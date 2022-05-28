import React, { createContext } from 'react'

export const BaseUrlContext = createContext(null)
BaseUrlContext.displayName = 'BaseUrl'

const BaseUrl = ({ children }) => {

    const baseUrl = process.env.NODE_ENV === 'development' ? '/pokedex' : 'https://api.taydenflitcroft.com/pokedex'

    return (
        <BaseUrlContext.Provider value={ baseUrl }>
            { children }
        </BaseUrlContext.Provider>
    )
}

export default BaseUrl
