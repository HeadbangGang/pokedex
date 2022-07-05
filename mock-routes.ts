const MOCK_DELAY = 1000
const mockPokemonList = require('./mocks/pokemon-list.json')

const mockRoutes = (app) => {
    app.get('/pokedex/count', (req, res) => res.status(200).send({ count: 100 }))
    app.get('/pokedex/pokemon/list', (req, res) => setTimeout(() => res.status(200).send(mockPokemonList), MOCK_DELAY))
    app.post('/oauth/token', ( req, res) => {
        setTimeout(() => {
            res.send({
                access_token: 'fjkldsajfkldsajflka'
            })
        }, MOCK_DELAY)
    })
    app.get('/mock/client-data', (req, res) => {
        setTimeout(() => {
            res.send({
                Parameters: [
                    {
                        Name: 'Auth0_Global_Backend_Client_ID',
                        Value: 'local client id'
                    },
                    {
                        Name: 'Auth0_Global_Backend_Client_Secret',
                        Value: 'local client secret'
                    }
                ]
            })
        }, MOCK_DELAY)
    })
}

module.exports = mockRoutes
