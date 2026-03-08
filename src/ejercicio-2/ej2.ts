/* =====================================================
   TIPOS BASE
===================================================== */

type ID = string;

/* =====================================================
   INTERFACES DE REPOSITORIO (GENÉRICAS)
===================================================== */

interface Repository<T, K> {
  add(item: T): void;
  remove(id: K): void;
  getById(id: K): T | undefined;
  getAll(): T[];
}

/* =====================================================
   INTERFACES DE BÚSQUEDA (ISP)
===================================================== */

interface SearchByName<T> {
  searchByName(name: string): T[];
}

interface SearchByTags<T> {
  searchByTag(tag: string): T[];
}

interface SearchByYear<T> {
  searchByYear(year: number): T[];
  searchByYearRange(min: number, max: number): T[];
}

interface SearchByFollowers<T> {
  searchByMinFollowers(minFollowers: number): T[];
}

interface SearchByOptional<T> {
  searchOptional(optional: boolean): T[];
}

/* =====================================================
   ENTIDADES
===================================================== */

export class Paso {
  constructor(
    public id: ID,
    public nombre: string,
    public descripcion: string,
    public etiquetas: string[],
    public duracion: number,
    public opcional: boolean = false
  ) {}
}

export class PasoConHerramienta extends Paso {
  constructor(
    id: ID,
    nombre: string,
    descripcion: string,
    etiquetas: string[],
    duracion: number,
    opcional: boolean,
    public herramienta: string
  ) {
    super(id, nombre, descripcion, etiquetas, duracion, opcional);
  }
}

export class PasoConTemperatura extends Paso {
  constructor(
    id: ID,
    nombre: string,
    descripcion: string,
    etiquetas: string[],
    duracion: number,
    opcional: boolean,
    public temperatura: number
  ) {
    super(id, nombre, descripcion, etiquetas, duracion, opcional);
  }
}

export class Receta {
  constructor(
    public id: ID,
    public nombre: string,
    public anio: number,
    public pasos: Paso[]
  ) {}
}

export class Recetario {
  constructor(
    public id: ID,
    public nombre: string,
    public recetas: Receta[]
  ) {}
}

export class Chef {
  constructor(
    public id: ID,
    public nombre: string,
    public seguidores: number,
    public recetarios: Recetario[]
  ) {}
}

/* =====================================================
   IMPLEMENTACIÓN BASE DE REPOSITORIO
===================================================== */

export abstract class InMemoryRepository<T extends { id: K }, K>
  implements Repository<T, K>
{
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(id: K): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  getById(id: K): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

/* =====================================================
   REPOSITORIOS ESPECÍFICOS
===================================================== */

export class ChefRepository
  extends InMemoryRepository<Chef, ID>
  implements SearchByName<Chef>, SearchByFollowers<Chef>
{
  searchByName(name: string): Chef[] {
    return this.items.filter(c =>
      c.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }

  searchByMinFollowers(minFollowers: number): Chef[] {
    return this.items.filter(c => c.seguidores >= minFollowers);
  }
}

export class RecipeRepository
  extends InMemoryRepository<Receta, ID>
  implements SearchByName<Receta>, SearchByYear<Receta>
{
  searchByName(name: string): Receta[] {
    return this.items.filter(r =>
      r.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }

  searchByYear(year: number): Receta[] {
    return this.items.filter(r => r.anio === year);
  }

  searchByYearRange(min: number, max: number): Receta[] {
    return this.items.filter(r => r.anio >= min && r.anio <= max);
  }
}

export class StepRepository
  extends InMemoryRepository<Paso, ID>
  implements SearchByName<Paso>, SearchByTags<Paso>, SearchByOptional<Paso>
{
  searchByName(name: string): Paso[] {
    return this.items.filter(p =>
      p.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }

  searchByTag(tag: string): Paso[] {
    return this.items.filter(p => p.etiquetas.includes(tag));
  }

  searchOptional(optional: boolean): Paso[] {
    return this.items.filter(p => p.opcional === optional);
  }
}

/* =====================================================
   SERVICIO DE CÁLCULO (SRP)
===================================================== */

export class RecipeTimeEstimator {
  countSteps(recipe: Receta): number {
    return recipe.pasos.length;
  }

  estimateTime(recipe: Receta): number | { min: number; max: number } {
    let min = 0;
    let max = 0;

    for (const paso of recipe.pasos) {
      if (paso.opcional) {
        max += paso.duracion;
      } else {
        min += paso.duracion;
        max += paso.duracion;
      }
    }

    if (min === max) return min;

    return { min, max };
  }
}

/* =====================================================
   PRESENTACIÓN (DEPENDENCY INVERSION)
===================================================== */

interface TableRenderer<T> {
  render(data: T[]): void;
}

export class ConsoleTableRenderer<T> implements TableRenderer<T> {
  render(data: T[]): void {
    console.table(data);
  }
}

/* =====================================================
   EJEMPLO DE USO
===================================================== */

const stepRepo = new StepRepository();
const recipeRepo = new RecipeRepository();
const chefRepo = new ChefRepository();

const renderer = new ConsoleTableRenderer();
const estimator = new RecipeTimeEstimator();

/* PASOS */

const paso1 = new Paso(
  "p1",
  "Cortar verduras",
  "Cortar en cubos",
  ["preparacion"],
  5
);

const paso2 = new PasoConHerramienta(
  "p2",
  "Batir",
  "Batir mezcla",
  ["mezcla"],
  3,
  false,
  "batidora"
);

const paso3 = new PasoConTemperatura(
  "p3",
  "Hornear",
  "Hornear mezcla",
  ["coccion"],
  20,
  true,
  180
);

stepRepo.add(paso1);
stepRepo.add(paso2);
stepRepo.add(paso3);

/* RECETA */

const receta = new Receta("r1", "Pastel simple", 2020, [
  paso1,
  paso2,
  paso3
]);

recipeRepo.add(receta);

/* CHEF */

const recetario = new Recetario("rc1", "Postres", [receta]);

const chef = new Chef("c1", "Gordon", 2000000, [recetario]);

chefRepo.add(chef);

/* CONSULTAS */

console.log("Chefs con mínimo seguidores");
renderer.render(chefRepo.searchByMinFollowers(100000));

console.log("Recetas entre 2015 y 2025");
renderer.render(recipeRepo.searchByYearRange(2015, 2025));

console.log("Pasos con etiqueta 'coccion'");
renderer.render(stepRepo.searchByTag("coccion"));

console.log("Pasos opcionales");
renderer.render(stepRepo.searchOptional(true));

console.log("Estimación de tiempo receta");
console.log(estimator.estimateTime(receta));