const router = require('express').Router();
const {Camionero, Camion, Paquete, Provincia} = require('../database/models');

router.get('/', (req, res) => {
    Camionero.findAll({
        attributes: ['dni', 'nombre', 'salario', 'telefono', 'direccion', 'poblacion'],
        include: {
            model: Paquete,
            attributes: ['codigo_paquete', 'peso', 'fecha_entrega', 'codigo_provincia'],
        },
        include: {
                model: Camion,
                attributes: ['matricula', 'modelo']  
        }
    }).then(list => {
        res.json(list);
    });
});

router.post('/create', (req, res) => {
    Camionero.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        salario: req.body.salario,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        poblacion: req.body.poblacion
    }).then(camionero => {
        res.json(camionero);
    }).catch(err => {
        res.json(err);
    });
});

router.delete('/:dni', (req, res) => {
    Camionero.destroy({
        where: {
            dni: req.params.dni
        }
    }).then((object) => {
        res.json(object);
    })
});

router.get('/:dni', (req, res) => {
    Camionero.findByPk(req.params.dni).then(camionero => {
        res.json(camionero);
    });
});

router.put('/edit/:dni', (req, res) => {
    Camionero.update({
        nombre: req.body.nombre,
        salario: req.body.salario,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        poblacion: req.body.poblacion
    }, {
        where: {
            dni: req.params.dni
        }
    }).then((object) => {
        res.json(object);
    })
});


module.exports = router;