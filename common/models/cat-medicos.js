'use strict';

module.exports = function (Catmedicos) {
  Catmedicos.asignado = function (inCiudad, inEspecialidad) {
    // Note.find({include: ['stories']}, function(err, data) { ... });
    return Catmedicos.find({
      include: ['cat_especialidades', 'cat_ciudades'],
      where: {
        or: [{ ciudad_id: inCiudad }, { especialidad_id: inEspecialidad }]
      }
    })
      .map((data) => {
        return Promise.resolve(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  Catmedicos.remoteMethod('asignado', {
    accepts: [
      { arg: 'ciudad', type: 'number' },
      { arg: 'especialidad', type: 'number' }
    ],
    http: {
      path: '/asignado',
      verb: 'get'
    },
    returns: {
      arg: 'nombre',
      type: 'string'
    }
  });
};
