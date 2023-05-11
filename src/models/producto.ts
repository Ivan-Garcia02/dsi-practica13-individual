import { Document, Schema, model } from 'mongoose';
import { UsuarioDocumentInterface } from './usuario.js';

export interface ProductoDocumentInterface extends Document {
  nombre: string,
  descripcion: string,
  precio: number,
  preferenciasCompras: 'deporte' | 'videojuegos' | 'ropa' | 'informatica' | 'musica',
  usuariosCompraron: UsuarioDocumentInterface[];
}

const ProductoSchema = new Schema<ProductoDocumentInterface>({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  preferenciasCompras: {
    type: String,
    required: true,
    trim: true,
    enum: ['deporte', 'videojuegos', 'ropa', 'informatica', 'musica'],
  },
  usuariosCompraron: {
    type: [Schema.Types.ObjectId],
    required: true,
    trim: true,
    ref: 'Usuario',
  },
});

export const Producto = model<ProductoDocumentInterface>('Producto', ProductoSchema);