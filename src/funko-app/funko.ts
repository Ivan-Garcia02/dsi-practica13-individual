import chalk = require("chalk");

export enum TipoFunko {Pop = 'Pop!', PopRides = 'Pop! Rides', VynilSoda = 'Vynil Soda', VynilGold = 'Vynil Gold', Regular = 'Regular'};
export enum GeneroFunko {Animacion = 'Animacion', Peliculas = 'Peliculas', TV = 'TV', Videojuegos = 'Videojuegos', 
                         Deportes = 'Deportes', Musica = 'Musica', Anime = 'Anime', General = 'General'};
                  
export class Funko {
  private _ID: number;
  private _nombre: string;
  private _descripcion: string;
  private _tipo: TipoFunko;
  private _genero: GeneroFunko;
  private _franquicia: string;
  private _numeroFranquicia: number;
  private _exclusivo: boolean;
  private _caracteristicasEspeciales: string;
  private _valorMercado: number;

  /**
   * Constructor de la clase Funko
   * @param ID Identificador único del Funko
   * @param nombre Nombre del Funko
   * @param descripcion Descripcion del Funko
   * @param tipo Tipo, Pop!, Pop! Rides, Vynil Soda o Vynil Gold, entre otros
   * @param genero Genero, Animación, Películas y TV, Videojuegos, Deportes, Música o Ánime, entre otras
   * @param franquicia Franquicia, The Big Bang Theory, Game of Thrones, Sonic The Hedgehog o Marvel: Guardians of the Galaxy, entre otras.
   * @param numeroFranquicia Número identificativo del Funko dentro de la franquicia correspondiente
   * @param exclusivo Verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario
   * @param caracteristicasEspeciales Característica especiales del Funko como, por ejemplo, si brilla en la oscuridad o si su cabeza balancea
   * @param valorMercado Precio del Funko
   */
  constructor(ID: number, nombre: string, descripcion: string, tipo: TipoFunko, genero: GeneroFunko, franquicia: string, 
              numeroFranquicia: number, exclusivo: boolean, caracteristicasEspeciales: string, valorMercado: number) {
    this._ID = ID;
    this._nombre =  nombre;
    this._descripcion = descripcion;
    this._tipo = tipo;
    this._genero = genero;
    this._franquicia = franquicia;
    this._numeroFranquicia = numeroFranquicia
    this._exclusivo = exclusivo;
    this._caracteristicasEspeciales = caracteristicasEspeciales;
    this._valorMercado = valorMercado;
  }

  /**
   * Método para mostrar la información de un Funko concreto, con un color para el valor de mercado
   */
  mostrarFunko() {
    console.log(`ID: ${this._ID}`);
    console.log(`Nombre: ${this._nombre}`);
    console.log(`Descripción: ${this._descripcion}`);
    console.log(`Tipo: ${this._tipo}`);
    console.log(`Genero: ${this._genero}`);
    console.log(`Franquicia: ${this._franquicia}`);
    console.log(`Número: ${this._numeroFranquicia}`);
    console.log(`Exclusivo: ${this._exclusivo}`);
    console.log(`Características especiales: ${this._caracteristicasEspeciales}`);
    if (this._valorMercado > 0 && this._valorMercado <= 5) {
      console.log(`Valor de mercado: ` + chalk.red(`${this._valorMercado}`));
    }
    else if (this._valorMercado > 5 && this._valorMercado <= 15) {
      console.log(`Valor de mercado: ` + chalk.yellow(`${this._valorMercado}`));
    }
    else if (this._valorMercado > 15 && this._valorMercado <= 30) {
      console.log(`Valor de mercado: ` + chalk.blue(`${this._valorMercado}`));
    }
    else if (this._valorMercado > 30) {
      console.log(`Valor de mercado: ` + chalk.green(`${this._valorMercado}`));
    }
  }

  /** 
   * Getter del atributo _ID
   * @returns el atributo _ID
   */
  get ID() {
    return this._ID;
  }
  set ID(ID: number) {
    this._ID = ID;
  }

  /** 
   * Getter del atributo _nombre
   * @returns el atributo _nombre
   */
  get nombre() {
    return this._nombre;
  }
  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  /** 
   * Getter del atributo _descripcion
   * @returns el atributo _descripcion
   */
  get descripcion() {
    return this._descripcion;
  }
  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  /** 
   * Getter del atributo _tipo
   * @returns el atributo _tipo
   */
  get tipo() {
    return this._tipo;
  }
  set tipo(tipo: TipoFunko) {
    this._tipo = tipo;
  }

  /** 
   * Getter del atributo _genero
   * @returns el atributo _genero
   */
  get genero() {
    return this._genero;
  }
  set genero(genero: GeneroFunko) {
    this._genero = genero;
  }

  /** 
   * Getter del atributo _franquicia
   * @returns el atributo _franquicia
   */
  get franquicia() {
    return this._franquicia;
  }
  set franquicia(franquicia: string) {
    this._franquicia = franquicia;
  }

  /** 
   * Getter del atributo _numeroFranquicia
   * @returns el atributo _numeroFranquicia
   */
  get numeroFranquicia() {
    return this._numeroFranquicia;
  }
  set numeroFranquicia(numeroFranquicia: number) {
    this._numeroFranquicia = numeroFranquicia;
  }

  /** 
   * Getter del atributo _exclusivo
   * @returns el atributo _exclusivo
   */
  get exclusivo() {
    return this._exclusivo;
  }
  set exclusivo(exclusivo: boolean) {
    this._exclusivo = exclusivo;
  }

  /** 
   * Getter del atributo _caracteristicasEspeciales
   * @returns el atributo _caracteristicasEspeciales
   */
  get caracteristicasEspeciales() {
    return this._caracteristicasEspeciales;
  }
  set caracteristicasEspeciales(caracteristicasEspeciales: string) {
    this._caracteristicasEspeciales = caracteristicasEspeciales;
  }

  /** 
   * Getter del atributo _valorMercado
   * @returns el atributo _valorMercado
   */
  get valorMercado() {
    return this._valorMercado;
  }
  set valorMercado(valorMercado: number) {
    this._valorMercado = valorMercado;
  }
}

/**
 * Función que convierte el tipo de funko de String a el enum TipoFunko
 * @param type Tipo de Funko en string
 * @returns el tipo de funko de la Enum
 */
export function convertTipoFunko(type: string) : TipoFunko {
  switch (type) {
    case TipoFunko.Pop: return TipoFunko.Pop;
    case TipoFunko.PopRides: return TipoFunko.PopRides;
    case TipoFunko.VynilGold: return TipoFunko.VynilGold;
    case TipoFunko.VynilSoda: return TipoFunko.VynilSoda;
    default: return TipoFunko.Regular
  }
}

/**
 * Función que convierte el genero de funko de String a el enum GeneroFunko
 * @param type Genero de Funko en string
 * @returns el genero de funko de la Enum
 */
export function convertGeneroFunko(gener: string) : GeneroFunko {
  switch (gener) {
    case GeneroFunko.Animacion: return GeneroFunko.Animacion;
    case GeneroFunko.Peliculas: return GeneroFunko.Peliculas;
    case GeneroFunko.TV: return GeneroFunko.TV;
    case GeneroFunko.Videojuegos: return GeneroFunko.Videojuegos;
    case GeneroFunko.Deportes: return GeneroFunko.Deportes;
    case GeneroFunko.Musica: return GeneroFunko.Musica;
    case GeneroFunko.Anime: return GeneroFunko.Anime;
    default: return GeneroFunko.General
  }
}