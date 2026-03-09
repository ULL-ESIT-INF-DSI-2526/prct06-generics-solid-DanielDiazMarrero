import { DataPodcast } from '../../src/ejercicio-1-pe/data_podcast'
import { Podcast } from '../../src/ejercicio-1-pe/podcast'
import { Song } from '../../src/ejercicio-1-pe/song'
import { History } from '../../src/ejercicio-1-pe/history'
import { describe, test, expect } from 'vitest'

const data = new DataPodcast("Never give up", 1, "JustChatting",
     "David Goggins", new Date("2026-1-1"), new Date("2026-1-2"))
const podcast = new Podcast(data)

const song = new Song("Torero", "Chayane", "Pop",
     "Album", 240)

let historyYoutube = new History();

describe("Pruebas de History", () => {
  test("Prueba de add", () => {
    historyYoutube.add(song)
    expect(historyYoutube.history).toStrictEqual([song])
    historyYoutube.add(podcast)
    expect(historyYoutube.history).toStrictEqual([song, podcast])
  })

  test("Prueba de remove", () => {
    historyYoutube.remove(1)
    expect(historyYoutube.history).toStrictEqual([song])
  })

  test("Prueba de get", () => {
    expect(historyYoutube.get(0)).toStrictEqual(song)
  })

  test("Prueba de size", () => {
    expect(historyYoutube.size()).toStrictEqual(1)
  })

  test("Prueba de filter", () => {
    expect(historyYoutube.filter(item => item == item)).toStrictEqual([song])
  })

  test("Prueba de duration", () => {
    historyYoutube.add(podcast);
    expect(historyYoutube.duration()).toStrictEqual(86640)
  })
})