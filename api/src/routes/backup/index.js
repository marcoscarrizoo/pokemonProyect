const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const fetch = require('node-fetch')
//const { Type , Pokemon} = require ('../db')
const {default:axios} = require('axios')
const {v4:uuidv4} = require('uuid')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {conn} = require('../db')
const {Pokemon,Type} = conn.models

//data por query
router.get('/pokemons', (req,res) => {
  //Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
  //Si no existe ningún pokemon mostrar un mensaje adecuado
  
  let {name} = req.query
  fetch('https://pokeapi.co/api/v2/pokemon/' + name)
  .then(res => res.json())
  .then(data => {
  //     pokemon = {
  //         name: data.name,
  //         img: data.sprites.front_default,
  //         type: data.types.map((a)=>{return a.type.name}),
  //         id: data.id,
  //         height: data.height,
  //         weight: data.height,
  // }               
  res.send(data)         
           
  })
  .catch( error => res.status(404,error).json('pokemon no encontrado')) 
  })
  
// router.get("/pokemons",(req,res)=>{
//   let defaultPokes=[];
//   fetch("https://pokeapi.co/api/v2/pokemon/")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data)
//    Promise.all(
//     data.results.map((pokemon)=>
//     fetch(pokemon.url)
//         .then((res)=> res.json())
//         .then((data)=>{
//           let pokemon = {
//             id: data.id,
//             name: data.name,
//             img: data.sprites.front_default,
//             type: data.types.map((a)=>{return a.type.name}),
//             };
//           return pokemon
//         })
//         .catch((err)=> console.log(err))
//       )
//     )
//     .then((pokemons)=>{
//       for(let i = 0; i<20;i++){
//         defaultPokes.push(pokemons[i])
//       }
//       return res.json(defaultPokes)
//     })
//   })
// })

//trae todos los pokemons
router.get("/pokemons", async (req,res)=>{

  let defaultPokes=[];
  let page = "https://pokeapi.co/api/v2/pokemon/"

  try {
    while(defaultPokes.length <40){      
      const resp = await axios.get(`${page}`)
      page = resp.data.next //guarda los 20 pokemons
      let respuesta = resp.data.results 
    Promise.all(respuesta.map(async (pokemon) =>{
        const info = await axios.get(pokemon.url)
        
        pokedatos = info.data
        let poke = {
              id: pokedatos.id,
              name: pokedatos.name,
              img: pokedatos.sprites.front_default,
              type: pokedatos.types.map((a)=>{return a.type.name}),
        }      
       return poke
  
      })).then(data => {
         
         console.log( page)
         defaultPokes = defaultPokes.concat(data)})
      
    
    
    }
  Pokemon.findAll({
  attributes: ['id', 'name'], 
  include:[{
    model: Type, 
    through: {
      attributes: [],
    }
  }]
})
.then(e => {
  const pok = e.map(poke => {
    let formated = {
      id: poke.id,
      name: poke.name,
      type: poke.types.map(t => t.name)
    } 
    return formated ; 
    })
  defaultPokes = defaultPokes.concat(pok)

   return res.json(defaultPokes) })
    
  } catch (error) {
    console.error(error.message)


  }
})

//trae el pokemon por id
router.get('/pokemons/:id', (req,res) => {
//Obtener el detalle de un pokemon en particular
//Debe traer solo los datos pedidos en la ruta de detalle de pokemon
//Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
let {id} = req.params
fetch('https://pokeapi.co/api/v2/pokemon/' + id)
.then(res => res.json())
.then(data => {
//     pokemon = {
//         name: data.name,
//         img: data.sprites.front_default,
//         type: data.types.map((a)=>{return a.type.name}),
//         id: data.id,
//         height: data.height,
//         weight: data.height,
// }               
res.send(data)         
         
})
.catch( error => res.status(404,error).json('pokemon no encontrado')) 
})




// router.get('/pokemons', (req,res) => {
// //Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// //Si no existe ningún pokemon mostrar un mensaje adecuado

// let {name} = req.query.name
// fetch('https://pokeapi.co/api/v2/pokemon/' + name)
// .then(res => res.json())
// .then(data => {
//     pokemon = {
//         name: data.name,
//         img: data.sprites.front_default,
//         type: data.types.map((a)=>{return a.type.name}),
//         id: data.id,
//         height: data.height,
//         weight: data.height,
// }               
// res.send(pokemon)         
         
// })
// .catch( error => res.status(404,error).json('pokemon no encontrado')) 
// })






router.post('/pokemons', async (req,res) => {
//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
//Crea un pokemon en la base de datos
let {name,type, lifeTime, strength, defense, speed, height, weight} = req.body
if(!name) {
   return res.status(422).json({error: 'no se ha podido agregar un nuevo pokemon'})
} 
let newPost = {
    id: uuidv4(),
    name,
    // type,
    lifeTime,
    strength,
    defense,
    speed,
    height,
    weight
    
}
const addPokemons = await Pokemon.create(newPost)
  await addPokemons.setTypes(type) //el setType reconoce el id del pokemon 

res.json('pokemon added')
  

}) 

//let array =[]
router.get('/types', (req,res) => {
//Obtener todos los tipos de pokemons posibles
//En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
Type.findAll()
.then(e => res.json(e))


// .then(res => res.json())
// .then(data => {
//     let resultado = data.results 
//     resultado.forEach(e => {
//        let result = e.name
//        array.push(result)
       
//     })
// })
// .then(()=> res.send(array)) 
// .catch( res => res.status(404).send('no existe ningun tipo de pokemon'))

})


module.exports = router;
