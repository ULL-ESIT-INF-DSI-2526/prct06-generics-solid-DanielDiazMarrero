import { DataPodcast } from "./data_podcast";
import { Reproducible } from "./reproducible";

export class Podcast implements Reproducible<DataPodcast> {
  private _dataPodcast: DataPodcast

  constructor(data: DataPodcast) {
    this._dataPodcast = data;
  }

  get dataPodcast(): DataPodcast {
    return this._dataPodcast;
  }

  /**
   * Obtenemos la información del podcast
   * @returns Retorna un objeto DataPodcast
   */
  data(): DataPodcast {
    return this._dataPodcast
  }

  /**
   * Función para obtener la duración del podcast
   * @returns Retorna en segundos
   */
  duration(): number {
    let result: number = 0;

    const start: number = Number(this._dataPodcast.startDate)
    const end: number = Number(this._dataPodcast.endDate)

    result = (end - start) / 1000;

    return result;
  }
}