import {describe, expect, test} from '@jest/globals'
import {getDatefromData} from './utils'


describe('test returned time' ,() => {
    test('test minutes less than 10' , () => {
        expect(getDatefromData('minutes' , 1661663120 * 1000)).toBe('05')
        
    })
    test('test minutes more than 10' , () => {
        expect(getDatefromData('minutes' ,1661666120 * 1000)).toBe('55')
    })
})