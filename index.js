import { PassThrough, Transform } from 'node:stream'
import fileType from 'file-type'

const kResult = Symbol('result')
const kStream = Symbol('stream')

export default class FileType extends Transform {
  constructor () {
    super()

    this[kStream] = new PassThrough()

    this[kResult] = fileType.fromStream(this[kStream]).then(
      (value) => {
        this[kStream] = null
        this.emit('file-type', value || null)
        return value || null
      },
      () => {
        this[kStream] = null
        this.emit('file-type', null)
        return null
      }
    )
  }

  fileTypePromise () {
    return this[kResult]
  }

  _transform (chunk, _, cb) {
    if (this[kStream] != null) {
      this[kStream].write(chunk)
    }

    cb(null, chunk)
  }

  _flush (cb) {
    if (this[kStream] != null) {
      this[kStream].end(() => cb(null))
    } else {
      cb(null)
    }
  }
}
