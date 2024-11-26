const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )
const appRouter = require('./routes/index.js')


const cors = require('cors')
const { configObject } = require('./config/index.js')
const { fork } = require('child_process')
// importaciones de swagger 


const app = express() 
const { port, mongo_url }  = configObject

const PORT = port
const connection = mongoose.connect(mongo_url)

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const operacionCompleja = () => {
    let result = 0
    for (let i = 0; i < 10e10; i++) {
        result += i        
    }
    return result
}

app.get('/pruebas/suma', (req, res) => {
    const result = operacionCompleja()
    res.send(`El resultado es : ${result}`)
})

app.get('/pruebas/sumachild', (req, res) => {
    const child = fork('./src/operacionCompleja.js')

    child.send('Iniciar el calculo')

    child.on('message', result => {
        return res.send(`El resultado es : ${result}`)
    })

})

/* These lines of code are setting up routes in your Express application. */
// app.use(appRouter)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
