const request = require("supertest");
const { Servicios } = require("../models/servicio.models");
const app = require("../app");
const { setupDB } = require("./setupDB");

setupDB("testDatabase");

describe("Servicios", function () {
  describe("Dado que se requiere crear un servicio.", function () {
    beforeEach(async function () {
      servicio1 = await new Servicios({
        nombre: "Corte de mujer",
        descripcion: "Corte de cabello",
        fecha: "02/12/2020",
        price: 150,
        tiempo: 1,
      }).save();

      servicio2 = await new Servicios({
        nombre: "Maquillaje",
        descripcion: "Maquillaje",
        fecha: "02/12/2020",
        price: 450,
        tiempo: 2,
      }).save();
    });

    it("Deberá crear un servicio si todos los parámetros han sido enviados.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("nom=Corte de mujer")
        .send("desc=Corte de cabello")
        .send("fecha=02/12/2020")
        .send("costo=150")
        .send("tiem=1")
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
            expect(res.body.data).toHaveProperty("fecha", "02/12/2020");
            expect(res.body.data).toHaveProperty("costo", 150);
            expect(res.body.data).toHaveProperty("tiempo", 1);
            done();
          }
        });
    });

    it("Deberá retornar un error si falta el parámetro de nombre.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("desc=Corte de cabello")
        .send("fecha=02/12/2020")
        .send("costo=150")
        .send("tiem=1")
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

    it("Deberá retornar un error si falta el parámetro de nombre.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("desc=Corte de cabello")
        .send("fecha=02/12/2020")
        .send("costo=150")
        .send("tiem=1")
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
        .send("fecha=02/12/2020")
        .send("costo=150")
        .send("tiem=1")
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

    it("Deberá retornar un error si falta el parámetro de fecha.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("nombre=Corte de mujer")
        .send("desc=Corte de cabello")
        .send("costo=150")
        .send("tiem=1")
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
        .send("fecha=02/12/2020")
        .send("tiem=1")
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

    it("Deberá retornar un error si falta el parámetro de tiempo.", function (done) {
      request(app)
        .post("/servicios/nuevo")
        .send("nombre=Corte de mujer")
        .send("desc=Corte de cabello")
        .send("fecha=02/12/2020")
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
    it("Deberá regresar una lista de servicios sin enviar algún parámetro.", function (done) {
      request(app)
        .get("/servicios/lista")
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
            expect(res.body.data).toHaveProperty("fecha", "02/12/2020");
            expect(res.body.data).toHaveProperty("costo", 150);
            expect(res.body.data).toHaveProperty("tiempo", 1);

            expect(res.body.data[1]).toHaveProperty("nombre", "Maquillaje");
            expect(res.body.data[1]).toHaveProperty(
              "descripcion",
              "Maquillaje"
            );
            expect(res.body.data[1]).toHaveProperty("fecha", "02/12/2020");
            expect(res.body.data[1]).toHaveProperty("costo", 450);
            expect(res.body.data[1]).toHaveProperty("tiempo", 2);
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
        fecha: "02/12/2020",
        price: 450,
        tiempo: 2,
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
        .send("fecha=02/12/2020")
        .send("costo=450")
        .send("tiem=2")
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            result = await Servicios.findOne({
              _id: servicio2._id,
            });

            expect(result).toHaveProperty("name", "Maquillaje");

            done();
          }
        });
    });
  });

  describe("Dado que se requiere eliminar un servicio", function () {
    it("Deberá eliminar un servicio si el id ha sido enviado", function (done) {
      request(app)
        .post("/servicios/eliminar")
        .send(`servicioId=${servicio2._id}`)
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
