import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../database/firebase'

export const UserContext = createContext({ user: null })

export default function UserProvider(props) {
    const [userAccount, setUserAccount] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setUserAccount({ user: userAuth })
        })
    }, [])

    return (
        <UserContext.Provider value={ userAccount }>
            { props.children }
        </UserContext.Provider>
    )
}