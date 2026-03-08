import { Affiliation } from "./galactic_registry";

export abstract class GalacticEntity {
  public name: string;
  public affiliation: Affiliation;
  public originPlanet: string;

  constructor(name: string, affiliation: Affiliation, originPlanet: string) {
    this.name = name;
    this.affiliation = affiliation;
    this.originPlanet = originPlanet;
  }
}