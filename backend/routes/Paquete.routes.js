const router = require('express').Router();

const {Camionero, Camion, Paquete, Provincia} = require('../database/models');

router.get('/', (req, res) => {
    Paquete.findAll({
        attributes: ['codigo', 'descripcion', 'destinatario', 'direccion'],
        include: {
            model: Camionero,
            attributes: ['dni', 'nombre'],
        },
        include: {
            model: Provincia,
            attributes: ['codigo_provincia', 'nombre']
        }
       
    }).then(list => {
        res.json(list);
    });
} );

router.post('/create', (req, res) => {
    Paquete.create({
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        destinatario: req.body.destinatario,
        direccion: req.body.direccion,
        codigo_provincia: req.body.codigo_provincia
       

    }).then(paquete => {
        res.json(paquete);
    }).catch(err => {
        res.json(err);
    });
});

router.delete('/:codigo', (req, res) => {
    Paquete.destroy({
        where: {
            codigo: req.params.codigo
        }
    }).then((object) => {
        res.json(object);
    })
});

router.get('/:codigo', (req, res) => {
    Paquete.findByPk(req.params.codigo).then(paquete => {
        res.json(paquete);
    });
});

router.put('/edit/:codigo', (req, res) => {
    Paquete.update({
        descripcion: req.body.descripcion,
        destinatario: req.body.destinatario,
        codigo_provincia: req.body.codigo_provincia,
        direccion: req.body.direccion
    }, {
        where: {
            codigo: req.params.codigo
        }
    }).then((object) => {
        res.json(object);
    })
});

module.exports = router;