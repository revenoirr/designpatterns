// src/entities/Tetrahedron.ts

import { Point } from './Point';
import { Shape } from './Shape';

/**
 * Класс, представляющий тетраэдр (4 точки в 3D пространстве)
 * Entity-класс без бизнес-логики
 */
export class Tetrahedron extends Shape {
  private readonly _vertex1: Point;
  private readonly _vertex2: Point;
  private readonly _vertex3: Point;
  private readonly _vertex4: Point;

  constructor(
    id: string,
    vertex1: Point,
    vertex2: Point,
    vertex3: Point,
    vertex4: Point,
  ) {
    super(id);
    this._vertex1 = vertex1;
    this._vertex2 = vertex2;
    this._vertex3 = vertex3;
    this._vertex4 = vertex4;
  }

  get vertex1(): Point {
    return this._vertex1;
  }

  get vertex2(): Point {
    return this._vertex2;
  }

  get vertex3(): Point {
    return this._vertex3;
  }

  get vertex4(): Point {
    return this._vertex4;
  }

  getVertices(): Point[] {
    return [this._vertex1, this._vertex2, this._vertex3, this._vertex4];
  }

  toString(): string {
    return `Tetrahedron[${this.id}]: ${this._vertex1.toString()}, ${this._vertex2.toString()}, 
    ${this._vertex3.toString()}, ${this._vertex4.toString()}`;
  }
}
