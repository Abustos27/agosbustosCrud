const {Model, DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

class Camionero extends Model {}

Camionero.init({
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        
    },
    telefono: {
        type: DataTypes.STRING,
       
        
    },
    direccion: {
        type: DataTypes.STRING,
        
    },
    salario : {
        type: DataTypes.INTEGER,
       
    },
    poblacion: {
        type: DataTypes.STRING,
       
    },
}, {
    sequelize,
    modelName: 'camionero',
    tableName: 'camioneros',
});


module.exports = Camionero;
