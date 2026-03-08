export enum Affiliation {"Republic", "Empire", "Sith", "Separatist"}

export interface GalacticRegistry<T> {
  add(item: T): void;
  remove(name: string): void;
  getAll(): T[];
}

export interface SearchByAffiliation<T> {
  searchByAfiliation(affiliation: Affiliation): T[];
}

export interface SearchByOriginPlanet<T> {
  searchByOriginPlanet(planet: string): T[];
}
