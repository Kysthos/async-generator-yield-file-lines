const { pipeline } = require('stream')
const { createReadStream } = require('fs')
const split = require('split2')

module.exports = async function* (pathToFile) {
    const lines = split()
    pipeline(
        createReadStream(pathToFile),
        lines,
        err => {
            if (err) throw err
        }
    )
    yield* lines
}