import { Affiliation } from "./galactic_registry";
import { GalacticEntity } from "./galatic_entity";

export class Starship extends GalacticEntity {
  constructor(
    name: string,
    affiliation: Affiliation,
    originPlanet: string,
    public shipClass: number,
    public yearOfConstruction: number
  ) {
    super(name, affiliation, originPlanet);
  }
}