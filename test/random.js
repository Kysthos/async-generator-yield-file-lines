const { promises: fs, createWriteStream } = require('fs')
const { promisify } = require('util')
const { join } = require('path')
const os = require('os')
const { pipeline, Readable } = require('stream')
const pump = promisify(pipeline)
const chance = new require('chance')()

module.exports = async function (paragraphNumber = 100) {
  const folder = await fs.mkdtemp(join(os.tmpdir(), 'generator-test-'))
  const path = join(folder, 'random-text')
  const paragraphs = []
  let characters = 0

  function* getParagraphs() {
    for (let i = 0; i < paragraphNumber; i++)
      yield chance.paragraph()
  }
  async function* passthrough (source) {
    for await (const p of source) {
      paragraphs.push(p)
      characters += p.length
      yield p + '\n'
    }
  }

  await pump(
    Readable.from(getParagraphs()),
    passthrough,
    createWriteStream(path)
  )

  return {
    paragraphs,
    path,
    characters,
    folder
  }
}

