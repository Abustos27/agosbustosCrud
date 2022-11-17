const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Camion extends Model { }

Camion.init({
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    potencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'camion',
    tableName: 'camiones',
});

module.exports = Camion;