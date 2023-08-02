const MOCK_DELAY = 750

const mockRoutes = (app) => {
	app.get('/pokedex/count', (req, res) => {
		setTimeout(() => {
			res.status(200).send(require('./pokedex-count.json'))
		}, MOCK_DELAY)
	})
	app.get('/pokedex/pokemon/list', (req, res) => {
		setTimeout(() => {
			res.status(200).send(require('./pokemon-list.json'))
		}, MOCK_DELAY)
	})
	app.post('/oauth/token', (req, res) => {
		setTimeout(() => {
			res.status(200).send(require('./oauth-token.json'))
		}, MOCK_DELAY)
	})
}

module.exports = mockRoutes
