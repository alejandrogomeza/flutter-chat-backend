
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },

});

UsuarioSchema.method('toJSON', function(){
    const { __v , _id, password, online, ...propiedades } = this.toObject();
    propiedades.uid = _id;
    return propiedades;
})

module.exports = model('Usuario', UsuarioSchema);