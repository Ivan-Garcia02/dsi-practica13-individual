import express from 'express';
import { Usuario } from '../models/usuario.js';
import { Producto } from '../models/producto.js';

export const userRouter = express.Router();

userRouter.post('/users', async (req, res) => {
  const user = new Usuario(req.body);

  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});


userRouter.get('/users', async (req, res) => {
  const filter = req.query.usuario?{usuario: req.query.usuario.toString()}:{};

  try {
    const users = await Usuario.find(filter);

    if (users.length !== 0) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});


userRouter.patch('/users', async (req, res) => {
  if (!req.query.usuario) {
    return res.status(400).send({
      error: 'A username must be provided',
    });
  }

  const allowedUpdates = ['nombre', 'correo', 'usuario', 'preferenciasCompras'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const user = await Usuario.findOneAndUpdate({
      usuario: req.query.usuario.toString()
    },
    req.body,
    {
      new: true,
      runValidators: true
    });

    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});


userRouter.delete('/users', async (req, res) => {
  if (!req.query.usuario) {
    return res.status(400).send({
      error: 'A username must be provided',
    });
  }

  try {
    const user = await Usuario.findOne({
      usuario: req.query.usuario.toString()
    });

    if (!user) {
      return res.status(404).send();
    }

    const products = await Producto.find({});
    if (products.length !== 0) {
      for (let i = 0; i < products.length; i++) {
        const indexProduct = products[i].usuariosCompraron.findIndex(usu => {usu._id === user._id});
        products[i].usuariosCompraron.splice(indexProduct, 1);

        await Producto.findOneAndUpdate(products[i]._id, {usuariosCompraron: products[i].usuariosCompraron}, {
          new: true,
          runValidators: true
        })
      }
    }

    await Usuario.findByIdAndDelete(user._id);
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});