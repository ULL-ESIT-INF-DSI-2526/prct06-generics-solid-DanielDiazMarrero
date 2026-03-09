export class DataPodcast {
  private _name: string;
  private _numberEpisode: number;
  private _theme: string;
  private _presenter: string;
  private _startDate: Date;
  private _endDate: Date;

  constructor(
    name: string,
    numberEpisode: number,
    theme: string,
    presenter: string,
    startDate: Date,
    endDate: Date
  ) {

    if (name == "" || theme == "" || presenter == "" || numberEpisode < 0 || startDate > endDate) {
      throw new Error("Revise los argumentos")
    }

    this._name = name;
    this._numberEpisode = numberEpisode;
    this._theme = theme;
    this._presenter = presenter;
    this._startDate = startDate;
    this._endDate = endDate;
  }

  get name(): string {
    return this._name;
  }

  get numberEpisode(): number {
    return this._numberEpisode;
  }

  get theme(): string {
    return this._theme;
  }

  get presenter(): string {
    return this._presenter;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }
}