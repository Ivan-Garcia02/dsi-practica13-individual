import { Document, Schema, model } from 'mongoose';

export interface UsuarioDocumentInterface extends Document {
  nombre: string,
  correo: string,
  usuario: string,
  preferenciasCompras: 'deporte' | 'videojuegos' | 'ropa' | 'informatica' | 'musica'
}

const UsuarioSchema = new Schema<UsuarioDocumentInterface>({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    /*validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Note title must start with a capital letter');
      }
    },*/
  },
  usuario: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  preferenciasCompras: {
    type: String,
    required: true,
    trim: true,
    enum: ['deporte', 'videojuegos', 'ropa', 'informatica', 'musica'],
  },
});

export const Usuario = model<UsuarioDocumentInterface>('Usuario', UsuarioSchema);