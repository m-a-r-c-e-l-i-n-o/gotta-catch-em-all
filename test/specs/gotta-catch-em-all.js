import { gottaCatchEmAll, gottaReleaseEmAll } from '../../src/gotta-catch-em-all.js'

const mock = NutraMock.getEntry('src/gotta-catch-em-all.js')

describe ('log global', () => {
    it ('should be the console.log method', () => {
        expect(mock.get('log')).toBe(console.log)
    })
})

describe ('gottaCatchEmAll()', () => {
    let onExitCallback, error, errorMessage, mockLog
    beforeEach(() => {
        const on = (event, callback) => {
            if (event === 'exit') onExitCallback = callback
            process.on(event, callback)
        }
        mock.set('nodeProcess', { on })
        gottaCatchEmAll()
        mock.reset('nodeProcess')
        mockLog = jasmine.createSpy('mockLog')
        mock.set('log', mockLog)
        error = new Error('Rejected!')
        errorMessage = 'Unhandled Rejection: ' + error.stack
    })
    afterEach(() => mock.reset('log'))
    it ('should log unhandled rejections', (done) => {

        new Promise(() => { throw error })
        setTimeout(() => {
            onExitCallback()
            expect(mockLog).toHaveBeenCalledWith(errorMessage)
            done()
        }, 0)
    })
    it ('should log unhandled rejections by explicit rejection', (done) => {
        Promise.reject(error)
        setTimeout(() => {
            onExitCallback()
            expect(mockLog).toHaveBeenCalledWith(errorMessage)
            done()
        }, 0)
    })
    it ('should log unhandled rejections inside then blocks', (done) => {
        Promise.resolve().then(() => { throw error })
        setTimeout(() => {
            onExitCallback()
            expect(mockLog).toHaveBeenCalledWith(errorMessage)
            done()
        }, 0)
    })
})

describe ('gottaReleaseEmAll()', () => {
    let onExitCallback, error, errorMessage
    beforeEach(() => {
        const on = (event, callback) => {
            if (event === 'exit') onExitCallback = callback
            process.on(event, callback)
        }
        mock.set('nodeProcess', { on })
        gottaCatchEmAll()
        mock.reset('nodeProcess')
        error = new Error('Rejected!')
        errorMessage = 'Unhandled Rejection: ' + error.stack
    })
    it ('should log unhandled rejections once', (done) => {
        Promise.reject(error)
        setTimeout(() => {
            const mockLog = jasmine.createSpy('mockLog')
            mock.set('log', mockLog)
            gottaReleaseEmAll()
            expect(mockLog).toHaveBeenCalledWith(errorMessage)
            mock.reset('log')
        }, 0)
        setTimeout(() => {
            const mockLog = jasmine.createSpy('mockLog')
            mock.set('log', mockLog)
            gottaReleaseEmAll()
            expect(mockLog).not.toHaveBeenCalled()
            mock.reset('log')
            done()
        }, 0)
    })
    it ('should disable logging on exit', (done) => {
        Promise.reject(error)
        setTimeout(() => {
            mock.set('log', () => {})
            gottaReleaseEmAll()
            mock.reset('log')
            const mockLog = jasmine.createSpy('mockLog')
            mock.set('log', mockLog)
            onExitCallback()
            expect(mockLog).not.toHaveBeenCalled()
            mock.reset('log')
            done()
        }, 0)
    })
})
