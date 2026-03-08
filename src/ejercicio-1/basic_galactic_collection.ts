import { Affiliation, GalacticRegistry, SearchByAffiliation, SearchByOriginPlanet} from './galactic_registry'

// Si no extendemos T, el compilador no puede asegurarse de que T tenga esas propiedades y da error
export abstract class BasicGalacticCollection<T extends { name: string, affiliation: Affiliation, originPlanet: string }> implements GalacticRegistry<T>, SearchByAffiliation<T>, SearchByOriginPlanet<T> {
  protected collection: T[];

  // Podría hacer que empiecer vacía directamente desde el constructor.
  // Pero vamos a dejarlo para que al crear el objeto se decida si está vacía  o no
  constructor(collection: T[]) {
    this.collection = collection
  }

  add(item: T): void {
    this.collection.push(item);
  }

  remove(name: string): void {
    this.collection = this.collection.filter(item => item.name != name)
  }

  getAll(): T[] {
     return this.collection
  }

  searchByAfiliation(affil: Affiliation): T[] {
    return this.collection.filter(item => item.affiliation == affil)
  }

  searchByOriginPlanet(planet: string): T[] {
    return this.collection.filter(item => item.originPlanet == planet)
  }

  // Creo que si solo es para un subclase, debería de estar en ella y no en la super como abstract. (Sería mejor ponerlo como interfaz creo)
  abstract searchByYearsOfTraining(years: number): T[];
}