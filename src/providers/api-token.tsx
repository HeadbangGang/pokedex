import React, { createContext, useState } from 'react'

export const ApiTokenContext = createContext(null)

export const ApiTokenProvider = ({ children }): React.ReactNode => {
	const [ token, setToken ] = useState<string>(null)
	const [ expirationTime, setExpirationTime ] = useState<number>(null)

	const getApiToken = async (): Promise<void | string> => {
		const date = new Date()

		if (token && expirationTime > date.getTime()) return token

		const response = await fetch(process.env.OAUTH_TOKEN_URL, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				audience: process.env.API_URL,
				client_id: process.env.OAUTH_CLIENT_ID,
				client_secret: process.env.OAUTH_CLIENT_SECRET,
				grant_type: 'client_credentials'
			})
		})

		if (response.ok) {
			const json = await response.json()

			date.setSeconds(date.getSeconds() + json.expires_in)

			setToken(json.access_token)
			setExpirationTime(date.getTime())

			return json.access_token
		}

		return null
	}

	return (
		<ApiTokenContext.Provider value={{ getApiToken }}>
			{children}
		</ApiTokenContext.Provider>
	)
}

export default ApiTokenProvider
