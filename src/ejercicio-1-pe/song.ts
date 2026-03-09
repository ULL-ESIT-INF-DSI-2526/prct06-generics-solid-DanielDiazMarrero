import { Reproducible } from "./reproducible";

export class Song implements Reproducible<String> {
  private _title: string;
  private _artist: string;
  private _genre: string; 
  private _album: string;
  private _time: number;

  constructor(title: string, artist: string, genre: string, album: string, time: number) {

    if (title == "" || artist == "" || genre == "" || time < 0) {
      throw new Error("Revise los argumentos")
    }

    this._title = title;
    this._artist = artist;
    this._genre = genre;
    this._album = album;
    this._time = time;
  }

  get title(): string {
    return this._title;
  }

  get artist(): string {
    return this._artist;
  }

  get genre(): string {
    return this._genre;
  }

  get album(): string {
    return this._album;
  }

  get time(): number {
    return this._time;
  }

  /**
   * Devuelve la información de la canción
   * @returns Retorna un string
   */
  data(): string {
    return `Titulo: ${this._title}, Artista: ${this._artist}, Genero: ${this._genre}, Album: ${this._album}`
  }

  /**
   * Devuelve el tiempo de duración de la canción en segundos
   * @returns Retorna un number
   */
  duration(): number {
    return this._time;
  }
}