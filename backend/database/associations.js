const {Paquete, Camionero, Camion, Provincia} = require('./models');

Provincia.hasMany(Paquete, {foreignKey: 'codigo_provincia'});
Camionero.hasMany(Paquete, {foreignKey: 'dni_camionero'});
 


Paquete.belongsTo(Provincia, {foreignKey: 'codigo_provincia'});
Paquete.belongsTo(Camionero, {foreignKey: 'dni_camionero'});



Camion.belongsToMany(Camionero, {through: 'camionXcamionero', foreignKey: 'matricula_camion'});
Camionero.belongsToMany(Camion, {through: 'camionXcamionero', foreignKey: 'dni_camionero'});

