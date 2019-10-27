const fileType = require('file-type')
const { Transform } = require('readable-stream')

const kChunks = Symbol('chunks')
const kLength = Symbol('length')
const kDone = Symbol('done')
const kResult = Symbol('result')
const kEmitFileType = Symbol('emit-file-type')

const TARGET_BYTES = 4100

class FileType extends Transform {
  constructor () {
    super()

    this[kChunks] = []
    this[kLength] = 0
    this[kDone] = false
    this[kResult] = null
  }

  fileTypePromise () {
    return new Promise((resolve, reject) => {
      if (this[kDone]) return resolve(this[kResult])

      this.once('error', reject)
      this.once('file-type', resolve)
    })
  }

  [kEmitFileType] () {
    this[kDone] = true
    this[kResult] = fileType(Buffer.concat(this[kChunks]))

    this.emit('file-type', this[kResult] || null)

    delete this[kChunks]
    delete this[kLength]
  }

  _transform (chunk, _, cb) {
    if (!this[kDone]) {
      this[kChunks].push(chunk)
      this[kLength] += chunk.length

      if (this[kLength] >= TARGET_BYTES) {
        this[kEmitFileType]()
      }
    }

    cb(null, chunk)
  }

  _flush (cb) {
    if (!this[kDone]) {
      this[kEmitFileType]()
    }

    cb(null)
  }
}

module.exports = FileType
