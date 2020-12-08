const request = require("supertest");
const { Citas } = require("../models/citas.models");
const app = require("../app");
const { setupDB } = require("./setupDB");

setupDB("testDatabase");

describe.skip("Citas", function () {
  describe("Dado que se requiere crear una cita.", function () {
    beforeEach(async function () {
      cita1 = await new Citas({
        nombre: "Victoria",
        apellido: "Molina",
        fecha: "06/12/2020",
        telefono: 6142546753,
        hora: "7:00:00",
        servicio: "Uñas"
      }).save();

      cita2 = await new Citas({
        nombre: "Andrea",
        apellido: "Garza",
        fecha: "06/12/2020",
        telefono: 6142345786,
        hora: "8:00:00",
        servicio: "Maquillaje"
      }).save();
    });

    it("Deberá crear una cita si todos los parámetros han sido enviados.", function (done) {
      request(app)
        .post("/citas/nuevo")
        .send("nom=Victoria")
        .send("ape=Molina")
        .send("fecha=06/12/2020")
        .send("tel=6142546753")
        .send("hora=7:00:00")
        .send("serv=Uñas")
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.data).toHaveProperty("nombre", "Victoria");
            expect(res.body.data).toHaveProperty("apellido", "Molina");
            expect(res.body.data).toHaveProperty("telefono", 6142546753);
            expect(res.body.data).toHaveProperty("fecha", "06/12/2020");
            expect(res.body.data).toHaveProperty("hora", "7:00:00");
            expect(res.body.data).toHaveProperty("servicio", "Uñas");
            done();
          }
        });
    });

    it("Deberá retornar un error si falta el parámetro de nombre.", function (done) {
      request(app)
        .post("/citas/nuevo")
        .send("ape=Molina")
        .send("fecha=06/12/2020")
        .send("tel=6142546753")
        .send("hora=7:00:00")
        .send("serv=Uñas")
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

    it("Deberá retornar un error si falta el parámetro de apellido.", function (done) {
      request(app)
        .post("/citas/nuevo")
        .send("nom=Victoria")
        .send("fecha=06/12/2020")
        .send("tel=6142546753")
        .send("hora=7:00:00")
        .send("serv=Uñas")
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
        .post("/citas/nuevo")
        .send("nom=Victoria")
        .send("ape=Molina")
        .send("tel=6142546753")
        .send("hora=7:00:00")
        .send("serv=Uñas")
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

    it("Deberá retornar un error si falta el parámetro de telefono.", function (done) {
      request(app)
        .post("/citas/nuevo")
        .send("nom=Victoria")
        .send("ape=Molina")
        .send("fecha=06/12/2020")
        .send("hora=7:00:00")
        .send("serv=Uñas")
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

    it("Deberá retornar un error si falta el parámetro de hora.", function (done) {
      request(app)
        .post("/citas/nuevo")
        .send("nom=Victoria")
        .send("ape=Molina")
        .send("fecha=06/12/2020")
        .send("tel=6142546753")
        .send("serv=Uñas")
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

    it("Deberá retornar un error si falta el parámetro de servicio.", function (done) {
      request(app)
        .post("/citas/nuevo")
        .send("nom=Victoria")
        .send("ape=Molina")
        .send("fecha=06/12/2020")
        .send("tel=6142546753")
        .send("hora=7:00:00")
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

  describe("Dado que se requiere tener una lista de citas.", function () {
    beforeEach(async function () {
      cita1 = await new Citas({
        nombre: "Victoria",
        apellido: "Molina",
        fecha: "06/12/2020",
        telefono: 6142546753,
        hora: "7:00:00",
        servicio: "Uñas"
      }).save();

      cita2 = await new Citas({
        nombre: "Andrea",
        apellido: "Garza",
        fecha: "06/12/2020",
        telefono: 6142345786,
        hora: "8:00:00",
        servicio: "Maquillaje"
      }).save();
    });
    it("Deberá regresar una lista de citas sin enviar algún parámetro.", function (done) {
      request(app)
        .get("/citas/lista")
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.data[0]).toHaveProperty("nombre", "Victoria");
            expect(res.body.data[0]).toHaveProperty("apellido", "Molina");
            expect(res.body.data[0]).toHaveProperty("telefono", 6142546753);
            expect(res.body.data[0]).toHaveProperty("fecha", "06/12/2020");
            expect(res.body.data[0]).toHaveProperty("hora", "7:00:00");
            expect(res.body.data[0]).toHaveProperty("servicio", "Uñas");

            expect(res.body.data[1]).toHaveProperty("nombre", "Andrea");
            expect(res.body.data[1]).toHaveProperty("apellido", "Garza");
            expect(res.body.data[1]).toHaveProperty("telefono", 6142345786);
            expect(res.body.data[1]).toHaveProperty("fecha", "06/12/2020");
            expect(res.body.data[1]).toHaveProperty("hora", "8:00:00");
            expect(res.body.data[1]).toHaveProperty("servicio", "Maquillaje");

            expect(res.body.data).toEqual([
              {
                _id: cita1._id.toString(),
                nombre: "Victoria",
                apellido: "Molina",
                fecha: "06/12/2020",
                telefono: 6142546753,
                hora: "7:00:00",
                servicio: "Uñas",
                __v: 0,
              },
              {
                _id: cita2._id.toString(),
                nombre: "Andrea",
                apellido: "Garza",
                fecha: "06/12/2020",
                telefono: 6142345786,
                hora: "8:00:00",
                servicio: "Maquillaje",
                __v: 0,
              },
            ]);
            done();
          }
        });
    });
  });

  describe("Dado que se requiere actualizar una cita", function () {
    beforeEach(async function () {
      cita1 = await new Citas({
        nombre: "Victoria",
        apellido: "Molina",
        fecha: "06/12/2020",
        telefono: 6142546753,
        hora: "7:00:00",
        servicio: "Uñas"
      }).save();
    });
    it("Deberá retornar error si el parámetro id no ha sido enviado.", function (done) {
      request(app)
        .post("/citas/actualizar")
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
        .post("/citas/actualizar")
        .send(`id=${cita1._id}`)
        .send("nom=Victoria")
        .send("ape=Molina")
        .send("fecha=06/12/2020")
        .send("telefono=6142546753")
        .send("hora=7:00:00")
        .send("servicio=Uñas")
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            result = await Citas.findOne({
              _id: cita1._id,
            });

            expect(result).toHaveProperty("nombre", "Victoria");

            done();
          }
        });
    });
  });

  describe("Dado que se requiere eliminar una cita", function () {
    it("Deberá eliminar una cita si el id ha sido enviado", function (done) {
      request(app)
        .post("/citas/eliminar")
        .send(`citaId=${cita1._id}`)
        .expect(200)
        .end(async function (err, res) {
          if (err) {
            done(err);
          } else {
            result = await Citas.findOne({
              _id: cita1._id,
            });

            expect(result).toBeNull();

            done();
          }
        });
    });

    it("Deberá retornar error si el parámetro id no ha sido enviado.", function (done) {
      request(app)
        .post("/citas/eliminar")
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
