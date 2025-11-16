import { ShapeFactory } from './ShapeFactory';
import { Rectangle } from '../entities/Rectangle';
import { Point } from '../entities/Point';
import { RectangleValidator } from '../validators/RectangleValidator';
import { ValidationException } from '../exceptions/ValidationException';
import { logger } from '../utils/Logger';

export class RectangleFactory extends ShapeFactory {
  createShape(
    id: string,
    point1: Point,
    point2: Point,
    point3: Point,
    point4: Point,
  ): Rectangle {
    if (!RectangleValidator.isRectangle(point1, point2, point3, point4)) {
      throw new ValidationException('Points do not form a rectangle');
    }

    return new Rectangle(id, point1, point2, point3, point4);
  }

  protected parseAndCreate(id: string, input: string): Rectangle {
    try {
      RectangleValidator.validateInputString(input);

      const numbers = input.trim().split(/\s+/).map(Number);

      const point1 = new Point(numbers[0], numbers[1]);
      const point2 = new Point(numbers[2], numbers[3]);
      const point3 = new Point(numbers[4], numbers[5]);
      const point4 = new Point(numbers[6], numbers[7]);

      return this.createShape(id, point1, point2, point3, point4);
    } catch (error) {
      if (error instanceof Error) {
        logger.warn(`Failed to create rectangle: ${error.message}`);
      }
      throw error;
    }
  }
}
