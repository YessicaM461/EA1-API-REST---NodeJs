    const mongoose = require('mongoose');

    const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/peliculas_db';
        await mongoose.connect(url);
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
    };

    module.exports = {
    getConnection
    };