import { Starship } from '../../src/ejercicio-1/starship';
import { StarshipCollection } from '../../src/ejercicio-1/starship_collection';
import { Affiliation } from '../../src/ejercicio-1/galactic_registry'
import { describe, expect, test } from 'vitest'

const jedis = new StarshipCollection([]);

const TIE = new Starship("Yoda", Affiliation["Empire"], "Dagobah", 1, 1200)
const LAAT = new Starship("Obi-Wan Kenobi", Affiliation["Republic"], "Stewjon", 2, 1400)

jedis.add(TIE);
jedis.add(LAAT);

describe("Pruebas", () => {
  test("Buscar por afiliacion:", () => {
    expect(jedis.searchByAfiliation(Affiliation["Republic"])).toStrictEqual([LAAT])
  })
   
   test("Buscar por planeta:", () => {
    expect(jedis.searchByOriginPlanet("Dagobah")).toStrictEqual([TIE])
  })

  test("Buscar por años de entreno:", () => {
    expect(jedis.searchByYearsOfTraining(1)).toStrictEqual([])
  })
   
})