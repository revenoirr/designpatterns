// src/repository/specifications/ShapeSpecifications.ts

import { CompositeSpecification } from './Specification';
import { Shape } from '../../entities/Shape';
import { Rectangle } from '../../entities/Rectangle';
import { Tetrahedron } from '../../entities/Tetrahedron';
import { Point } from '../../entities/Point';
import { Warehouse } from '../../warehouse/Warehouse';

/**
 * Поиск по ID
 */
export class IdSpecification extends CompositeSpecification<Shape> {
  constructor(private id: string) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    return shape.id === this.id;
  }
}

/**
 * Поиск по имени (содержит подстроку)
 */
export class NameContainsSpecification extends CompositeSpecification<Shape> {
  constructor(private name: string) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    return shape.id.toLowerCase().includes(this.name.toLowerCase());
  }
}

/**
 * Поиск фигур в первом квадранте (все точки имеют x > 0, y > 0)
 */
export class FirstQuadrantSpecification extends CompositeSpecification<Shape> {
  isSatisfiedBy(shape: Shape): boolean {
    const points = this.getPoints(shape);
    return points.every((p) => p.x >= 0 && p.y >= 0);
  }

  private getPoints(shape: Shape): Point[] {
    if (shape instanceof Rectangle) {
      return shape.getPoints();
    }
    if (shape instanceof Tetrahedron) {
      return shape.getVertices();
    }
    return [];
  }
}

/**
 * Поиск по площади в диапазоне
 */
export class AreaRangeSpecification extends CompositeSpecification<Shape> {
  constructor(
    private minArea: number,
    private maxArea: number,
  ) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    const warehouse = Warehouse.getInstance();
    const metrics = warehouse.getMetrics(shape.id);

    if (!metrics || metrics.area === undefined) {
      return false;
    }

    return metrics.area >= this.minArea && metrics.area <= this.maxArea;
  }
}

/**
 * Поиск по объему в диапазоне
 */
export class VolumeRangeSpecification extends CompositeSpecification<Shape> {
  constructor(
    private minVolume: number,
    private maxVolume: number,
  ) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    const warehouse = Warehouse.getInstance();
    const metrics = warehouse.getMetrics(shape.id);

    if (!metrics || metrics.volume === undefined) {
      return false;
    }

    return metrics.volume >= this.minVolume && metrics.volume <= this.maxVolume;
  }
}

/**
 * Поиск по периметру в диапазоне
 */
export class PerimeterRangeSpecification extends CompositeSpecification<Shape> {
  constructor(
    private minPerimeter: number,
    private maxPerimeter: number,
  ) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    const warehouse = Warehouse.getInstance();
    const metrics = warehouse.getMetrics(shape.id);

    if (!metrics || metrics.perimeter === undefined) {
      return false;
    }

    return metrics.perimeter >= this.minPerimeter && metrics.perimeter <= this.maxPerimeter;
  }
}

/**
 * Поиск фигур на расстоянии от начала координат
 */
export class DistanceFromOriginSpecification extends CompositeSpecification<Shape> {
  constructor(
    private minDistance: number,
    private maxDistance: number,
  ) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    const points = this.getPoints(shape);

    // Проверяем, что хотя бы одна точка в диапазоне
    return points.some((p) => {
      const distance = Math.sqrt(p.x ** 2 + p.y ** 2 + p.z ** 2);
      return distance >= this.minDistance && distance <= this.maxDistance;
    });
  }

  private getPoints(shape: Shape): Point[] {
    if (shape instanceof Rectangle) {
      return shape.getPoints();
    }
    if (shape instanceof Tetrahedron) {
      return shape.getVertices();
    }
    return [];
  }
}

/**
 * Поиск по типу фигуры
 */
export class ShapeTypeSpecification<T extends Shape = Shape> extends CompositeSpecification<Shape> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private shapeType: new (...args: any[]) => T) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    return shape instanceof this.shapeType;
  }
}

/**
 * Поиск по координате X первой точки
 */
export class FirstPointXSpecification extends CompositeSpecification<Shape> {
  constructor(
    private minX: number,
    private maxX: number,
  ) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    const points = this.getPoints(shape);
    if (points.length === 0) {
      return false;
    }

    const x = points[0].x;
    return x >= this.minX && x <= this.maxX;
  }

  private getPoints(shape: Shape): Point[] {
    if (shape instanceof Rectangle) {
      return shape.getPoints();
    }
    if (shape instanceof Tetrahedron) {
      return shape.getVertices();
    }
    return [];
  }
}

/**
 * Поиск по coordinate Y первой точки
 */
export class FirstPointYSpecification extends CompositeSpecification<Shape> {
  constructor(
    private minY: number,
    private maxY: number,
  ) {
    super();
  }

  isSatisfiedBy(shape: Shape): boolean {
    const points = this.getPoints(shape);
    if (points.length === 0) {
      return false;
    }

    const y = points[0].y;
    return y >= this.minY && y <= this.maxY;
  }

  private getPoints(shape: Shape): Point[] {
    if (shape instanceof Rectangle) {
      return shape.getPoints();
    }
    if (shape instanceof Tetrahedron) {
      return shape.getVertices();
    }
    return [];
  }
}
