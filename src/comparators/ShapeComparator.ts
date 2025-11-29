// src/comparators/ShapeComparator.ts

import { Shape } from '../entities/Shape';
import { Rectangle } from '../entities/Rectangle';
import { Tetrahedron } from '../entities/Tetrahedron';
import { Point } from '../entities/Point';
import { Warehouse } from '../warehouse/Warehouse';

/**
 * Интерфейс компаратора
 */
export interface Comparator<T> {
  compare(a: T, b: T): number;
}

/**
 * Сортировка по ID
 */
export class IdComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.id.localeCompare(b.id);
  }
}

/**
 * Сортировка по ID (обратный порядок)
 */
export class IdComparatorReverse implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return b.id.localeCompare(a.id);
  }
}

/**
 * Сортировка по координате X первой точки
 */
export class FirstPointXComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const xA = this.getFirstPointX(a);
    const xB = this.getFirstPointX(b);
    return xA - xB;
  }

  private getFirstPointX(shape: Shape): number {
    const points = this.getPoints(shape);
    return points.length > 0 ? points[0].x : 0;
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
 * Сортировка по координате Y первой точки
 */
export class FirstPointYComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const yA = this.getFirstPointY(a);
    const yB = this.getFirstPointY(b);
    return yA - yB;
  }

  private getFirstPointY(shape: Shape): number {
    const points = this.getPoints(shape);
    return points.length > 0 ? points[0].y : 0;
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
 * Сортировка по координате Z первой точки
 */
export class FirstPointZComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const zA = this.getFirstPointZ(a);
    const zB = this.getFirstPointZ(b);
    return zA - zB;
  }

  private getFirstPointZ(shape: Shape): number {
    const points = this.getPoints(shape);
    return points.length > 0 ? points[0].z : 0;
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
 * Сортировка по площади
 */
export class AreaComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const warehouse = Warehouse.getInstance();

    const metricsA = warehouse.getMetrics(a.id);
    const metricsB = warehouse.getMetrics(b.id);

    const areaA = metricsA?.area ?? 0;
    const areaB = metricsB?.area ?? 0;

    return areaA - areaB;
  }
}

/**
 * Сортировка по периметру
 */
export class PerimeterComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const warehouse = Warehouse.getInstance();

    const metricsA = warehouse.getMetrics(a.id);
    const metricsB = warehouse.getMetrics(b.id);

    const perimeterA = metricsA?.perimeter ?? 0;
    const perimeterB = metricsB?.perimeter ?? 0;

    return perimeterA - perimeterB;
  }
}

/**
 * Сортировка по объему
 */
export class VolumeComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const warehouse = Warehouse.getInstance();

    const metricsA = warehouse.getMetrics(a.id);
    const metricsB = warehouse.getMetrics(b.id);

    const volumeA = metricsA?.volume ?? 0;
    const volumeB = metricsB?.volume ?? 0;

    return volumeA - volumeB;
  }
}

/**
 * Утилита для сортировки массива фигур
 */
export class ShapeSorter {
  static sort(shapes: Shape[], comparator: Comparator<Shape>): Shape[] {
    return [...shapes].sort((a, b) => comparator.compare(a, b));
  }
}
