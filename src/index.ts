// sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/
import express from 'express';
import './db/mongoose.js';
import { defaultRouter } from './routers/default.js';
import { userRouter } from './routers/usuario.js';
import { productRouter } from './routers/producto.js';

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(defaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});