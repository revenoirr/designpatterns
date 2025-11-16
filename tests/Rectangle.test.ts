// tests/Rectangle.test.ts

import { Point } from '../src/entities/Point';
import { Rectangle } from '../src/entities/Rectangle';
import { RectangleFactory } from '../src/factories/RectangleFactory';
import { RectangleService } from '../src/services/RectangleService';
import { RectangleValidator } from '../src/validators/RectangleValidator';
import { ValidationException } from '../src/exceptions/ValidationException';

describe('Rectangle Tests', () => {
  describe('Point class', () => {
    it('должен создавать точку с заданными координатами', () => {
      const point = new Point(1, 2, 3);

      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
      expect(point.z).toBe(3);
    });

    it('должен создавать 2D точку (z=0 по умолчанию)', () => {
      const point = new Point(5, 10);

      expect(point.x).toBe(5);
      expect(point.y).toBe(10);
      expect(point.z).toBe(0);
    });

    it('должен корректно сравнивать точки', () => {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 2);
      const point3 = new Point(1, 3);

      expect(point1.equals(point2)).toBe(true);
      expect(point1.equals(point3)).toBe(false);
    });
  });

  describe('RectangleValidator', () => {
    it('должен валидировать корректную строку', () => {
      const validString = '0 0 4 0 4 3 0 3';

      expect(() => RectangleValidator.validateInputString(validString)).not.toThrow();
    });

    it('должен отклонять строку с недопустимым символом', () => {
      const invalidString = '2a.0 0 4 0 4 3 0 3';

      expect(() => RectangleValidator.validateInputString(invalidString))
        .toThrow(ValidationException);
      expect(() => RectangleValidator.validateInputString(invalidString))
        .toThrow('Invalid character in number');
    });

    it('должен отклонять строку с недостаточным количеством координат', () => {
      const invalidString = '0 0 4 0';

      expect(() => RectangleValidator.validateInputString(invalidString))
        .toThrow(ValidationException);
      expect(() => RectangleValidator.validateInputString(invalidString))
        .toThrow('Invalid coordinate count');
    });

    it('должен проверять, что три точки не лежат на одной прямой', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(1, 1);
      const p3 = new Point(2, 2);
      const p4 = new Point(0, 1);

      expect(RectangleValidator.areNotCollinear(p1, p2, p3)).toBe(false);
      expect(RectangleValidator.areNotCollinear(p1, p2, p4)).toBe(true);
    });

    it('должен проверять, что четыре точки образуют прямоугольник', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(4, 0);
      const p3 = new Point(4, 3);
      const p4 = new Point(0, 3);

      expect(RectangleValidator.isRectangle(p1, p2, p3, p4)).toBe(true);
    });

    it('должен отклонять четыре точки, не образующие прямоугольник', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(1, 0);
      const p3 = new Point(2, 1);
      const p4 = new Point(0, 2);

      expect(RectangleValidator.isRectangle(p1, p2, p3, p4)).toBe(false);
    });
  });

  describe('RectangleFactory', () => {
    let rectangleFactory: RectangleFactory;

    beforeEach(() => {
      rectangleFactory = new RectangleFactory();
    });

    it('должен создавать прямоугольник из валидных точек', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(4, 0);
      const p3 = new Point(4, 3);
      const p4 = new Point(0, 3);

      const rectangle = rectangleFactory.createShape('rect1', p1, p2, p3, p4);

      expect(rectangle).toBeInstanceOf(Rectangle);
      expect(rectangle.id).toBe('rect1');
      expect(rectangle.point1.equals(p1)).toBe(true);
    });

    it('должен создавать прямоугольник из строки', () => {
      const validString = '0 0 4 0 4 3 0 3';

      const shape = rectangleFactory.createFromString('rect2', validString);

      expect(shape).not.toBeNull();
      expect(shape).toBeInstanceOf(Rectangle);
      if (shape) {
        expect(shape.id).toBe('rect2');
      }
    });

    it('должен возвращать null для невалидной строки', () => {
      const invalidString = '2a.0 0 4 0 4 3 0 3';

      const rectangle = rectangleFactory.createFromString('rect3', invalidString);

      expect(rectangle).toBeNull();
    });

    it('должен выбрасывать исключение для точек, не образующих прямоугольник', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(1, 0);
      const p3 = new Point(2, 1);
      const p4 = new Point(0, 2);

      expect(() => rectangleFactory.createShape('rect4', p1, p2, p3, p4))
        .toThrow(ValidationException);
    });
  });

  describe('RectangleService', () => {
    let rectangle: Rectangle;

    beforeEach(() => {
      const p1 = new Point(0, 0);
      const p2 = new Point(4, 0);
      const p3 = new Point(4, 3);
      const p4 = new Point(0, 3);
      rectangle = new Rectangle('test', p1, p2, p3, p4);
    });

    it('должен вычислять площадь прямоугольника', () => {
      const area = RectangleService.calculateArea(rectangle);

      expect(area).toBe(12);
      expect(typeof area).toBe('number');
    });

    it('должен вычислять периметр прямоугольника', () => {
      const perimeter = RectangleService.calculatePerimeter(rectangle);

      expect(perimeter).toBe(14);
      expect(typeof perimeter).toBe('number');
    });

    it('должен определять квадрат', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(5, 0);
      const p3 = new Point(5, 5);
      const p4 = new Point(0, 5);
      const square = new Rectangle('square', p1, p2, p3, p4);

      expect(RectangleService.isSquare(square)).toBe(true);
      expect(RectangleService.isSquare(rectangle)).toBe(false);
    });

    it('должен определять ромб', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(3, 0);
      const p3 = new Point(3, 3);
      const p4 = new Point(0, 3);
      const rhombus = new Rectangle('rhombus', p1, p2, p3, p4);

      expect(RectangleService.isRhombus(rhombus)).toBe(true);
    });

    it('должен определять выпуклый четырехугольник', () => {
      const isConvex = RectangleService.isConvex(rectangle);

      expect(isConvex).toBe(true);
      expect(typeof isConvex).toBe('boolean');
    });

    it('должен определять трапецию', () => {
      const isTrapezoid = RectangleService.isTrapezoid(rectangle);

      expect(isTrapezoid).toBe(true);
      expect(typeof isTrapezoid).toBe('boolean');
    });
  });
});
