import { Affiliation } from "./galactic_registry";
import { GalacticEntity } from "./galatic_entity";

export class JediMaster extends GalacticEntity {
  public yearsOfTraining: number;
  public powerLevel: number;

  constructor(name: string, affiliation: Affiliation, originPlanet: string, yearsOfTraining: number, powerLevel: number) {
    super(name, affiliation, originPlanet);
    this.powerLevel = powerLevel;
    this.yearsOfTraining = yearsOfTraining
  }
}