const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      primaryKey: true,
      type : DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    
    lifeTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    strength: {
      type: DataTypes.INTEGER ,
      allowNull: true,
    }, 
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, 
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, 
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
};


//crear tablas
//crear basede datos
//buscar datos en la db 
