// Requires
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// Inicializar variables
let app = express();
let puerto = 3000;
let bd = 'hospitalDB';


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Importar rutas
let appRoutes = require('./routes/app');
let usuarioRoutes = require('./routes/usuario');
let loginRoutes = require('./routes/login');



// Conexión a la BD: MongoDB

mongoose.connection.openUri(`mongodb://localhost:27017/${bd}`, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log(`Conexión Establecida con: ${bd}`);

    }
});



// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// Escuchar peticiones

app.listen(puerto, () => {
    console.log(`Express server corriendo en puerto: \x1b[32m${puerto}\x1b[0m`);
});