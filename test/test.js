const createRandomFile = require('./random')
const getLines = require('../index')
const assert = require('assert').strict;
const PARAGRAPHS = 10000
const rimraf = require('rimraf')


let fileInfo
const yieldedParagraphs = []

test()
  .then(ret => run())

async function test() {
  fileInfo = await createRandomFile(PARAGRAPHS)
  console.log(`Created a new test file in ${fileInfo.path}.`)
  console.log(`Paragraphs: ${fileInfo.paragraphs.length}. Characters: ${fileInfo.characters}.`)
  for await (const line of getLines(fileInfo.path)) {
    yieldedParagraphs.push(line)
  }

  describe('Running tests', () => {

    after('delete tmp folder', function (done) {
      rimraf(fileInfo.folder, err => {
        if (err) console.error(err)
        else console.log(`\n${fileInfo.folder} deleted successfully!`)
        done()
      })
    })

    it(`Should yield ${yieldedParagraphs.length} paragraphs.`, () => {
      assert.strictEqual(fileInfo.paragraphs.length, yieldedParagraphs.length)
    })

    it(`Paragraphs should be the same`, () => {
      for (let i = 0; i < yieldedParagraphs.length; i++)
        assert.strictEqual(fileInfo.paragraphs[i], yieldedParagraphs[i])
    })
  })
}