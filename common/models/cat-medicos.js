"use strict";

module.exports = function (Catmedicos) {
  Catmedicos.asignado = function (inNombre) {
    // Note.find({include: ['stories']}, function(err, data) { ... });
    return Catmedicos.find({
      include: ["cat_especialidades", "cat_ciudades"],
      where: { nombre: inNombre },
    })
      .map((data) => {
        return Promise.resolve(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  Catmedicos.remoteMethod("asignado", {
    accepts: [{ arg: "nombre", type: "string" }],
    http: {
      path: "/asignado",
      verb: "get",
    },
    returns: {
      arg: "nombre",
      type: "string",
    },
  });
};
/* 
"use strict";

module.exports = function (Catmedicos) {
  Catmedicos.reservas = function (inFecha, inConsultorio) {
    const today = moment().startOf("day").toDate();
    const especifico = moment(inFecha).startOf("day").toDate();
    const end = moment(today).endOf("day").toDate();
    const endespecifico = moment(inFecha).endOf("day").toDate();
    return catCitas
      .find({
        where: {
          and: [
            { horaInicio: { gte: inFecha ? especifico : today } },
            { horaInicio: { lte: inFecha ? endespecifico : end } },
            { consultorio: inConsultorio },
          ],
        },
        fields: { horaInicio: true, consultorio: true },
      })
      .map((data) => {
        return Promise.resolve(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  Catmedicos.remoteMethod("reservas", {
    accepts: [
      { arg: "fecha", type: "date" },
      { arg: "consultorio", type: "string" },
    ],
    http: {
      path: "/reservas-hoy",
      verb: "get",
    },
    returns: {
      arg: "reservas",
      type: "string",
    },
  });
}; */
