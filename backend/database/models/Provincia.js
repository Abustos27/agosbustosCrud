const {Model, DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

class Provincia extends Model {}

Provincia.init({
    codigo_provincia : {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'provincia',
    tableName: 'provincias',
});

module.exports = Provincia;