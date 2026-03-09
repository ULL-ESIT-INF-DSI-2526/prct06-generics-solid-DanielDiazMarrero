import { DataPodcast } from '../../src/ejercicio-1-pe/data_podcast'
import { describe, test, expect } from 'vitest'

const data = new DataPodcast("Never give up", 1, "JustChatting",
     "David Goggins", new Date("2026-1-1"), new Date("2026-1-2"))

describe("Pruebas de DataPodcast", () => {
  test("Getters", () => {
    expect(data.name).toBe("Never give up");
    expect(data.numberEpisode).toBe(1);
    expect(data.theme).toBe("JustChatting");
    expect(data.presenter).toBe("David Goggins");
    expect(data.startDate).toStrictEqual(new Date("2026-1-1"));
    expect(data.endDate).toStrictEqual(new Date("2026-1-2"));
  })

  test("Pruebas de argumentos inválidos", () => {
      expect(() => new DataPodcast("", 1, "JustChatting","David Goggins", new Date("2026-1-1"), new Date("2026-1-2"))).toThrowError("Revise los argumentos")
      expect(() => new DataPodcast("Never give up", -1, "JustChatting","David Goggins", new Date("2026-1-1"), new Date("2026-1-2"))).toThrowError("Revise los argumentos")
      expect(() => new DataPodcast("Never give up", -1, "JustChatting","", new Date("2026-1-1"), new Date("2026-1-2"))).toThrowError("Revise los argumentos")
      expect(() => new DataPodcast("Never give up", -1, "JustChatting","David Goggins", new Date("2026-1-2"), new Date("2026-1-1"))).toThrowError("Revise los argumentos")
      expect(() => new DataPodcast("Never give up", -1, "","David Goggins", new Date("2026-1-1"), new Date("2026-1-2"))).toThrowError("Revise los argumentos")
    })
})