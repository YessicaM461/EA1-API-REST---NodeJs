    const { Router } = require('express');
    const Director = require('../Models/Director');
    const router = Router();

    // Crear Director (POST)
    router.post('/', async (req, res) => {
    try {
        let director = new Director();
        director.nombres = req.body.nombres;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date();
        director.fechaActualizacion = new Date();

        director = await director.save();
        res.status(201).send(director);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear director');
    }
    });

    // Listar Directores (GET)
    router.get('/', async (req, res) => {
    try {
        const directores = await Director.find();
        res.send(directores);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar directores');
    }
    });

    // Actualizar Director (PUT)
    router.put('/:directorId', async (req, res) => {
    try {
        let director = await Director.findById(req.params.directorId);
        if (!director) {
        return res.status(404).send('Director no existe');
        }
        director.nombres = req.body.nombres;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date();

        director = await director.save();
        res.send(director);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar director');
    }
    });

    module.exports = router;