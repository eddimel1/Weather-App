import {equalsIsClicked} from './calculator'
import {describe, expect, test} from '@jest/globals'
//not all cases are tested
// cases that are not working +***,///,+///,-///,*///,
describe('test calcualtor', () => {
  test('test+', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '50', sign: null},
          {valueNumber: '50', sign: '+'},
        ],
        {
          currentValue: '50',
          operations: [
            {valueNumber: '50', sign: null},
            {valueNumber: '50', sign: '+'},
          ],
        }
      )
    ).toBe(100)
  })
  test('test-', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '50', sign: '-'},
        ],
        {
          currentValue: '50',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '50', sign: '-'},
          ],
        }
      )
    ).toBe(50)
  })
  test('test*', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '50', sign: null},
          {valueNumber: '2', sign: '*'},
        ],
        {
          currentValue: '2',
          operations: [
            {valueNumber: '50', sign: null},
            {valueNumber: '2', sign: '*'},
          ],
        }
      )
    ).toBe(100)
  })
  test('test*+', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '2', sign: '*'},
          {valueNumber: '50', sign: '+'},
        ],
        {
          currentValue: '50',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '2', sign: '*'},
            {valueNumber: '50', sign: '+'},
          ],
        }
      )
    ).toBe(250)
  })
  test('test*-', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '2', sign: '*'},
          {valueNumber: '50', sign: '-'},
        ],
        {
          currentValue: '50',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '2', sign: '*'},
            {valueNumber: '50', sign: '-'},
          ],
        }
      )
    ).toBe(150)
  })
  test('test*/', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '*'},
          {valueNumber: '5', sign: '/'},
        ],
        {
          currentValue: '5',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '*'},
            {valueNumber: '5', sign: '/'},
          ],
        }
      )
    ).toBe(200)
  })
  test('test*%', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '100', sign: '*'},
          {valueNumber: '10', sign: '%'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '100', sign: '*'},
            {valueNumber: '10', sign: '%'},
          ],
        }
      )
    ).toBe(1000)
  })
  test('test/', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '2', sign: '/'},
        ],
        {
          currentValue: '100',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '2', sign: '/'},
          ],
        }
      )
    ).toBe(50)
  })
  test('test/+', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '/'},
          {valueNumber: '10', sign: '+'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '/'},
            {valueNumber: '10', sign: '+'},
          ],
        }
      )
    ).toBe(20)
  })
  test('test/-', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '/'},
          {valueNumber: '5', sign: '-'},
        ],
        {
          currentValue: '5',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '/'},
            {valueNumber: '5', sign: '-'},
          ],
        }
      )
    ).toBe(5)
  })
  test('test/*', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '/'},
          {valueNumber: '2', sign: '*'},
        ],
        {
          currentValue: '2',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '/'},
            {valueNumber: '2', sign: '*'},
          ],
        }
      )
    ).toBe(20)
  })
  test('test//', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '/'},
          {valueNumber: '10', sign: '/'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '/'},
            {valueNumber: '10', sign: '/'},
          ],
        }
      )
    ).toBe(1)
  })
  test('test%', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '%'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '%'},
          ],
        }
      )
    ).toBe(10)
  })
  test('test%%', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '%'},
          {valueNumber: '10', sign: '%'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '%'},
          ],
        }
      )
    ).toBe(10)
  })
  test('test%+', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '%'},
          {valueNumber: '10', sign: '+'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '%'},
          ],
        }
      )
    ).toBe(20)
  })
  test('test%-', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '200', sign: null},
          {valueNumber: '10', sign: '%'},
          {valueNumber: '10', sign: '-'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '200', sign: null},
            {valueNumber: '10', sign: '%'},
            {valueNumber: '10', sign: '-'},
          ],
        }
      )
    ).toBe(10)
  })
  test('test%*', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '%'},
          {valueNumber: '2', sign: '*'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '%'},
            {valueNumber: '2', sign: '*'},
          ],
        }
      )
    ).toBe(20)
  })
  test('test%/', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '10', sign: '%'},
          {valueNumber: '2', sign: '/'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '10', sign: '%'},
            {valueNumber: '2', sign: '/'},
          ],
        }
      )
    ).toBe(5)
  })
  test('test+-', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '100', sign: '+'},
          {valueNumber: '50', sign: '-'},
        ],
        {
          currentValue: '50',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '100', sign: '+'},
            {valueNumber: '50', sign: '-'},
          ],
        }
      )
    ).toBe(150)
  })
  test('test+*', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '2', sign: '+'},
          {valueNumber: '50', sign: '*'},
        ],
        {
          currentValue: '50',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '2', sign: '+'},
            {valueNumber: '50', sign: '*'},
          ],
        }
      )
    ).toBe(200)
  })
  test('test+/', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '100', sign: '+'},
          {valueNumber: '2', sign: '/'},
        ],
        {
          currentValue: '2',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '100', sign: '+'},
            {valueNumber: '2', sign: '/'},
          ],
        }
      )
    ).toBe(150)
  })
  test('test+%', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '100', sign: '+'},
          {valueNumber: '10', sign: '%'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '100', sign: '+'},
            {valueNumber: '10', sign: '%'},
          ],
        }
      )
    ).toBe(110)
  })
  test('test-+', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '50', sign: '-'},
          {valueNumber: '50', sign: '+'},
        ],
        {
          currentValue: '50',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '50', sign: '-'},
            {valueNumber: '50', sign: '+'},
          ],
        }
      )
    ).toBe(100)
  })
  test('test-*', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '25', sign: '-'},
          {valueNumber: '2', sign: '*'},
        ],
        {
          currentValue: '2',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '25', sign: '-'},
            {valueNumber: '2', sign: '*'},
          ],
        }
      )
    ).toBe(50)
  })
  test('test-/', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '100', sign: '-'},
          {valueNumber: '2', sign: '/'},
        ],
        {
          currentValue: '2',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '100', sign: '-'},
            {valueNumber: '2', sign: '/'},
          ],
        }
      )
    ).toBe(50)
  })
  test('test-%', () => {
    expect(
      equalsIsClicked(
        [
          {valueNumber: '100', sign: null},
          {valueNumber: '100', sign: '-'},
          {valueNumber: '10', sign: '%'},
        ],
        {
          currentValue: '10',
          operations: [
            {valueNumber: '100', sign: null},
            {valueNumber: '100', sign: '-'},
            {valueNumber: '10', sign: '%'},
          ],
        }
      )
    ).toBe(90)
  })
})
