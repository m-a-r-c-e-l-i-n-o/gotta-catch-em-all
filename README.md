# Gotta Catch Em All!
For when your pokemon is being unruly and you have no idea why. In other words, it catches unhandled rejections (usually caused by using ES6 Promises) in Node v6+.

## Installation
```bash
npm install --save-dev gotta-catch-em-all
```

## Usage
```js
import { gottaCatchEmAll, gottaReleaseEmAll } from 'gotta-catch-em-all'

gottaCatchEmAll() // Start logging unhandled rejections

Promise.reject(new Error('I shall not get uncaught!')) // Throw a fugitive error

setTimeout(() => { gottaReleaseEmAll() }, 0) // Logs all unhandled rejections to the console
// Example:
// Unhandled Rejection: Error: I shall not get uncaught!
// ...
// stack trace output
// ....
```
<sub>*Note: Remember to only call "gottaReleaseEmAll" after the async calls are done. Calling "gottaReleaseEmAll" is entirely optional, if left uncalled, unhandled rejections will be logged to the console when node exits.*</sub>
