# Gotta Catch Em All!
For when your pokemon is being a total d*ck and you have no idea why. In other words, it catches uncaught exceptions and unhandled rejections (usually caused by using ES6 Promises) in Node.

## Installation
```bash
npm install --save-dev gotta-catch-em-all
```

## Usage
```js
import { gottaCatchEmAll, gottaReleaseEmAll } from 'gotta-catch-em-all'

gottaCatchEmAll() // start logging unhandled and uncaught errors

// some crazy sync and async stuff

gottaReleaseEmAll() // stops logging and prints the errors with stack output
```
<sub>*Note: Usage example is not very representative, remember to only call "gottaReleaseEmAll" after the async stuff is done.*</sub>
