const Class = {
    gottaCatchEmAll() {
        this.unhandledRejections = new Map()
        this.uncaughtExceptions = []
        this.onUnhandledRejectionsHandler = null
        this.onRejectionHandledHandler = null
        this.onUncaughtExceptionsHandler = null
        this.onNodeExitHandler = null
        this.gottaHandleThemAll()
    },
    gottaPrintEmAll() {
        this.printUnhandledRejections()
        this.printUncaughtExceptions()
    },
    gottaHandleThemAll() {
        this.listenToNodeExit()
        this.listenToUnhandledRejections()
        this.listenToUncaughtExceptions()
    },
    gottaReleaseEmAll(forceExitError) {
        this.gottaRemoveThemAll()
        this.gottaPrintEmAll()
        if (forceExitError && (
            this.unhandledRejections.size > 0 ||
            this.uncaughtExceptions.length > 0
        )) {
            process.exit(1)
        }
    },
    gottaRemoveThemAll() {
        process.removeListener('unhandledRejection', this.onUnhandledRejectionsHandler)
        process.removeListener('rejectionHandled', this.onRejectionHandledHandler)
        process.removeListener('uncaughtException', this.onUncaughtExceptionsHandler)
        process.removeListener('exit', this.onNodeExitHandler)
    },
    printUnhandledRejections() {
        this.unhandledRejections.forEach((promise, reason) => {
            console.log(`Unhandled Rejection: ${reason.stack}`)
        })
    },
    printUncaughtExceptions() {
        this.uncaughtExceptions.forEach((error) => {
            console.log(`Uncaught Exception: ${error.stack}`);
        })
    },
    onUnhandledRejection(reason, promise) {
        this.unhandledRejections.set(reason, promise)
    },
    onRejectionHandled(promise) {
        this.unhandledRejections.delete(promise)
    },
    listenToUnhandledRejections() {
        this.onUnhandledRejectionsHandler = (reason, promise) => {
            this.onUnhandledRejection(reason, promise)
        }
        this.onRejectionHandledHandler = promise => {
            this.onRejectionHandled(promise)
        }
        process.on('unhandledRejection', this.onUnhandledRejectionsHandler)
        process.on('rejectionHandled', this.onRejectionHandledHandler)
    },
    onUncaughtException(error) {
        this.uncaughtExceptions.push(error)
    },
    listenToUncaughtExceptions() {
        this.onUncaughtExceptionsHandler = error => {
            this.onUncaughtException(error)
        }
        process.on('uncaughtException', this.onUncaughtExceptionsHandler)
    },
    listenToNodeExit() {
        this.onNodeExitHandler = code => {
            this.onRejectionHandled(code)
        }
        process.on('exit', this.onNodeExitHandler)
    }
}

export const gottaCatchEmAll = Class.gottaCatchEmAll.bind(Class)
export const gottaReleaseEmAll = Class.gottaReleaseEmAll.bind(Class)
export default Class
