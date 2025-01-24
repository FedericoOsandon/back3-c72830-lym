const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )
const appRouter = require('./routes/index.js')


const cors = require('cors')
const { logger, addLogger } = require('./utils/logger.js')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
const { swaggerOptions } = require('./utils/swaggerDockConfig.js')


const app = express() 
const PORT = process.env.PORT||8080 
const connection = mongoose.connect(`mongodb://127.0.0.1:27017/c72830`)

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(addLogger)


/* These lines of code are setting up routes in your Express application. */
const specs =swaggerJsDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(appRouter)

app.listen(PORT,()=> logger.info(`Listening on ${PORT}`))
// logger 
// testing
// documentación