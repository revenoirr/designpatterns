export class Point {
  private readonly _x: number;
  private readonly _y: number;
  private readonly _z: number;

  constructor(x: number, y: number, z: number = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get z(): number {
    return this._z;
  }

  equals(other: Point): boolean {
    const EPSILON = 1e-10;
    return (
      Math.abs(this._x - other._x) < EPSILON
      && Math.abs(this._y - other._y) < EPSILON
      && Math.abs(this._z - other._z) < EPSILON
    );
  }

  toString(): string {
    return `Point(${this._x}, ${this._y}, ${this._z})`;
  }
}
