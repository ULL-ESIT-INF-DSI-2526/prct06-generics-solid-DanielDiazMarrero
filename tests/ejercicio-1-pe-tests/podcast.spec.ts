import { DataPodcast } from '../../src/ejercicio-1-pe/data_podcast'
import { Podcast } from '../../src/ejercicio-1-pe/podcast'
import { describe, test, expect } from 'vitest'

const data = new DataPodcast("Never give up", 1, "JustChatting",
     "David Goggins", new Date("2026-1-1"), new Date("2026-1-2"))
const podcast = new Podcast(data)

describe("Pruebas de Podcast", () => {
  test("Getters", () => {
    expect(podcast.dataPodcast).toStrictEqual(data);
  })

  test("Pruebas de data()", () => {
    expect(podcast.data()).toStrictEqual(data)
  })

  test("Pruebas de duration()", () => {
    expect(podcast.duration()).toStrictEqual(24*60*60)  // Un dia en segundos
  })
})