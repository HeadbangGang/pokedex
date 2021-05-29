import React, { useContext } from 'react'
import { auth } from '../../database/firebase'
import { UserContext } from '../../providers/userprovider'
import { useHistory } from 'react-router-dom'
import { AUTHENTICATION } from '../language-map'


export default function ProfilePage () {
    const userContext = useContext(UserContext ?? '')
    const history = useHistory()

    if (userContext?.email && userContext?.username) {
        return (
            <div>
                <h2>{ userContext.username }</h2>
                <h3>{ userContext.email }</h3>
                <button onClick={ async () => {
                    await auth.signOut()
                        .then(history.push('/pokedex'))
                } }
                >
                    { AUTHENTICATION.signOut }
                </button>
            </div>
        )
    }

}