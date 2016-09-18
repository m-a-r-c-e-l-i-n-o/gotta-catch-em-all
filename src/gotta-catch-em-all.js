const nodeProcess = process
const log = console.log
const unhandledRejectionStore = new Map()

const gottaCatchEmAll = () => {
    listenToUnhandledRejections()
    nodeProcess.on('exit', gottaReleaseEmAll)
}

const listenToUnhandledRejections = () => {
    nodeProcess.on('unhandledRejection', handleUnhandledRejections)
    nodeProcess.on('rejectionHandled', handleRejectionHandled)
}

const handleUnhandledRejections = (reason, promise) => {
    unhandledRejectionStore.set(promise, reason)
}

const handleRejectionHandled = promise => {
    unhandledRejectionStore.delete(promise)
}

const gottaReleaseEmAll = () => {
    nodeProcess.removeListener('unhandledRejection', handleUnhandledRejections)
    nodeProcess.removeListener('rejectionHandled', handleRejectionHandled)
    nodeProcess.removeListener('exit', gottaReleaseEmAll)
    unhandledRejectionStore.forEach((reason, promise) => {
        log(`Unhandled Rejection: ${reason.stack}`)
        unhandledRejectionStore.delete(promise)
    })
}

export { gottaCatchEmAll, gottaReleaseEmAll }
