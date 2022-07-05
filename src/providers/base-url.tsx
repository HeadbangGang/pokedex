import React, { createContext, useState, useEffect } from 'react'

export const BaseUrlContext = createContext(null)
BaseUrlContext.displayName = 'BaseUrl'

const BaseUrl = ({ children }) => {
    let baseUrl: string = '/pokedex'
    let awsClientDataUrl: string = 'mock/client-data'

    const [awsClientData, setAwsClientData] = useState({})
    
    if (process.env.NODE_ENV === 'production') {
        baseUrl = 'https://api.taydenflitcroft.com/pokedex'
        awsClientDataUrl = 'https://eor56qtlrtpyyah5utw7l7xbuu0xpegj.lambda-url.us-east-2.on.aws/'
    }

    useEffect(() => {
        fetch(awsClientDataUrl)
            .then(response => response.json())
            .then(res => {
                setAwsClientData({
                    'client_id': res.Parameters.find(item => item.Name === 'Auth0_Global_Backend_Client_ID').Value,
                    'client_secret': res.Parameters.find(item => item.Name === 'Auth0_Global_Backend_Client_Secret').Value
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <BaseUrlContext.Provider value={{ baseUrl, awsClientData }}>
            { children }
        </BaseUrlContext.Provider>
    )
}

export default BaseUrl
