const router = require('express').Router();

const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/listarProvincias.html'));
});

router.get('/crear', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/crearProvincia.html'));
});


router.delete('/delete/:codigo_provincia', (req, res) => {
    Provincia.destroy({
        where: {
            codigo_provincia: req.params.codigo_provincia
        }
    }).then((object) => {
        res.json(object);
});
});

router.get('/editar/:codigo_provincias', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/editarProvincia.html'));
    });

    module.exports = router;