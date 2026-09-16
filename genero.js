    const { Router } = require('express');
    const Genero = require('./Genero');
    const router = Router();

    // Crear Genero (POST)
    router.post('/', async (req, res) => {
    try {
        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();

        genero = await genero.save();
        res.status(201).send(genero);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear género');
    }
    });

    // Listar Generos (GET)
    router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.send(generos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar géneros');
    }
    });

    // Actualizar Genero (PUT)
    router.put('/:generoId', async (req, res) => {
    try {
        let genero = await Genero.findById(req.params.generoId);
        if (!genero) {
        return res.status(404).send('Género no existe');
        }
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaActualizacion = new Date();

        genero = await genero.save();
        res.send(genero);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar género');
    }
    });

    module.exports = router;
