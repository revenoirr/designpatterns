import { Rectangle } from '../entities/Rectangle';
import { Point } from '../entities/Point';


export class RectangleService {

  static calculateArea(rectangle: Rectangle): number {
    const points = rectangle.getPoints();

    const side1 = this.distance(points[0], points[1]);
    const side2 = this.distance(points[1], points[2]);

    return side1 * side2;
  }

  static calculatePerimeter(rectangle: Rectangle): number {
    const points = rectangle.getPoints();

    const side1 = this.distance(points[0], points[1]);
    const side2 = this.distance(points[1], points[2]);

    return 2 * (side1 + side2);
  }

  static isConvex(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();

    let sign = 0;

    for (let i = 0; i < 4; i += 1) {
      const p1 = points[i];
      const p2 = points[(i + 1) % 4];
      const p3 = points[(i + 2) % 4];

      const crossProduct = this.crossProduct(p1, p2, p3);

      if (Math.abs(crossProduct) < 1e-10) {
        continue;
      }

      const currentSign = Math.sign(crossProduct);

      if (sign === 0) {
        sign = currentSign;
      } else if (sign !== currentSign) {
        return false;
      }
    }

    return true;
  }

  static isSquare(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    const EPSILON = 1e-10;

    const side1 = this.distance(points[0], points[1]);
    const side2 = this.distance(points[1], points[2]);

    return Math.abs(side1 - side2) < EPSILON;
  }

  static isRhombus(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    const EPSILON = 1e-10;

    const side1 = this.distance(points[0], points[1]);
    const side2 = this.distance(points[1], points[2]);
    const side3 = this.distance(points[2], points[3]);
    const side4 = this.distance(points[3], points[0]);

    return (
      Math.abs(side1 - side2) < EPSILON
      && Math.abs(side2 - side3) < EPSILON
      && Math.abs(side3 - side4) < EPSILON
    );
  }

  static isTrapezoid(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();

    const parallel1 = this.areParallel(points[0], points[1], points[2], points[3]);
    const parallel2 = this.areParallel(points[1], points[2], points[3], points[0]);

    return parallel1 || parallel2;
  }

  private static distance(p1: Point, p2: Point): number {
    return Math.sqrt(
      (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2,
    );
  }

  private static crossProduct(p1: Point, p2: Point, p3: Point): number {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
  }

  private static areParallel(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    const EPSILON = 1e-10;

    const dx1 = p2.x - p1.x;
    const dy1 = p2.y - p1.y;
    const dx2 = p4.x - p3.x;
    const dy2 = p4.y - p3.y;

    const crossProduct = dx1 * dy2 - dy1 * dx2;

    return Math.abs(crossProduct) < EPSILON;
  }
}
