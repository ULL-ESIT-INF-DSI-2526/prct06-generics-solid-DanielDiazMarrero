import {
  Paso,
  PasoConHerramienta,
  PasoConTemperatura,
  Receta,
  Chef,
  Recetario,
  StepRepository,
  RecipeRepository,
  ChefRepository,
  RecipeTimeEstimator
} from "../../src/ejercicio-2/ej2";
import { describe, expect, test, beforeEach } from 'vitest'

describe("StepRepository", () => {

  let repo: StepRepository;

  beforeEach(() => {
    repo = new StepRepository();
  });

  test("add y getAll funcionan correctamente", () => {
    const paso = new Paso("1", "Cortar", "Cortar verduras", ["prep"], 5);

    repo.add(paso);

    expect(repo.getAll().length).toBe(1);
  });

  test("getById devuelve el paso correcto", () => {
    const paso = new Paso("1", "Cortar", "Cortar verduras", ["prep"], 5);

    repo.add(paso);

    expect(repo.getById("1")).toBe(paso);
  });

  test("remove elimina correctamente", () => {
    const paso = new Paso("1", "Cortar", "Cortar verduras", ["prep"], 5);

    repo.add(paso);
    repo.remove("1");

    expect(repo.getAll().length).toBe(0);
  });

  test("searchByNAme encuentra pasos con nombre", () => {
    const paso = new Paso("1", "Cortar", "Cortar verduras", ["prep"], 5);

    repo.add(paso);

    const result = repo.searchByName("Cortar");

    expect(result.length).toBe(1);
  });

  test("searchByTag encuentra pasos con etiqueta", () => {
    const paso = new Paso("1", "Cortar", "Cortar verduras", ["prep"], 5);

    repo.add(paso);

    const result = repo.searchByTag("prep");

    expect(result.length).toBe(1);
  });

  test("searchOptional devuelve pasos opcionales", () => {
    const paso = new Paso("1", "Hornear", "Hornear masa", ["coccion"], 20, true);

    repo.add(paso);

    const result = repo.searchOptional(true);

    expect(result.length).toBe(1);
  });

});

describe("RecipeRepository", () => {

  let repo: RecipeRepository;

  beforeEach(() => {
    repo = new RecipeRepository();
  });

  test("searchByName encuentra recetas", () => {
    const receta = new Receta("r1", "Pastel", 2020, []);

    repo.add(receta);

    const result = repo.searchByName("Pastel");

    expect(result.length).toBe(1);
  });

  test("searchByYear encuentra recetas por año", () => {
    const receta = new Receta("r1", "Pastel", 2020, []);

    repo.add(receta);

    const result = repo.searchByYear(2020);

    expect(result.length).toBe(1);
  });

  test("searchByYearRange funciona correctamente", () => {
    repo.add(new Receta("r1", "Pastel", 2018, []));
    repo.add(new Receta("r2", "Tarta", 2022, []));

    const result = repo.searchByYearRange(2015, 2020);

    expect(result.length).toBe(1);
  });

});

describe("ChefRepository", () => {

  let repo: ChefRepository;

  beforeEach(() => {
    repo = new ChefRepository();
  });

  test("searchByName encuentra chefs", () => {
    const chef = new Chef("c1", "Gordon Ramsay", 1000000, []);

    repo.add(chef);

    const result = repo.searchByName("Gordon");

    expect(result.length).toBe(1);
  });

  test("searchByMinFollowers funciona", () => {
    repo.add(new Chef("c1", "Chef A", 1000, []));
    repo.add(new Chef("c2", "Chef B", 50000, []));

    const result = repo.searchByMinFollowers(10000);

    expect(result.length).toBe(1);
  });

});

describe("RecipeTimeEstimator", () => {

  let estimator: RecipeTimeEstimator;

  beforeEach(() => {
    estimator = new RecipeTimeEstimator();
  });

  test("countSteps devuelve número correcto", () => {

    const pasos = [
      new Paso("p1", "Cortar", "", [], 5),
      new Paso("p2", "Mezclar", "", [], 3)
    ];

    const receta = new Receta("r1", "Test", 2020, pasos);

    expect(estimator.countSteps(receta)).toBe(2);
  });

  test("estimateTime sin pasos opcionales devuelve número", () => {

    const pasos = [
      new Paso("p1", "Cortar", "", [], 5),
      new Paso("p2", "Mezclar", "", [], 3)
    ];

    const receta = new Receta("r1", "Test", 2020, pasos);

    const result = estimator.estimateTime(receta);

    expect(result).toBe(8);
  });

  test("estimateTime con pasos opcionales devuelve rango", () => {

    const pasos = [
      new Paso("p1", "Cortar", "", [], 5),
      new Paso("p2", "Hornear", "", [], 10, true)
    ];

    const receta = new Receta("r1", "Test", 2020, pasos);

    const result = estimator.estimateTime(receta);

    expect(result).toEqual({ min: 5, max: 15 });
  });

});

describe("Compatibilidad con subclases de Paso", () => {

  test("PasoConHerramienta funciona como Paso", () => {

    const paso = new PasoConHerramienta(
      "p1",
      "Batir",
      "Batir mezcla",
      ["mezcla"],
      5,
      false,
      "batidora"
    );

    expect(paso.herramienta).toBe("batidora");
    expect(paso.nombre).toBe("Batir");
  });

  test("PasoConTemperatura funciona como Paso", () => {

    const paso = new PasoConTemperatura(
      "p1",
      "Hornear",
      "Hornear mezcla",
      ["coccion"],
      20,
      false,
      180
    );

    expect(paso.temperatura).toBe(180);
  });

});