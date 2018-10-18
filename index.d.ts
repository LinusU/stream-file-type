import { Duplex } from 'stream'

declare class FileType extends Duplex {
  fileTypePromise(): Promise<FileType.FileTypeResult>

  addListener(event: 'file-type', listener: (fileType: FileType.FileTypeResult) => void): this
  on(event: 'file-type', listener: (fileType: FileType.FileTypeResult) => void): this
  once(event: 'file-type', listener: (fileType: FileType.FileTypeResult) => void): this
}

declare namespace FileType {
  interface FileTypeResult {
    ext: string
    mime: string
  }
}

export = FileType
