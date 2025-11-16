// src/entities/Rectangle.ts

import { Point } from './Point';
import { Shape } from './Shape';

/**
 * Класс, представляющий прямоугольник (4 точки в 2D пространстве)
 * Entity-класс без бизнес-логики
 */
export class Rectangle extends Shape {
  private readonly _point1: Point;
  private readonly _point2: Point;
  private readonly _point3: Point;
  private readonly _point4: Point;

  constructor(id: string, point1: Point, point2: Point, point3: Point, point4: Point) {
    super(id);
    this._point1 = point1;
    this._point2 = point2;
    this._point3 = point3;
    this._point4 = point4;
  }

  get point1(): Point {
    return this._point1;
  }

  get point2(): Point {
    return this._point2;
  }

  get point3(): Point {
    return this._point3;
  }

  get point4(): Point {
    return this._point4;
  }

  getPoints(): Point[] {
    return [this._point1, this._point2, this._point3, this._point4];
  }

  toString(): string {
    return `Rectangle[${this.id}]: ${this._point1.toString()}, ${this._point2.toString()}, ${this._point3.toString()},
     ${this._point4.toString()}`;
  }
}
