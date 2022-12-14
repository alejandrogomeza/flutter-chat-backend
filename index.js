//importa el .env
require('dotenv').config();
 
// DB Config
const {dbConnection} = require('./databse/config');
dbConnection();
 
//const { errorMonitor } = require("events");
//Se instancia el express
const express = require('express');
const app = express();

 // Lectura y parseo del Body
 app.use(express.json());


//se importa la lib del path
const path = require('path');
const { Socket } = require('socket.io');
 
//se crea el servidor node
const httpServer = require("http").createServer(app);
 
 
//se importa el socket.io
module.exports.io = require("socket.io")(httpServer);

require("./sockets/socket");
 
//path publico
const publicPath = path.resolve(__dirname, 'public' );
app.use(express.static(publicPath));
 
// Mis rutas
app.use('/api/login', require('./routes/auth'));
 
//listen server in port
 httpServer.listen(process.env.PORT, (err)=>{
    if(err)throw new Error(err);
    console.log('Servidor corriendo en puerto: ', process.env.PORT);
 });
 