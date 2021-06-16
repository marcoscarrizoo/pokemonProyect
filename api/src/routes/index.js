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
router.get('/pokemon', (req,res) => {
  let {name} = req.query
  fetch('https://pokeapi.co/api/v2/pokemon/' + name)
  .then(res => res.json())
  .then(data => {
      pokemon = {
          name: data.name,
          img: data.sprites.front_default,
          type: data.types.map((a)=>{return a.type.name}),
          id: data.id,
          height: data.height,
          weight: data.height,
  }               
  res.send(pokemon)         
           
  })
  .catch( error => res.status(404,error).json('pokemon no encontrado')) 
  })
 
  
  


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

let {id} = req.params
fetch('https://pokeapi.co/api/v2/pokemon/' + id)
.then(res => res.json())
.then(data => {
    pokemon = {
        name: data.name,
        img: data.sprites.front_default,
        type: data.types.map((a)=>{return a.type.name}),
        id: data.id,
        height: data.height,
        weight: data.height,
}               
res.send(pokemon)         
         
})
.catch( error => res.status(404,error).json('pokemon no encontrado')) 
})


//postea los pokemons nuevos
router.post('/pokemons', async (req,res) => {
let {name, type,lifeTime, strength, defense, speed, height, weight} = req.body

if(!name) {
   return res.status(422).json({error: 'no se ha podido agregar un nuevo pokemon'})
} 
let newPost = {
    id: uuidv4(),
    name,
    
    lifeTime,
    strength,
    defense,
    speed,
    height,
    weight
    
}
const addPokemons = await Pokemon.create(newPost)    
  await addPokemons.setTypes(type) //el setType reconoce el id del pokemon 

res.redirect('http://localhost:3000/inicio')
}

) 


//guarda los tipos de pokemons a la base de datos
router.get('/types', (req,res) => {
  Type.findAll()
  .then(e => res.json(e))
  })



  router.get("/search/", async (req, res) => {
    let keyword = req.query.keyword;
  
    try {
  
      if (!keyword) {
        return res.status(400).json({ message: "Search criteria must be provided", status: 400 });
      } 
      
      else {
  
        const result = await Pokemon.findAll({
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: `%${keyword}%`,
                },
              },
              {
                description: {
                  [Op.like]: `%${keyword}%`,
                },
              },
            ],
          },
          include: [
            {
              model: Type,
              through: { attributes: [] },
            },
          ],
        });
        res.status(200).json(result);
      }
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", status: 500 });
    }
  });







module.exports = router;
