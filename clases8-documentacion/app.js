const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )
const appRouter = require('./routes/index.js')


const cors = require('cors')
const { configObject } = require('./config/index.js')
const { fork } = require('child_process')
const { handleError } = require('./middleware/handleError.middleware.js')
const { addLogger, logger } = require('./utils/logger.js')
// módulos de swagger
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')



const app = express() 
const { port, mongo_url }  = configObject

const PORT = port
const connection = mongoose.connect(mongo_url)

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(addLogger)

/* These lines of code are setting up routes in your Express application. ( documentación simple )*/ 

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Documentación de app web de adopción de mascotas',
            description: 'Api para un app de mascotas'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`] // dirección de nuestros documentos para  nuestros endpoint
}

const specs = swaggerJsDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(appRouter)
app.use(handleError)

const serverListen = () => {
    return app.listen(PORT,()=> logger.info(`Listening on ${PORT}`))

}
module.exports = {
    serverListen
}
