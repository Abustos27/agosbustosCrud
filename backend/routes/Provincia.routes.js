const router = require('express').Router();
const {Camionero, Camion, Paquete, Provincia} = require('../database/models');


router.get('/', (req, res) => {
    Provincia.findAll({
        attributes: ['codigo_provincia', 'nombre'],
        include: {
            model: Paquete,
            attributes: ['codigo', 'descripcion', 'destinatario', 'direccion'],
        },
    }).then(list => {
        res.json(list);
    });
} );

router.post('/create', (req, res) => {
    Provincia.create({
        codigo_provincia: req.body.codigo_provincia,
        nombre: req.body.nombre
    }).then(provincia => {
        res.json(provincia);
    }).catch(err => {
        res.json(err);
    });
});

router.delete('/:codigo_provincia', (req, res) => {
    Provincia.destroy({
        where: {
            codigo_provincia: req.params.codigo_provincia
        }
    }).then((object) => {
        res.json(object);
    })
});

router.get('/:codigo_provincia', (req, res) => {
    Provincia.findByPk(req.params.codigo_provincia).then(provincia => {
        res.json(provincia);
    });
});

router.put('/edit/:codigo_provincia', (req, res) => {
    Provincia.update({
        nombre: req.body.nombre
    }, {
        where: {
            codigo_provincia: req.params.codigo_provincia
        }
    }).then((object) => {
        res.json(object);
    })
});

module.exports = router;