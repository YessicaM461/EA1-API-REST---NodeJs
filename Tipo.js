    const { Schema, model } = require('mongoose');

    const TipoSchema = Schema({
    nombre: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now },
    descripcion: { type: String }
    });

    module.exports = model('Tipo', TipoSchema);