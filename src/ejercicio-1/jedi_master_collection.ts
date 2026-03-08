import { Affiliation, GalacticRegistry, SearchByAffiliation, SearchByOriginPlanet} from './galactic_registry'
import { BasicGalacticCollection } from './basic_galactic_collection'
import { JediMaster } from './jedi_master'

export class JediMasterCollection extends BasicGalacticCollection<JediMaster> implements SearchByAffiliation<JediMaster>, SearchByOriginPlanet<JediMaster> {
  searchByYearsOfTraining(years: number): JediMaster[] {
    return this.collection.filter(item => item.yearsOfTraining == years)
  }
}
