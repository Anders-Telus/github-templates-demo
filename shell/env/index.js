const { APP_ENV = 'development' } = process.env;

const config = require(`./${APP_ENV}`)

module.exports = config
