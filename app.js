// Requires
let express = require('express');
let mongoose = require('mongoose');

// Inicializar variables
let app = express();
let puerto = 3000;
let bd = 'hospitalDB';

// Conexión a la BD: MongoDB

mongoose.connection.openUri(`mongodb://localhost:27017/${bd}`, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log(`Conexión Establecida con: ${bd}`);

    }
});


// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});



// Escuchar peticiones

app.listen(puerto, () => {
    console.log(`Express server corriendo en puerto: \x1b[32m${puerto}\x1b[0m`);
});