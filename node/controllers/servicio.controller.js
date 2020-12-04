const {Servicios} = require('../models/servicio.models');

/**
 * Función que crea un servicio.
 * @param {*} req 
 * @param {*} res 
 */
async function crearServicio(req, res){
    const body = req.body;

    if(body.nom && body.imagen && body.desc && body.costo){
        try{
            const servicio = await new Servicios({
                nombre: body.nom,
                descripcion: body.desc,
                costo: body.costo,
                imagen: body.imagen ? body.imagen : ""
            }).save();

            if(servicio) {
                res.json({'data': servicio});
            } else {
                res.status(500).send("ERROR CREANDO SERVICIO");
            }
    
        } catch(err){
            res.status(500).send("ERROR CREANDO SERVICIO");
        }
        
    }else {
        res.status(402).send("PARÁMETROS ERRÓNEOS");
    }

};

/**
 * Función que muestra la lista de servicios.
 * @param {*} req 
 * @param {*} res 
 */
async function listaServicios(req, res){
    try{
        const results = await Servicios.find({});
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

async function servicioInfo(req, res){
    const servicioId = req.query.sid;

    if(servicioId) {
        try{
            const results = await Servicios.findOne({
                _id: servicioId
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

async function actualizarServicio(req, res){
    const servicioId = req.body.id;
    const nombre = req.body.nom;
    const descripcion = req.body.desc;
    const costo = req.body.costo;
    const imagen = req.body.imagen;


        try{

            if(servicioId){
                await Servicios.updateOne({
                    _id: servicioId
                }, {

                    $set: {
                        nombre: nombre,
                        descripcion: descripcion,
                        costo: costo,
                        imagen: imagen
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

async function eliminarServicio(req, res){
    const servicioId = req.body.id;

    if(servicioId) {
        try{
            const results = await Servicios.deleteOne();

            if(results) {
                res.json({'data': results});
            } else {
                res.status(500).send("ERROR");
            }

        }catch(err){
            res.status(500).send("ERROR ELIMINANDO");
        }

    } else {
        res.status(402.).send("PARÁMETROS ERRÓNEOS")
    }
    
};


module.exports = {
    crearServicio,
    listaServicios,
    servicioInfo, 
    actualizarServicio,
    eliminarServicio
};