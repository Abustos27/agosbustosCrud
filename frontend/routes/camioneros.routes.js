const router = require('express').Router();

const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/listarCamioneros.html'));
});

router.get('/crear', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/crearCamionero.html'));
});


router.delete('/delete/:dni', (req, res) => {
    Camionero.destroy({
        where: {
            dni: req.params.dni
        }
    }).then((object) => {
        res.json(object);
});
});

router.get('/editar/:dni', (req, res) => {
res.sendFile(path.resolve('./views/camioneros/editarCamionero.html'));

});

module.exports = router;  