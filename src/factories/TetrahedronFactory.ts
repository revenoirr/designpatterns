import { ShapeFactory } from './ShapeFactory';
import { Tetrahedron } from '../entities/Tetrahedron';
import { Point } from '../entities/Point';
import { TetrahedronValidator } from '../validators/TetrahedronValidator';
import { ValidationException } from '../exceptions/ValidationException';
import { logger } from '../utils/Logger';

export class TetrahedronFactory extends ShapeFactory {
  createShape(
    id: string,
    vertex1: Point,
    vertex2: Point,
    vertex3: Point,
    vertex4: Point,
  ): Tetrahedron {
    if (!TetrahedronValidator.isTetrahedron(vertex1, vertex2, vertex3, vertex4)) {
      throw new ValidationException('Points do not form a tetrahedron');
    }

    return new Tetrahedron(id, vertex1, vertex2, vertex3, vertex4);
  }

  protected parseAndCreate(id: string, input: string): Tetrahedron {
    try {
      TetrahedronValidator.validateInputString(input);

      const numbers = input.trim().split(/\s+/).map(Number);

      const vertex1 = new Point(numbers[0], numbers[1], numbers[2]);
      const vertex2 = new Point(numbers[3], numbers[4], numbers[5]);
      const vertex3 = new Point(numbers[6], numbers[7], numbers[8]);
      const vertex4 = new Point(numbers[9], numbers[10], numbers[11]);

      return this.createShape(id, vertex1, vertex2, vertex3, vertex4);
    } catch (error) {
      if (error instanceof Error) {
        logger.warn(`Failed to create tetrahedron: ${error.message}`);
      }
      throw error;
    }
  }
}
