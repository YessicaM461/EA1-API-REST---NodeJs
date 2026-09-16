    const { Router } = require('express');
    const Tipo = require('./Tipo');
    const router = Router();

    // Crear Tipo (POST)
    router.post('/', async (req, res) => {
    try {
        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();
        res.status(201).send(tipo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear tipo');
    }
    });

    // Listar Tipos (GET)
    router.get('/', async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar tipos');
    }
    });

    // Actualizar Tipo (PUT)
    router.put('/:tipoId', async (req, res) => {
    try {
        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
        return res.status(404).send('Tipo no existe');
        }
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date();

        tipo = await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar tipo');
    }
    });

    module.exports = router;
