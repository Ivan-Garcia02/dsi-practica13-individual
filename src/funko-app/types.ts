import { GeneroFunko, TipoFunko } from "./funko.js";

export type FunkoPop = {
  ID: number;
  nombre: string;
  descripcion: string;
  tipo: TipoFunko;
  genero: GeneroFunko;
  franquicia: string;
  numeroFranquicia: number;
  exclusivo: boolean;
  caracteristicasEspeciales: string;
  valorMercado: number;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'show' | 'list';
  success: boolean;
  funkoPops?: FunkoPop[];
}