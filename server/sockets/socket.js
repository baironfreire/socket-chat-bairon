const { io } = require('../server');
const { Usuario } = require('../classes/usuario');
const { crearMensaje } = require('../utils/utils');

const usuario = new Usuario();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        
        ;
        if( !data.nombre || !data.sala){
            return callback ({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        let personas = usuario.agregarPersona( client.id, data.nombre, data.sala );

        client.broadcast.to(data.sala).emit('listaPersona', usuario.getPersonaPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió`));
        callback(personas);
    });


    client.on('crearMensaje', (data, callback) => {
        let persona = usuario.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuario.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salio del chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuario.getPersonaPorSala(personaBorrada.sala));
    });

    client.on('mensajePrivado', data => {
        let persona = usuario.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
  
});