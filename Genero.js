    const { Schema, model } = require('mongoose');

    const GeneroSchema = Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },
    descripcion: { type: String }
    });

    module.exports = model('Genero', GeneroSchema);