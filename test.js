/* eslint-env mocha */

const fs = require('fs')
const assert = require('assert')
const hasha = require('hasha')

const FileType = require('./')

describe('stream-file-type', () => {
  it('should detect the file type of a stream', () => {
    const input = fs.createReadStream('fixture/fixture.mid')
    const detector = new FileType()

    input.pipe(detector).resume()

    let emitted
    detector.on('file-type', fileType => { emitted = fileType })

    return detector.fileTypePromise()
      .then(type => assert.deepStrictEqual(type, { ext: 'mid', mime: 'audio/midi' }))
      .then(() => assert.deepStrictEqual(emitted, { ext: 'mid', mime: 'audio/midi' }))
  })

  it('should pass the input as-is', () => {
    const input = fs.createReadStream('fixture/fixture.mid')
    const detector = new FileType()

    return hasha.fromStream(input.pipe(detector), { algorithm: 'sha1' })
      .then(hash => assert.strictEqual(hash, '02cd79ed1d5f07eef736f79122aa89e6fe4f0d4b'))
  })

  it('should handle files larger than 4100 bytes', () => {
    const input = fs.createReadStream('fixture/fixture-otto.woff2')
    const detector = new FileType()

    input.pipe(detector).resume()

    let emitted
    detector.on('file-type', fileType => { emitted = fileType })

    return detector.fileTypePromise()
      .then(type => assert.deepStrictEqual(type, { ext: 'woff2', mime: 'font/woff2' }))
      .then(() => assert.deepStrictEqual(emitted, { ext: 'woff2', mime: 'font/woff2' }))
  })

  it('should handle files with undefined file type', () => {
    const input = fs.createReadStream('fixture/test.invalidf')
    const detector = new FileType()

    input.pipe(detector).resume()

    let emitted
    detector.on('file-type', fileType => { emitted = fileType })

    return detector.fileTypePromise()
      .then(type => assert.deepStrictEqual(type, undefined))
      .then(() => assert.deepStrictEqual(emitted, undefined))
  })
})
