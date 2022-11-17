const {Model} = require('sequelize');
const sequelize = require('../sequelize');

class camionXcamionero extends Model {}

camionXcamionero.init({}, {
    
    sequelize,
    modelName: 'camionXcamionero',
    tableName: 'camionesXcamioneros',
});

module.exports = camionXcamionero;