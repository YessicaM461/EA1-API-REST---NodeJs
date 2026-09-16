const { Router } = require('express');
const Media = require('./Media');
const Genero = require('./Genero');
const Director = require('./Director');
const Productora = require('./Productora');
const Tipo = require('./Tipo');

const router = Router();

// Crear Media (POST)
router.post('/', async (req, res) => {
    try {
        // 1. Validar serial y URL únicos
        const existeSerial = await Media.findOne({ serial: req.body.serial });
        if (existeSerial) {
            return res.status(400).send('El serial ya existe');
        }

        const existeUrl = await Media.findOne({ urlPelicula: req.body.urlPelicula });
        if (existeUrl) {
            return res.status(400).send('La URL ya existe');
        }

        // 2. Validar que existan y estén ACTIVOS
        const genero = await Genero.findById(req.body.genero);
        if (!genero || genero.estado !== 'Activo') {
            return res.status(400).send('El género no existe o está Inactivo');
        }

        const director = await Director.findById(req.body.director);
        if (!director || director.estado !== 'Activo') {
            return res.status(400).send('El director no existe o está Inactivo');
        }

        const productora = await Productora.findById(req.body.productora);
        if (!productora || productora.estado !== 'Activo') {
            return res.status(400).send('La productora no existe o está Inactiva');
        }

        const tipo = await Tipo.findById(req.body.tipo);
        if (!tipo) {
            return res.status(400).send('El tipo no existe');
        }

        // 3. Crear registro
        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlPelicula = req.body.urlPelicula;
        media.imagenPortada = req.body.imagenPortada;
        media.añoEstreno = req.body.añoEstreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.status(201).send(media);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la producción');
    }
});

// Listar Medias (GET) con datos relacionados
router.get('/', async (req, res) => {
    try {
        const medias = await Media.find()
            .populate('genero', 'nombre estado')
            .populate('director', 'nombres estado')
            .populate('productora', 'nombre slogan estado')
            .populate('tipo', 'nombre');
        res.send(medias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar producciones');
    }
});

// Actualizar Media (PUT)
router.put('/:mediaId', async (req, res) => {
    try {
        let media = await Media.findById(req.params.mediaId);
        if (!media) {
            return res.status(404).send('La producción no existe');
        }

        // Validar estado Activo en actualización
        const genero = await Genero.findById(req.body.genero);
        if (!genero || genero.estado !== 'Activo') {
            return res.status(400).send('El género no existe o está Inactivo');
        }

        const director = await Director.findById(req.body.director);
        if (!director || director.estado !== 'Activo') {
            return res.status(400).send('El director no existe o está Inactivo');
        }

        const productora = await Productora.findById(req.body.productora);
        if (!productora || productora.estado !== 'Activo') {
            return res.status(400).send('La productora no existe o está Inactiva');
        }

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlPelicula = req.body.urlPelicula;
        media.imagenPortada = req.body.imagenPortada;
        media.añoEstreno = req.body.añoEstreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.send(media);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar producción');
    }
});

module.exports = router;
