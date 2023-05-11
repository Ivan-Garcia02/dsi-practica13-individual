import express from 'express';
import { FunkoPop, ResponseType } from "./types.js";
import { convertGeneroFunko, convertTipoFunko } from "./funko.js";
import { MongoClient } from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funkos';

const app = express();

app.get('/funkos', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'Debe especificarse un usuario',
    });

  } else {
    if (!req.query.ID) { // List
      console.log('Un cliente quiere listar');

      MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<FunkoPop>(req.query.user as string).find({}).toArray();

      }).then((result) => {
        console.log(result);
        if (result !== null) {
          let respuesta: ResponseType = {type: 'list', success: true, funkoPops: []};
          result.forEach(funko => {
            respuesta.funkoPops?.push({ID: funko.ID, nombre: funko.nombre, descripcion: funko.descripcion, tipo: funko.tipo, genero: funko.genero, franquicia: funko.franquicia, numeroFranquicia: funko.numeroFranquicia, exclusivo: funko.exclusivo, caracteristicasEspeciales: funko.caracteristicasEspeciales, valorMercado: funko.valorMercado});
          })

          res.send({
            respuesta: respuesta
          });
        }
        else {
          let respuesta: ResponseType = {type: 'list', success: false, funkoPops: []};

          res.send({
            respuesta: respuesta
          });
        }
      }).catch((error) => {
        console.log(error);
        res.status(400).send();
      });
    }

    else { // Show
      console.log('Un cliente quiere mostrar');
      
      MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<FunkoPop>(req.query.user as string).findOne({
          ID: Number(req.query.ID),
        });
      }).then((result) => {
        console.log(result);
        if (result !== null) {
          let respuesta: ResponseType = {type: 'show', success: true, funkoPops: []};
          respuesta.funkoPops?.push({ID: Number(result?.ID), nombre: String(result?.nombre), descripcion: String(result?.descripcion), tipo: convertTipoFunko(String(result?.tipo)), genero: convertGeneroFunko(String(result?.genero)), franquicia: String(result?.franquicia), numeroFranquicia: Number(result?.numeroFranquicia), exclusivo: Boolean(result?.exclusivo), caracteristicasEspeciales: String(result?.caracteristicasEspeciales), valorMercado: Number(result?.valorMercado)});

          res.send({
            respuesta: respuesta
          });
        }
        else {
          let respuesta: ResponseType = {type: 'show', success: false, funkoPops: []};

          res.send({
            respuesta: respuesta
          });
        }
      }).catch((error) => {
        console.log(error);
        res.status(400).send();
      });
    }
  }
});


app.post('/funkos', (req, res) => {
  if (!req.query.user || !req.query.ID || !req.query.nombre || !req.query.descripcion || !req.query.tipo || !req.query.genero || !req.query.franquicia || !req.query.numeroFranquicia || !req.query.exclusivo || !req.query.caracteristicasEspeciales || !req.query.valorMercado) {
    res.send({error: 'Debe especificarse un usuario, un ID y todos los parametros de un funko: nombre, descripcion, tipo, genero, franquicia, numeroFranquicia, exclusivo, caracteristicasEspeciales y valorMercado',
    });

  } else {
    console.log('Un cliente quiere añadir');

    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);

      return db.collection<FunkoPop>(req.query.user as string).findOne({
        ID: Number(req.query.ID), 
      });

    }).then((result) => {
      if (result === null) {
        MongoClient.connect(dbURL).then((client) => {
          const db = client.db(dbName);
        
          return db.collection<FunkoPop>(req.query.user as string).insertOne({
            ID: Number(req.query.ID),
            nombre: String(req.query.nombre), 
            descripcion: String(req.query.descripcion), 
            tipo: convertTipoFunko(String(req.query.tipo)),
            genero: convertGeneroFunko(String(req.query.genero)),
            franquicia: String(req.query.franquicia),
            numeroFranquicia: Number(req.query.numeroFranquicia), 
            exclusivo: Boolean(req.query.exclusivo),
            caracteristicasEspeciales: String(req.query.caracteristicasEspeciales),
            valorMercado: Number(req.query.valorMercado)
          });
        }).then((result) => {
          console.log(result);
          let respuesta: ResponseType = {type: 'add', success: true};

          res.send({
            respuesta: respuesta
          });
        }).catch((error) => {
          console.log(error);
          res.status(400).send();
        });
      }
      else {
        let respuesta: ResponseType = {type: 'add', success: false};
        res.send({
          respuesta: respuesta
        });
      }
    }).catch((error) => {
      console.log(error);
      res.status(400).send();
    });
  }
});


