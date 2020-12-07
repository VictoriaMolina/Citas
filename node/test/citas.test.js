const request = require("supertest");
const { Citas } = require("../models/citas.models");
const app = require("../app");
const { setupDB } = require("./setupDB");

setupDB("testDatabase");

describe("Citas", function () {
  describe("Dado que se requiere crear una cita.", function () {
    beforeEach(async function () {
      cita1 = await new Citas({
        nombre: "Victoria",
        apellido: "Molina",
        fecha: "06/12/2020",
        telefono: 6142546753,
      }).save();

      cita2 = await new Citas({
        nombre: "Andrea",
        apellido: "Garza",
        fecha: "06/12/2020",
        telefono: 6142345786,
      }).save();
    });

    it("Deberá crear un servicio si todos los parámetros han sido enviados.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("nom=Corte de mujer")
        .send("desc=Corte de cabello")
        .send("imagen=http/:asjfkaf.com")
        .send("costo=150")
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.data).toHaveProperty("nombre", "Corte de mujer");
            expect(res.body.data).toHaveProperty(
              "descripcion",
              "Corte de cabello"
            );
            expect(res.body.data).toHaveProperty("imagen", "http/:asjfkaf.com");
            expect(res.body.data).toHaveProperty("costo", 150);
            done();
          }
        });
    });

    it("Deberá retornar un error si falta el parámetro de nombre.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("desc=Corte de cabello")
        .send("imagen=http/:asjfkaf.com")
        .send("costo=150")
        .expect(402)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.text).toBe("PARÁMETROS ERRÓNEOS");
            done();
          }
        });
    });

    it("Deberá retornar un error si falta el parámetro de descripcion.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("nombre=Corte de mujer")
        .send("imagen=http/:asjfkaf.com")
        .send("costo=150")
        .expect(402)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.text).toBe("PARÁMETROS ERRÓNEOS");
            done();
          }
        });
    });

    it("Deberá retornar un error si falta el parámetro de imagen.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("nombre=Corte de mujer")
        .send("desc=Corte de cabello")
        .send("costo=150")
        .expect(402)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.text).toBe("PARÁMETROS ERRÓNEOS");
            done();
          }
        });
    });

    it("Deberá retornar un error si falta el parámetro de costo.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("nombre=Corte de mujer")
        .send("desc=Corte de cabello")
        .send("imagen=http/:asjfkaf.com")
        .expect(402)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.text).toBe("PARÁMETROS ERRÓNEOS");
            done();
          }
        });
    });
  });

  describe("Dado que se requiere tener una lista de servicios.", function () {
    beforeEach(async function () {
      servicio1 = await new Servicios({
        nombre: "Corte de mujer",
        descripcion: "Corte de cabello",
        costo: 150,
        imagen: "http/:asjfkaf.com",
      }).save();

      servicio2 = await new Servicios({
        nombre: "Maquillaje",
        descripcion: "Maquillaje",
        costo: 450,
        imagen: "http/:gjrer.com",
      }).save();
    });
    it("Deberá regresar una lista de servicios sin enviar algún parámetro.", function (done) {
      request(app)
        .get("/servicios/lista")
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.data[0]).toHaveProperty("nombre", "Corte de mujer");
            expect(res.body.data[0]).toHaveProperty("descripcion", "Corte de cabello");
            expect(res.body.data[0]).toHaveProperty("imagen", "http/:asjfkaf.com");
            expect(res.body.data[0]).toHaveProperty("costo", 150);

            expect(res.body.data[1]).toHaveProperty("nombre", "Maquillaje");
            expect(res.body.data[1]).toHaveProperty("descripcion", "Maquillaje");
            expect(res.body.data[1]).toHaveProperty("imagen", "http/:gjrer.com");
            expect(res.body.data[1]).toHaveProperty("costo", 450);

            expect(res.body.data).toEqual([
              {
                _id: servicio1._id.toString(),
                nombre: "Corte de mujer",
                descripcion: "Corte de cabello",
                costo: 150,
                imagen: "http/:asjfkaf.com",
                __v: 0,
              },
              {
                _id: servicio2._id.toString(),
                nombre: "Maquillaje",
                descripcion: "Maquillaje",
                costo: 450,
                imagen: "http/:gjrer.com",
                __v: 0,
              },
            ]);
            done();
          }
        });
    });
  });

  describe("Dado que se requiere actualizar un servicio", function () {
    beforeEach(async function () {
      servicio2 = await new Servicios({
        nombre: "Maquillaje",
        descripcion: "Maquillaje",
        imagen: "http/:gjrer.com",
        costo: 450,
      }).save();
    });

    it("Deberá retornar error si el parámetro id no ha sido enviado.", function (done) {
      request(app)
        .post("/servicios/actualizar")
        .expect(402)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    it("Deberá actualizar si el parámetro id ha sido enviado.", function (done) {
      request(app)
        .post("/servicios/actualizar")
        .send(`id=${servicio2._id}`)
        .send("name=Maquillaje")
        .send("desc=Maquillaje")
        .send("imagen=http/:gjrer.com")
        .send("costo=450")
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            result = await Servicios.findOne({
              _id: servicio2._id,
            });

            expect(result).toHaveProperty("costo", 450);

            done();
          }
        });
    });
  });

  describe("Dado que se requiere eliminar un servicio", function () {
    it("Deberá eliminar un servicio si el id ha sido enviado", function (done) {
      request(app)
        .post("/servicios/eliminar")
        .send(`id=${servicio2._id}`)
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            result = await Servicios.findOne({
              _id: servicio2._id,
            });

            expect(result).toBeNull();

            done();
          }
        });
    });

    it("Deberá retornar error si el parámetro id no ha sido enviado.", function (done) {
      request(app)
        .post("/servicios/eliminar")
        .expect(402)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });
});
