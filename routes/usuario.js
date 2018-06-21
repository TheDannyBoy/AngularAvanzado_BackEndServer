let express = require('express');
let Usuario = require('../models/usuario');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let mdAutenticacion = require('../middlewares/autenticacion');

let app = express();


// RUTAS


// ====================================
// Obtener todos los usuarios
// ====================================

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }

            return res.status(200).json({
                ok: true,
                usuarios
            });


        });

});




// ====================================
// Actualizar usuario
// ====================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res, next) => {

    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: `El usuario con el id: ${id} no existe`,
                errors: { message: err }
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });


            }
            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado con éxito',
                usuario: usuarioGuardado
            });
        });

    });


});



// ====================================
// Postear un usuario
// ====================================

app.post('/', mdAutenticacion.verificaToken, (req, res, next) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                usuario: usuarioGuardado,
                usuarioToken: req.usuario
            });

        }
    });
});


// ====================================
// Borra un usuario
// ====================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario borrado con éxito',
            usuario: usuarioBorrado
        });
    });
});



module.exports = app;