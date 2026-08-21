const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./db/connect-mongo');

const app = express();
const port = process.env.PORT || 4000;

getConnection();

app.use(cors());
app.use(express.json());

// Endpoints
app.use('/genero', require('./Router/genero'));
app.use('/director', require('./Router/director'));
app.use('/productora', require('./Router/productora'));
app.use('/tipo', require('./Router/tipo'));
app.use('/media', require('./Router/media'));

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});