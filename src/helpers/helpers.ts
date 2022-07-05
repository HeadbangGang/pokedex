interface ClientTokenData {
    client_id: string,
    client_secret: string
}

export const isEmpty = (obj) => {
    return !!(obj === undefined || obj === null || typeof obj !== 'object' || !Object.keys(obj).length)
}

export const getAccessToken = async (clientTokenData: ClientTokenData) => {
    let tokenUrl: string = ''

    if (process.env.NODE_ENV === 'production') {
        tokenUrl = 'https://dev-fsldf8y6.us.auth0.com'
    }

    const { client_id, client_secret } = clientTokenData

    return await fetch(`${tokenUrl}/oauth/token`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            'audience': 'https://api.taydenflitcroft.com',
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'client_credentials'
        })
    })
        .then(res => res.json())
        .then(res => {
            return res.access_token
        })
        .catch(() => {})
}