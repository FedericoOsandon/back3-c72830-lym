const { Router } = require('express')
const { generarUsers } = require('../utils/mocks')

const router = Router()

router.get('/mocks', (req, res) => {
    let users = []
    for (let i = 0; i < 100; i++) {
        users.push(generarUsers())        
    }

    res.send({status: 'success', data: users})
})

module.exports = router