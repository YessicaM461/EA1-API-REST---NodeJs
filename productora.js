    const { Router } = require('express');
    const Productora = require('../Models/Productora');
    const router = Router();

    // Crear Productora (POST)
    router.post('/', async (req, res) => {
    try {
        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaCreacion = new Date();
        productora.fechaActualizacion = new Date();

        productora = await productora.save();
        res.status(201).send(productora);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear productora');
    }
    });

    // Listar Productoras (GET)
    router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar productoras');
    }
    });

    // Actualizar Productora (PUT)
    router.put('/:productoraId', async (req, res) => {
    try {
        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
        return res.status(404).send('Productora no existe');
        }
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaActualizacion = new Date();

        productora = await productora.save();
        res.send(productora);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar productora');
    }
    });

    module.exports = router;