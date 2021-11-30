import React, { createContext, useEffect, useState } from 'react'

export const UrlInitContext = createContext()

export const UrlInit = (props) => {
    const [urlInit, setUrlInit] = useState('')

    useEffect(() => {
        setUrlInit(
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'
                : 'https://desolate-basin-78066.herokuapp.com'
        )
    }, [])

    if (urlInit) {
        return (
            <UrlInitContext.Provider value={ urlInit }>
                {props.children}
            </UrlInitContext.Provider>
        )
    } else {
        return null
    }
}
