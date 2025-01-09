const mongoose = require('mongoose')
const User = require('../src/dao/Users.dao')
const chai = require('chai')


const expect = chai.expect
mongoose.connect('mongodb://127.0.0.1:27017/c72830test')

describe('Set de tests con chai', ()=>{
    before(function() {
        this.userDao = new User()
    })
    beforeEach(function() {
        mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    it('El Dao debe poder obtener todos los usuarios en formato de arreglo', async function(){
        const result = await this.userDao.get()
        expect(result).to.be.deep.equal([])
        expect(result).deep.equal([])
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equals(true)
        
    })
})