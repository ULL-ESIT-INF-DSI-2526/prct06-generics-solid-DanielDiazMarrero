import { Affiliation, GalacticRegistry, SearchByAffiliation, SearchByOriginPlanet} from './galactic_registry'
import { BasicGalacticCollection } from './basic_galactic_collection'
import { Starship } from './starship'

export class StarshipCollection extends BasicGalacticCollection<Starship> {

  // Se supone que las naves no tienen este método pero está obligado por la clase padre (asi lo enetendi en el guion)
  searchByYearsOfTraining(years: number): Starship[] {
    return []
  }
}
