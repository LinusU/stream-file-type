/* eslint-env mocha */

import assert from 'node:assert'
import fs from 'node:fs'
import hasha from 'hasha'

import FileType from './index.js'

describe('stream-file-type', () => {
  it('should detect the file type of a stream', async () => {
    const input = fs.createReadStream('fixture/fixture.mid')
    const detector = new FileType()

    input.pipe(detector).resume()

    let emitted
    detector.on('file-type', fileType => { emitted = fileType })

    const type = await detector.fileTypePromise()

    assert.deepStrictEqual(type, { ext: 'mid', mime: 'audio/midi' })
    assert.deepStrictEqual(emitted, { ext: 'mid', mime: 'audio/midi' })
  })

  it('should pass the input as-is', async () => {
    const input = fs.createReadStream('fixture/fixture.mid')
    const detector = new FileType()

    const hash = await hasha.fromStream(input.pipe(detector), { algorithm: 'sha1' })

    assert.strictEqual(hash, '02cd79ed1d5f07eef736f79122aa89e6fe4f0d4b')
  })

  it('should handle files larger than 4100 bytes', async () => {
    const input = fs.createReadStream('fixture/fixture-otto.woff2')
    const detector = new FileType()

    input.pipe(detector).resume()

    let emitted
    detector.on('file-type', fileType => { emitted = fileType })

    const type = await detector.fileTypePromise()

    assert.deepStrictEqual(type, { ext: 'woff2', mime: 'font/woff2' })
    assert.deepStrictEqual(emitted, { ext: 'woff2', mime: 'font/woff2' })
  })

  it('should handle files with unknown file type', async () => {
    const input = fs.createReadStream('fixture/test.invalidf')
    const detector = new FileType()

    input.pipe(detector).resume()

    let emitted
    detector.on('file-type', fileType => { emitted = fileType })

    const type = await detector.fileTypePromise()

    assert.strictEqual(type, null)
    assert.strictEqual(emitted, null)
  })
})
