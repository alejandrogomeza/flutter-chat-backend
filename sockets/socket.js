const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Tupac'));
bands.addBand(new Band('Diomedes'));
bands.addBand(new Band('Jerry Rivera'));


// Mensajes io de socket.io
io.on("connection", client => { 
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });


    client.on('vote-band', (payload) => {

        bands.voteBand(payload.id);
        console.log(payload);
        io.emit('active-bands', bands.getBands());
        // console.log('VOTOOO');
        // console.log(bands);

    });


    client.on('add-band', (payload) => {

        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band', (payload) => {

        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });
    // client.on('emitir-mensaje', (payload) => {
    //     // console.log(payload);
    //     // io.emit('nuevo-mensaje', payload);
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

 });