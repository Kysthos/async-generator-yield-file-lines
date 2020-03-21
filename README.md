Just testing some stream async iterators.

## getLines(path)
- `path` \<String> path to file
- returns an async generator

A simple async iterator that allows to loop through each line of a file at a time.

Example usage:

```js
const getLines = require('../index')

main()

async function main() {
  for await (const line of getLines('example/example.txt')) {
    console.log(line)
  }
}

// A więc rozlej się za mną, morze zapomnienia...
// A więc opłyń mnie wkoło wodami cichemi...
// Niechaj nikt nigdy, w żadnym zakątku tej ziemi
// Nie szuka okiem mego znikomego cienia!

```
