// Dependencies
const express = require('express');

// Initializations
const app = express();

// Settings
const port = process.env.PORT || 8080

const routes = require('./routes');
const errorHandler = require('./errorHandler');

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// LLama a las rutas
app.use(routes);

// errorHandler
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});



module.exports = app;