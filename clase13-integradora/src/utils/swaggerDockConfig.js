const {dirname} = require('path')

exports.swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de adoptame',
            description: 'Esta es la descripción de documentación de adoptame'
        }
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`]
}