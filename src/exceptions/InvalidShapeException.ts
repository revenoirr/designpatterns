export class InvalidShapeException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidShapeException';
    Object.setPrototypeOf(this, InvalidShapeException.prototype);
  }
}
