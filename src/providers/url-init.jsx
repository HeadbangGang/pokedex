import React, { createContext, useEffect, useState } from 'react'

export const UrlInitContext = createContext()

export const UrlInit = (props) => {
    const [urlInit, setUrlInit] = useState('')

    useEffect(() => {
        setUrlInit(
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'
<<<<<<< HEAD
                : 'https://desolate-basin-78066.herokuapp.com'
=======
                : 'https://desolate-basin-78066.herokuapp.com/'
>>>>>>> 6881bc1504177ca4e572814e86f877ad0ea41f90
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
