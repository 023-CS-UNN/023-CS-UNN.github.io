const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['guest'] = require('..\\middleware\\guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

export default middleware
