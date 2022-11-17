const router = require('express').Router();

const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/listarPaquetes.html'));
});

router.get('/crear', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/crearPaquete.html'));
});


router.delete('/delete/:codigo', (req, res) => {
    Paquete.destroy({
        where: {
            codigo: req.params.codigo
        }
    }).then((object) => {
        res.json(object);
});
});

router.get('/editar/:codigo', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/editarPaquete.html'));
    });

    module.exports = router;