const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./connect-mongo');

const app = express();
const port = process.env.PORT || 4000;

getConnection();

app.use(cors());
app.use(express.json());

// Endpoints
app.use('/genero', require('./genero'));
app.use('/director', require('./director'));
app.use('/productora', require('./productora'));
app.use('/tipo', require('./tipo'));
app.use('/media', require('./media'));

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