app.delete('/funkos', (req, res) => {
  if (!req.query.user || !req.query.ID) {
    res.send({
      error: 'Debe especificarse un usuario y un ID',
    });

  } else {
    console.log('Un cliente quiere eliminar');

    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);

      return db.collection<FunkoPop>(req.query.user as string).findOne({
        ID: Number(req.query.ID), 
      });

    }).then((result) => {
      if (result !== null) {
        MongoClient.connect(dbURL).then((client) => {
          const db = client.db(dbName);
        
          return db.collection<FunkoPop>(req.query.user as string).deleteOne({
            ID: Number(req.query.ID),
          });
        }).then((result) => {
          console.log(result);
          let respuesta: ResponseType = {type: 'remove', success: true};

          res.send({
            respuesta: respuesta
          });
        }).catch((error) => {
          console.log(error);
          res.status(400).send();
        });
      }
      else {
        let respuesta: ResponseType = {type: 'remove', success: false};
        res.send({
          respuesta: respuesta
        });
      }
    }).catch((error) => {
      console.log(error);
      res.status(400).send();
    });
  }
});


app.patch('/funkos', (req, res) => {
  if (!req.query.user || !req.query.ID || !req.query.nombre || !req.query.descripcion || !req.query.tipo || !req.query.genero || !req.query.franquicia || !req.query.numeroFranquicia || !req.query.exclusivo || !req.query.caracteristicasEspeciales || !req.query.valorMercado) {
    res.send({error: 'Debe especificarse un usuario, un ID y todos los parametros de un funko: nombre, descripcion, tipo, genero, franquicia, numeroFranquicia, exclusivo, caracteristicasEspeciales y valorMercado',
    });

  } else {
    console.log('Un cliente quiere modificar');

    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);

      return db.collection<FunkoPop>(req.query.user as string).findOne({
        ID: Number(req.query.ID), 
      });

    }).then((result) => {
      if (result !== null) {
        MongoClient.connect(dbURL).then((client) => {
          const db = client.db(dbName);
        
          return db.collection<FunkoPop>(req.query.user as string).updateOne({
            ID: Number(req.query.ID),
          }, {
            $set: {
            ID: Number(req.query.ID),
            nombre: String(req.query.nombre), 
            descripcion: String(req.query.descripcion), 
            tipo: convertTipoFunko(String(req.query.tipo)),
            genero: convertGeneroFunko(String(req.query.genero)),
            franquicia: String(req.query.franquicia),
            numeroFranquicia: Number(req.query.numeroFranquicia), 
            exclusivo: Boolean(req.query.exclusivo),
            caracteristicasEspeciales: String(req.query.caracteristicasEspeciales),
            valorMercado: Number(req.query.valorMercado)
            }
          });
        }).then((result) => {
          console.log(result);
          let respuesta: ResponseType = {type: 'update', success: true};

          res.send({
            respuesta: respuesta
          });
        }).catch((error) => {
          console.log(error);
          res.status(400).send();
        });
      }
      else {
        let respuesta: ResponseType = {type: 'update', success: false};
        res.send({
          respuesta: respuesta
        });
      }
    }).catch((error) => {
      console.log(error);
      res.status(400).send();
    });
  }
});

app.get('*', (_, res) => {
  res.status(404).send();
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});