const { Citas } = require("../models/citas.models");

/**
 * Función que crea una cita
 * @param {*} req 
 * @param {*} res 
 */
async function crearCita(req, res){
    const body = req.body;

    if(body.nom && body.ape && body.tel && body.fecha && body.hora && body.serv){
        try{
            const cita = await new Citas({
                nombre: body.nom,
                apellido: body.ape,
                telefono: body.tel,
                fecha: body.fecha,
                hora: body.hora,
                servicio: body.serv
            }).save();

            if(cita) {
                res.json({'data': cita});
            } else {
                res.status(500).send("ERROR GUARDANDO DATOS");
            }
    
        } catch(err){
            res.status(500).send("ERROR GUARDANDO DATOS");
        }
        
    }else {
        res.status(402).send("PARÁMETROS ERRÓNEOS");
    }

};

/**
 * Función que muestra una lista de citas.
 * @param {*} req 
 * @param {*} res 
 */
async function citasLista(req, res){
    try{
        const results = await Citas.find({})/*.select({fecha:1, servicio:1, hora:1})*/;
        if(results){
            res.json({
                'data': results
            });
        } else {
            res.json({
                'data': {}
            });
        }

        
    }catch(err){
        res.json({
            'data': {}
        });
    }
};

/**
 * Función que muestra la información de una cita.
 * @param {*} req 
 * @param {*} res 
 */
async function citaInfo(req, res){
    const query = req.query;
    console.log("QUERY");
    console.log(query);

    if(query.citaId) {
        try{
            const results = await Citas.findOne({
                citaId: query.citaId
            }).select({nombre:1, apellido:1, telefono:1, fecha:1, servicio:1, hora:1});
                
            if(results){
                res.json({
                    'data': results
                });
            } else {
                res.json({
                    'data': {}
                });
            }
    
            
        }catch(err){
            res.json({
                'data': {}
            });
        }

    } else {
        res.status(402.).send("PARÁMETROS ERRÓNEOS")
    }
};

/**
 * Función que actualiza datos de la cita.
 */
async function actualizarCita(req, res){
    const citaId = req.body.id;
    const nombre = req.body.nom;
    const apellido = req.body.ape;
    const telefono = req.body.tel;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const servicio = req.body.serv;


        try{

            if(citaId){
                await Citas.updateOne({
                    _id: citaId
                }, {

                    $set: {
                        nombre: nombre,
                        apellido: apellido,
                        telefono: telefono,
                        fecha: fecha,
                        hora: hora,
                        servicio: servicio
                    }
                });

                res.status(200).send("SUCCESS")
            } else {
                res.status(402).send("PARÁMETROS ERRÓNEOS")
                };

        }catch(err){
            res.status(500).send("ERROR")
            console.log(err);
        }       
};

/**
 * Función que elimina una cita.
 */
async function eliminarCita(req, res){
    const body = req.body;

    if(body.citaId) {
        try{
            const results = await Citas.deleteOne({
                _id: body.citaId
            });

            if(results) {
                res.json({'data': results});
            } else {
                res.status(500).send("ERROR GUARDANDO DATOS");
            }

        }catch(err){
            res.status(500).send("ERROR ELIMINANDO");
        }

    } else {
        res.status(402.).send("PARÁMETROS ERRÓNEOS")
    }
};

module.exports = {
    crearCita,
    citasLista,
    citaInfo,
    actualizarCita,
    eliminarCita
};