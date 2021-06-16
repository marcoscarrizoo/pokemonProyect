require('dotenv').config();    //importar el archivo .env
const { Sequelize } = require('sequelize'); //importa sequelize, permite comunicarse con la basededatos
const fs = require('fs');       //fileSystem (leer archivos)
const path = require('path');  // lee las rutas de los archivos a traves de javascript
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;                    //esta haciendo destructuring .env 

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
  logging: false, // para que no muestre todo lo que consolegueamos en el servidor
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename); // basename retorla la ultima


const modelDefiners = []; //es la definicion de los modelos [pokemons,type]

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models); 
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon,Type } = sequelize.models;
//estas son las tablas de la db 
//Pokemon.findAll() con este comando nos podemos traer todos las tablas de la db

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Type,{through: 'pokemon_type'})
Type.belongsToMany(Pokemon,{through: 'pokemon_type'})


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
