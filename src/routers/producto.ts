import express from 'express';
import { Usuario } from '../models/usuario.js';
import { Producto } from '../models/producto.js';

export const productRouter = express.Router();

productRouter.post('/products', async (req, res) => {
  let usuariosCompraronRef: typeof Usuario[] = [];
  let usuariosCompraron: string[] = req.body.usuariosCompraron;

  try {
    for (let i = 0; i < usuariosCompraron.length; i++) {
      const user = await Usuario.findOne({usuario: usuariosCompraron[i]});
      if (!user) {
        return res.status(404).send({
          error: "Usuario no encontrado" 
        });
      }
      usuariosCompraronRef.push(user._id);
    }
    req.body.usuariosCompraron = usuariosCompraronRef
    const product = new Producto(req.body);

    await product.save();
    await product.populate({
      path: 'usuariosCompraron',
      select: ['usuario', 'correo']
    });
    return res.status(201).send(product);
  } catch (error) { 
    return res.status(400).send(error);
  }
});


productRouter.get('/products', async (req, res) => {
  const filter = req.query.id?{_id: req.query.id.toString()}:{};

  try {
    const products = await Producto.find(filter);

    if (products.length !== 0) {
      for (let i = 0; i < products.length; i++) {
        await products[i].populate({
          path: 'usuariosCompraron',
          select: ['usuario', 'correo']
        });
      } 
      return res.send(products);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});


productRouter.patch('/products', async (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({
      error: 'A _id must be provided',
    });
  }

  const allowedUpdates = ['nombre', 'descripcion', 'precio', 'preferenciasCompras', 'usuariosCompraron'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    let usuariosCompraronRef: typeof Usuario[] = [];
    let usuariosCompraron: string[] = req.body.usuariosCompraron;
    for (let i = 0; i < usuariosCompraron.length; i++) {
      const user = await Usuario.findOne({usuario: usuariosCompraron[i]});
      if (!user) {
        return res.status(404).send({
          error: "Usuario no encontrado" 
        });
      }
      usuariosCompraronRef.push(user._id);
    }
    req.body.usuariosCompraron = usuariosCompraronRef

    const products = await Producto.findOneAndUpdate({
      _id: req.query.id.toString()
    },
    req.body,
    {
      new: true,
      runValidators: true
    });

    if (products) {
      await products.populate({
        path: 'usuariosCompraron',
        select: ['usuario', 'correo']
      });
      return res.send(products);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});


productRouter.delete('/products', async (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({
      error: 'A id must be provided',
    });
  }

  try {
    const product = await Producto.findOne({
      _id: req.query.id.toString()
    });

    if (!product) {
      return res.status(404).send();
    }

    await product.populate({
      path: 'usuariosCompraron',
      select: ['usuario', 'correo']
    });
    await Producto.findByIdAndDelete(product._id);
    return res.send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});