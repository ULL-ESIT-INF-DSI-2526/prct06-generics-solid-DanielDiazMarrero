import { Reproducible } from "./reproducible";
import { Song } from "./song";
import { Podcast } from "./podcast";

export class History<T extends (Song | Podcast)> {
  private _history: T[];

  constructor() {
    this._history = []
  }

  get history(): T[] {
    return this._history;
  }

  /**
   * Añadimos un elemento al historial
   * @param item - Elemento para añadir
   */
  add(item: T): void {
    this._history.push(item);
  }

  /**
   * Eliminamos un elemento de la lista
   * @param index - Indice del valor a eliminar
   */
  remove(index: number): void {
    this._history = this._history.filter((item, i) => i != index)
  }

  /**
   * Obtenemos un elemento de la lista
   * @param index - Indice del elemento
   * @returns 
   */
  get(index: number): T {
    return this._history[index]
  }

  /**
   * Función para obtener el tamaño del historial
   * @returns Retorna el tamaño
   */
  size(): number {
    return this._history.length
  }

  /**
   * Filramos el historial con una función lógica
   * @param call - Función lógica 
   * @returns 
   */
  filter(call: (value: T, index: number, oldArray: T[]) => boolean): T[] {
    let result: T[] = [];

    for(let i = 0; i < this._history.length; i++) {
      if (call(this._history[i], i, this._history))result.push(this._history[i])
    }

    return result;
  } 

  /**
   * Función para obtener l duración total del historial
   * @returns Retorna en segundos
   */
  duration(): number {
    let result: number = 0;

    for (let i = 0; i < this._history.length; i++) {
      result += this._history[i].duration();
    }

    return result;
  }
}