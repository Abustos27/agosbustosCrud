const router = require('express').Router();

const path = require('path');



router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/listarCamiones.html'));
});


router.get('/crear', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/crearCamion.html'));
});


router.delete('/delete/:matricula', (req, res) => {
    Camion.destroy({
        where: {
            matricula: req.params.matricula
        }
    }).then((object) => {
        res.json(object);
});
});



router.get('/editar/:matricula', (req, res) => {

    res.sendFile(path.resolve('./views/camiones/editarCamion.html'));

    });

    module.exports = router;