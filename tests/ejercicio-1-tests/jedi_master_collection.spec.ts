import { JediMaster } from '../../src/ejercicio-1/jedi_master';
import { JediMasterCollection } from '../../src/ejercicio-1/jedi_master_collection';
import { Affiliation } from '../../src/ejercicio-1/galactic_registry'
import { describe, expect, test } from 'vitest'

const jedis = new JediMasterCollection([]);

const Yoda = new JediMaster("Yoda", Affiliation["Republic"], "Dagobah", 100, 800)
const Obi = new JediMaster("Obi-Wan Kenobi", Affiliation["Republic"], "Stewjon", 90, 400)

jedis.add(Yoda);
jedis.add(Obi);

describe("Pruebas", () => {
  test("Buscar por afiliacion:", () => {
    expect(jedis.searchByAfiliation(Affiliation["Republic"])).toStrictEqual([Yoda, Obi])
  })
   
test("Buscar por planeta:", () => {
    expect(jedis.searchByOriginPlanet("Dagobah")).toStrictEqual([Yoda])
  })
   
  test("Buscar por años de entreno:", () => {
    expect(jedis.searchByYearsOfTraining(100)).toStrictEqual([Yoda])
  })

  test("Buscar todos los Jedi", () => {
    expect(jedis.getAll()).toStrictEqual([Yoda, Obi])
  })

  test("Buscar todos los Jedi, despúes de remove", () => {
    jedis.remove("Yoda");
    expect(jedis.getAll()).toStrictEqual([Obi])
  })
})