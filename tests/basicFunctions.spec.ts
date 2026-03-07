import {expect, test, describe } from 'vitest'
import { add } from '../src/basicFunctions'

test('Pruebas', () => {
  expect(add()).toBe(undefined)
})