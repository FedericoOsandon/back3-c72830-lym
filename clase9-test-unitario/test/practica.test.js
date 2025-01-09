const mongoose = require('mongoose')
const User = require('../src/dao/Users.dao')
const chai = require('chai')
const { createHash, passwordValidation } = require('../back3-c72830-lym/clase3y4/src/utils')
const UserDTO = require('../back3-c72830-lym/clase3y4/src/dto/User.dto')


mongoose.connect('mongodb://127.0.0.1:27017/c72830test')
const expect = chai.expect

describe('Testing de Bcrypt utility', ()=>{
    it('El servicio debe devolver un haseo efectivo del password', async function() {
        const password = '123456'
        const hashPassword = await createHash(password)

        expect(hashPassword).to.not.equal(password)
    })
    it('El servicio debe devolver un haseo valido del password', async function() {
        const password = '123456'
        const hashPassword = await createHash(password)

        const isValidate = await passwordValidation({password: hashPassword}, password)
        expect(isValidate).to.be.true
        
    })
    it('El servicio debe devolver validar un hash alterado', async function() {
        const password = '123456'
        const hashPassword = await createHash(password)
        const passAlterado = hashPassword + '1'

        const isValidate = await passwordValidation({password: passAlterado}, password)
        expect(isValidate).to.be.false
        
    })
})

describe('Test de dto de User', ()=>{
    before(function() {
        this.userDto = UserDTO
    })

    it('El Dto de User debe normalizar correctamente los datos del usuario', function() {
        const userMock = {
            first_name: 'federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'            
        }

        let userNomalize = this.userDto.getUserTokenFrom(userMock)

        expect(userNomalize).to.have.property('name', `${first_name} ${last_name}`)
        expect(userNomalize).to.have.property('email', userMock.email)
        expect(userNomalize).to.have.property('role')
    })

    it('El Dto de User normalizado no debe tener todas las propiedades de user', function() {
        const userMock = {
            first_name: 'federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'            
        }

        let userNomalize = this.userDto.getUserTokenFrom(userMock)

        expect(userNomalize).to.not.have.property('first_name')
        expect(userNomalize).to.not.have.property('last_name')
        expect(userNomalize).to.not.have.property('password')
    })

   
})

