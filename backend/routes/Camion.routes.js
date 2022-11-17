const router = require('express').Router();
const { Camion, Camionero } = require('../database/models');


//obtenes todos los camiones
router.get("/", (req, res) => {
    Camion.findAll({
        attributes: ['matricula', 'modelo', 'tipo', 'potencia'],
        include: {
            model: Camionero,
            attributes: ['dni', 'nombre'],
        }
    }).then(list => {
        res.json(list);
    });
});

//crea un camion 

router.post("/create", (req, res) => {

    Camion.create({
        matricula: req.body.matricula,
        modelo: req.body.modelo,
        tipo: req.body.tipo,
        potencia: req.body.potencia
    }).then(camion => {
        res.json(camion);
    }).catch(err => {
        res.json(err);
    });
});

//borra un camion por su matricula

router.delete('/:matricula', (req, res) => {
    Camion.destroy({
        where: {
            matricula: req.params.matricula
        }
    }).then((object) => {

        res.json(object);
    })

});

//busca un camion por su matricula

router.get('/:matricula', (req, res) => {
    Camion.findByPk(req.params.matricula).then(camion => {
        res.json(camion);
    });
});


//actualiza un camion por su matricula

router.put('/edit/:matricula', (req, res) => {
    Camion.update({
        modelo: req.body.modelo,
        tipo: req.body.tipo,
        potencia: req.body.potencia
    }, {
        where: {
            matricula: req.params.matricula
        }
    }).then((object) => {
        res.json(object);
    })
});

module.exports = router;