import React, { useContext } from 'react'
import { auth } from '../../database/firebase'
import { UserContext } from '../../providers/userprovider'
import { useHistory } from 'react-router-dom'


export default function ProfilePage() {
    const userContext = useContext(UserContext ?? '')
    const history = useHistory()

    return (
        <div>
            { userContext?.email && userContext?.username &&
                <div>
                    <div>
                        <div>
                            <h2>{ userContext.username }</h2>
                            <h3>{ userContext.email }</h3>
                        </div>
                    </div>
                    <button onClick={async () => {
                        await auth.signOut()
                            .then(history.push('/pokedex'))
                    }}
                    >Sign out</button>
                </div> }
        </div>
    ) 
}