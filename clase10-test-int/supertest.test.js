const chai = require('chai')
const supertest = require('supertest')

const expect    = chai.expect
const requester =  supertest('http://localhost:8000')

describe('Testing de adoptame', ()=>{
    describe('Test Mascotas', ()=>{
        it('El endpint POST /api/pets debe crear una mascota correctamente', async ()=>{
            const petMock = {
                name: "Patitas",
                specie: 'Pez',
                birthDate: "10-10-2021"
            }

            const { _body } = await requester.post('/api/pets').send(petMock)
            // console.log()
            expect(_body.payload).to.have.property('_id')
        })

        it('El endpoint POST /api/pets debe devolver un status 400 al intentar crear una mascota sin el campo nombre', async () => {
            const petMock = {
                // name: "Patitas",
                specie: 'Pez',
                birthDate: "10-10-2021"
            }

            const { _body, ok, statusCode } = await requester.post('/api/pets').send(petMock)
            expect(statusCode).to.equal(400)
        })

        // it('El endpoint GET /api/pets/:pid debe devolver una mascota por id', async () => {
        //     const petMock = {
        //         name: "Patitas",
        //         specie: 'Pez',
        //         birthDate: "10-10-2021"
        //     }
        //     const response = await requester.post('/api/pets').send(petMock)
        //     expect(response._body.payload).to.have.property('_id')
        //     console.log('response: ',response._body, response.ok, response.statusCode)

        //     const { _body, ok, statusCode } = await requester.get(`/api/pets/${response._body.payload._id}`)

        //     console.log(_body, ok, statusCode)
        //     expect(ok).to.be.equal(true)
        //     expect(statusCode).to.equal(200)
        //     // expect(_body.payload._id).to.equal(response._body.payload._id)

        // })

        


    })

    describe('testing avanzado de sessions', () => {
        let cookie
        // it('El endpoint POST /api/sessions/register debe registrar correctamente a un usuario', async () => {
        //     const mockUser = {
        //         first_name: 'Federico',
        //         last_name: 'Osandón',
        //         email: 'ftestregister@gmail.com',
        //         password: '123456'
        //     }

        //     const { _body } = await requester.post('/api/sessions/register').send(mockUser)
        //     expect(_body).to.be.ok
        // })
        it('El endpoint POST /api/sessions/login debe loguear correctamente al usuario y devolver una cookie', async () => {
            const mockUser = {
                email: 'ftestregister@gmail.com',
                password: '123456'
            }

            const result = await requester.post('/api/sessions/login').send(mockUser)
            // ok _body statusCode - cookie header
            // console.log(result.headers)
            const cookieResult = result.headers['set-cookie'][0] // ['cooderCookie=alkdsflañjsfdlñajsdfljadsfjldjsf']
            expect(cookieResult).to.be.ok
            cookie = {
                name: cookieResult.split('=')[0],// cooderCookie
                value: cookieResult.split('=')[1] // alkdsflañjsfdlñajsdfljadsfjldjsf
            }

            expect(cookie.name).to.be.ok.and.eql('coderCookie')
            expect(cookie.value).to.be.ok

        })

        it('El endpoint GET /api/sessions/current debe recibir la cookie que contiene el usuario y desctructurar correctamente a este', async ()=>{
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(_body.payload.email).to.be.eql('ftestregister@gmail.com')
        })

        

    })


    describe('Test de upload', () => {
        it('Debe poder crearse una masacota con la ruta de la imgen', async () => {
            const petMock = {
                name: "Aletitas",
                specie: 'Perro',
                birthDate: "10-10-2021"
            } 

            const result = await requester.post('/api/pets/withimage')
                                                    .field('name', petMock.name)
                                                    .field('specie', petMock.specie)
                                                    .field('birthDate', petMock.birthDate)
                                                    .attach('image', './test/aletitas.jpg')

            expect(result.status).to.be.eql(200)
            expect(result._body.payload).to.have.property('_id')
            expect(result._body.payload.image).to.be.ok
        })
    })
})