const {connect, connection} = require('mongoose')
const Users = require('../src/dao/Users.dao')
const Assert = require('node:assert')

const assert = Assert.strict
connect('mongodb://127.0.0.1:27017/c72830test')

describe('Testing de User Dao', function(){
    before(function(){
        this.userDao = new Users()
    })    
    beforeEach(function () {
        connection.collections.users.drop()
        this.timeout(500)
    })

    it('El Dao debe poder obtener los usuarios en formato arreglo', async function(){
        // console.log(this.userDao)
        const result = await this.userDao.get()
        // console.log(result)
        assert.strictEqual(Array.isArray(result), true)
    })

    it('El Dao debe agregar un usuario correctamente a la base de datos', async function() {
        let mockUser = {
            first_name: 'federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'            
        }

        const result = await this.userDao.save(mockUser)
        assert.ok(result._id)
    })

    it('El Dao agregará al documento un arreglo de mascotas vacío por defecto', async function() {
        let mockUser = {
            first_name: 'federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'            
        }

        const result = await this.userDao.save(mockUser)
        assert.deepStrictEqual(result.pets, [])
    })

    it('El Dao puede obtener a un usuario por el email', async function() {
        let mockUser = {
            first_name: 'federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'            
        }

        const result = await this.userDao.save(mockUser)

        const user = await this.userDao.getBy({email: result.email})
        assert.strictEqual(typeof user, 'object')        
    })
})
