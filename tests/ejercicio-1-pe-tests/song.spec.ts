import { Song } from '../../src/ejercicio-1-pe/song'
import { describe, test, expect } from 'vitest'

const song = new Song("Torero", "Chayane", "Pop",
     "Album", 240)

describe("Pruebas de Song", () => {
  test("Getters", () => {
    expect(song.title).toBe("Torero");
    expect(song.artist).toBe("Chayane");
    expect(song.genre).toBe("Pop");
    expect(song.album).toBe("Album");
    expect(song.time).toStrictEqual(240);
  })

  test("Pruebas de data()", () => {
    expect(song.data()).toStrictEqual(`Titulo: ${song.title}, Artista: ${song.artist}, Genero: ${song.genre}, Album: ${song.album}`)
  })

  test("Pruebas de duration()", () => {
    expect(song.duration()).toStrictEqual(240)
  })

  test("Pruebas de argumentos inválidos", () => {
    expect(() => new Song("", "Chayane", "Pop", "Album", 240)).toThrowError("Revise los argumentos")
    expect(() => new Song("Torero", "Chayane", "Pop", "Album", -240)).toThrowError("Revise los argumentos")
    expect(() => new Song("Torero", "", "Pop", "Album", 240)).toThrowError("Revise los argumentos")
    expect(() => new Song("", "Chayane", "", "Album", 240)).toThrowError("Revise los argumentos")
  })
})