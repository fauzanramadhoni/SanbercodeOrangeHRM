describe('Reqres API Testing', () => {

    it('1. GET List Users ', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2')
        .then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body).to.not.be.null
        })
    })

    it('2. GET Single Users', () => {
        cy.request('GET', 'https://reqres.in/api/users/2')
        .then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.data.id).to.eq(2)
        })
    })

    it('3. GET Single User Not Found', () => {
        cy.request({method: 'GET', url: 'https://reqres.in/api/unknown/23', failOnStatusCode: false, headers: {
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((res) => {
          expect(res.status).to.eq(404)
        })
    })

    it('4. GET List Resource', () => {
        cy.request({method: 'GET', url: 'https://reqres.in/api/unknown', headers: {
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.data).to.not.be.empty
        })
    })

    it('5. GET Single Resource', () => {
         cy.request({method: 'GET', url: 'https://reqres.in/api/unknown/2', headers: {
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.data.id).to.eq(2)

        })
    })

    it('6. GET Single Resource Not Found', () => {
        cy.request({method: 'GET', url: 'https://reqres.in/api/unknown/23', failOnStatusCode: false, headers: {
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((res) => {
          expect(res.status).to.eq(404)
        })
    })

    it('7. POST Create User', () => {
        cy.request({method:'POST', url:'https://reqres.in/api/users', body: {
          name: 'morpheus',
          job: 'leader'
        },
        headers: {
          'x-api-key': 'reqres-free-v1'
        },
    }).then((res) => {
          expect(res.status).to.eq(201)
          expect(res.body.name).to.eq('morpheus')
          expect(res.body.job).to.eq('leader')

        })
    })

    it('8. PUT Update User', () => {
        cy.request({method:'PUT', url:'https://reqres.in/api/users/2', body: {
          name: 'morpheus',
          job: 'zion resident'
        },
        headers: {
          'x-api-key': 'reqres-free-v1'
        },
    }).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.name).to.eq('morpheus')
          expect(res.body.job).to.eq('zion resident')

        })
    })

    it('9. PATCH Update User', () => {
        cy.request({method:'PATCH', url:'https://reqres.in/api/users/2', body: {
          name: 'morpheus',
          job: 'zion resident'
        },
        headers: {
          'x-api-key': 'reqres-free-v1'
        },
    }).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.name).to.eq('morpheus')
          expect(res.body.job).to.eq('zion resident')

        })
    })

    it('10. DELETE Users', () => {
         cy.request({method: 'DELETE', url: 'https://reqres.in/api/users/2', headers: {
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((res) => {
          expect(res.status).to.eq(204)
        })
    })

    it('11. POST Register Successful', () => {
        cy.request({method:'POST', url:'https://reqres.in/api/register', body: {
          username: 'eve.holt@reqres.in',
          password: 'pistol'
        },
        headers: {
          'x-api-key': 'reqres-free-v1'
        },
    }).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body).to.have.property('token')
        })
    })

    it('12. POST Register unsuccessful', () => {
        cy.request({method:'POST', url:'https://reqres.in/api/register', failOnStatusCode: false, body: {
          email: 'sydney@fife'
        },
        headers: {
          'x-api-key': 'reqres-free-v1'
        },
    }).then((res) => {
          expect(res.status).to.eq(400)
          expect(res.body).to.have.property('error')
        })
    })

    it('13. POST Login Successful', () => {
        cy.request({method:'POST', url:'https://reqres.in/api/login', body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        },
        headers: {
          'x-api-key': 'reqres-free-v1'
        },
    }).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body).to.have.property('token')
        })
    })

    it('14. POST Login Unsuccessful', () => {
        cy.request({method:'POST', url:'https://reqres.in/api/login', failOnStatusCode: false, body: {
          email: 'peter@klaven'
        },
        headers: {
          'x-api-key': 'reqres-free-v1'
        },
    }).then((res) => {
          expect(res.status).to.eq(400)
          expect(res.body).to.have.property('error')
        })
    })

    it('15. GET Delayed Response', () => {
        cy.request({method: 'GET', url: 'https://reqres.in/api/users?delay=3', headers: {
            'x-api-key': 'reqres-free-v1'
        },
    })
        .then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.data).to.not.be.empty
        })
    })
})