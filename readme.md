# Stream File Type

Get the [file type](https://github.com/sindresorhus/file-type) by inspecting a stream.

## Usage

```js
const fs = require('fs')
const FileType = require('stream-file-type')

const input = fs.createReadStream('cat.jpg')
const detector = new FileType()

// Listen for event...
detector.on('file-type', (fileType) => {
  if (fileType === null) {
    console.log(`The mime type of "cat.jpg" could not be determined`)
  } else {
    console.log(`The file "cat.jpg" has the "${fileType.mime}" mime type`)
  }
})

// ...or get a Promise
detector.fileTypePromise().then((fileType) => {
  if (fileType === null) {
    console.log(`The mime type of "cat.jpg" could not be determined`)
  } else {
    console.log(`The file "cat.jpg" has the "${fileType.mime}" mime type`)
  }
})

input.pipe(detector).resume()
```

## API

### `new FileType() => DuplexStream`

Returns a new `DuplexStream` that will detect the file type of the content passing thru. All the data is passed as-is right thru the stream, and can be further piped to another destination.

When enough bytes have come thru to determine the file type (currently 4100) the event `file-type` will be emitted with the result of the detection. The result will either be `null` or an object with `ext` and `mime`.

- `ext` - One of the [supported file types](https://github.com/sindresorhus/file-type#supported-file-types)
- `mime` - The [MIME type](http://en.wikipedia.org/wiki/Internet_media_type)

### `FileType#fileTypePromise() => Promise`

Returns a `Promise` of the detected file type. If the `file-type` event has already been emitted, the promise will be resolved with the result, otherwise the promise will be resolved when the file-type is detected, or rejected if an error occurs.
