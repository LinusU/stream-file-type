import { Duplex, Readable } from 'stream'

declare class FileType extends Duplex {
  fileTypePromise(): Promise<FileType.FileTypeResult | null>

  addListener(event: 'close', listener: () => void): this
  addListener(event: 'data', listener: (chunk: any) => void): this
  addListener(event: 'drain', listener: () => void): this
  addListener(event: 'end', listener: () => void): this
  addListener(event: 'error', listener: (err: Error) => void): this
  addListener(event: 'file-type', listener: (fileType: FileType.FileTypeResult | null) => void): this
  addListener(event: 'finish', listener: () => void): this
  addListener(event: 'pipe', listener: (src: Readable) => void): this
  addListener(event: 'readable', listener: () => void): this
  addListener(event: 'unpipe', listener: (src: Readable) => void): this
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;

  on(event: 'close', listener: () => void): this
  on(event: 'data', listener: (chunk: any) => void): this
  on(event: 'drain', listener: () => void): this
  on(event: 'end', listener: () => void): this
  on(event: 'error', listener: (err: Error) => void): this
  on(event: 'file-type', listener: (fileType: FileType.FileTypeResult | null) => void): this
  on(event: 'finish', listener: () => void): this
  on(event: 'pipe', listener: (src: Readable) => void): this
  on(event: 'readable', listener: () => void): this
  on(event: 'unpipe', listener: (src: Readable) => void): this
  on(event: string | symbol, listener: (...args: any[]) => void): this;

  once(event: 'close', listener: () => void): this
  once(event: 'data', listener: (chunk: any) => void): this
  once(event: 'drain', listener: () => void): this
  once(event: 'end', listener: () => void): this
  once(event: 'error', listener: (err: Error) => void): this
  once(event: 'file-type', listener: (fileType: FileType.FileTypeResult | null) => void): this
  once(event: 'finish', listener: () => void): this
  once(event: 'pipe', listener: (src: Readable) => void): this
  once(event: 'readable', listener: () => void): this
  once(event: 'unpipe', listener: (src: Readable) => void): this
  once(event: string | symbol, listener: (...args: any[]) => void): this;
}

declare namespace FileType {
  interface FileTypeResult {
    ext: string
    mime: string
  }
}

export = FileType
