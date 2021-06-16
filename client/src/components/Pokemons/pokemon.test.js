//instalaciones: 
//npm install chai --save libreria para hacer los assertion
// npm install mocha --save framework para correr los test
const {expect} = require ('chai'); //assertion library 
const Pokemons = require ('./Pokemons');


describe('Pokemons', function() {
    it('should be a funtional component' ,function() {
        expect(Pokemons).to.be.a('function')
    })
})