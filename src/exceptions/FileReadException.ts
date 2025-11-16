export class FileReadException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileReadException';
    Object.setPrototypeOf(this, FileReadException.prototype);
  }
}
