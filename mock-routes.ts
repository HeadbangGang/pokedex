const MOCK_DELAY = 1000
const mockPokemonList = require('./mocks/pokemon-list.json')

const mockRoutes = (app) => {
    app.get('/pokedex/count', (req, res) => res.status(200).send({ count: 100 }))
    app.post('/pokedex/pokemon/list', (req, res) => setTimeout(() => res.status(200).send(mockPokemonList), MOCK_DELAY))
}

module.exports = mockRoutes
