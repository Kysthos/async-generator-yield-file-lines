const getLines = require('../index')

main()

async function main() {
  for await (const line of getLines('example/example.txt')) {
    console.log(line)
  }
}