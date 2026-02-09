import { Point } from '../entities/Point';
import { ValidationException } from '../exceptions/ValidationException';

export class RectangleValidator {
  private static readonly NUMBER_PATTERN = /^-?\d+\.?\d*$/;
  private static readonly MIN_POINTS = 4;
  private static readonly COORDINATES_PER_POINT = 2;

  static validateInputString(input: string): boolean {
    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
      throw new ValidationException('Empty string');
    }

    const parts = trimmedInput.split(/\s+/);
    const expectedCount = this.MIN_POINTS * this.COORDINATES_PER_POINT;

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

  static areNotCollinear(p1: Point, p2: Point, p3: Point): boolean {
    const EPSILON = 1e-10;
    const crossProduct
      = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
    return Math.abs(crossProduct) > EPSILON;
  }

  static isRectangle(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    if (!this.areNotCollinear(p1, p2, p3)) {
      return false;
    }
    if (!this.areNotCollinear(p1, p2, p4)) {
      return false;
    }
    if (!this.areNotCollinear(p1, p3, p4)) {
      return false;
    }
    if (!this.areNotCollinear(p2, p3, p4)) {
      return false;
    }

    const sides = [
      this.distance(p1, p2),
      this.distance(p2, p3),
      this.distance(p3, p4),
      this.distance(p4, p1),
      this.distance(p1, p3),
      this.distance(p2, p4),
    ];

    sides.sort((a, b) => a - b);

    const EPSILON = 1e-10;

    return (
      Math.abs(sides[0] - sides[1]) < EPSILON
      && Math.abs(sides[2] - sides[3]) < EPSILON
      && Math.abs(sides[4] - sides[5]) < EPSILON
    );
  }

  private static distance(p1: Point, p2: Point): number {
    return Math.sqrt(
      (p2.x - p1.x)**2 + (p2.y - p1.y)**2,
    );
  }
}
