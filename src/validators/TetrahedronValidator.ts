import { Point } from '../entities/Point';
import { ValidationException } from '../exceptions/ValidationException';

export class TetrahedronValidator {
  private static readonly NUMBER_PATTERN = /^-?\d+\.?\d*$/;
  private static readonly MIN_VERTICES = 4;
  private static readonly COORDINATES_PER_VERTEX = 3;

  static validateInputString(input: string): boolean {
    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
      throw new ValidationException('Empty string');
    }

    const parts = trimmedInput.split(/\s+/);
    const expectedCount = this.MIN_VERTICES * this.COORDINATES_PER_VERTEX;

    if (parts.length !== expectedCount) {
      throw new ValidationException(
        `Invalid coordinate count: expected ${expectedCount}, got ${parts.length}`,
      );
    }

    for (const part of parts) {
      if (!this.NUMBER_PATTERN.test(part)) {
        throw new ValidationException(`Invalid character in number: ${part}`);
      }
    }

    return true;
  }

  static isTetrahedron(v1: Point, v2: Point, v3: Point, v4: Point): boolean {
    const EPSILON = 1e-10;
    const volume = Math.abs(this.calculateVolume(v1, v2, v3, v4));
    return volume > EPSILON;
  }

  static calculateVolume(v1: Point, v2: Point, v3: Point, v4: Point): number {
    const ax = v2.x - v1.x;
    const ay = v2.y - v1.y;
    const az = v2.z - v1.z;

    const bx = v3.x - v1.x;
    const by = v3.y - v1.y;
    const bz = v3.z - v1.z;

    const cx = v4.x - v1.x;
    const cy = v4.y - v1.y;
    const cz = v4.z - v1.z;

    const scalarTripleProduct
      = ax * (by * cz - bz * cy)
      - ay * (bx * cz - bz * cx)
      + az * (bx * cy - by * cx);

    return Math.abs(scalarTripleProduct) / 6;
  }
}
