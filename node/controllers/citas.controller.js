const { Citas } = require("../models/citas.models");

/**
 * Función que crea una cita
 * @param {*} req 
 * @param {*} res 
 */
async function crearCita(req, res){
    const body = req.body;
    console.log(body);

    if(body.nom && body.tiem && body.desc && body.fecha && body.costo){
        try{
            const cita = await new Citas({
                nombre: body.nom,
                descripcion: body.desc,
                tiempo: body.tiem,
                fecha: body.fecha,
                costo: body.costo
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
        const results = await Citas.find({});
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
    const citaId = req.query.cid;

    if(citaId) {
        try{
            const results = await Citas.findOne({
                _id: citaId
            });
                
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
    const descripcion = req.body.desc;
    const imagen = req.body.img;
    const costo = req.body.costo;
    const tiempo = req.body.tiem;
    const fecha = req.body.fecha;


        try{

            if(citaId){
                await Citas.updateOne({
                    _id: citaId
                }, {

                    $set: {
                        nombre: nombre,
                        descripcion: descripcion,
                        imagen: imagen,
                        costo: costo,
                        tiempo: tiempo,
                        fecha: fecha
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
    const citaId = req.body.id;

    if(citaId) {
        try{
            const results = await Citas.deleteOne();

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