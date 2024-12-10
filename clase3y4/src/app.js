const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )
const appRouter = require('./routes/index.js')


const cors = require('cors')
const { configObject } = require('./config/index.js')
const { fork } = require('child_process')
const { handleError } = require('./middleware/handleError.middleware.js')
const { addLogger, logger } = require('./utils/logger.js')
// importaciones de swagger 


const app = express() 
const { port, mongo_url }  = configObject

const PORT = port
const connection = mongoose.connect(mongo_url)

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(addLogger)

/* These lines of code are setting up routes in your Express application. */
app.use(appRouter)
app.use(handleError)

app.listen(PORT,()=> logger.info(`Listening on ${PORT}`))
