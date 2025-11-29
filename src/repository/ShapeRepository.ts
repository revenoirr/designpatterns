import { Shape } from '../entities/Shape';
import { Specification } from './specifications/Specification';
import { Observer } from '../observers/Observer';
import { Subject } from '../observers/Subject';

export class ShapeRepository implements Subject {
  private shapes: Map<string, Shape>;
  private observers: Observer[];

  constructor() {
    this.shapes = new Map();
    this.observers = [];
  }

  add(shape: Shape): void {
    this.shapes.set(shape.id, shape);
    this.notify();
  }


  remove(id: string): boolean {
    const result = this.shapes.delete(id);
    if (result) {
      this.notify();
    }
    return result;
  }


  getById(id: string): Shape | undefined {
    return this.shapes.get(id);
  }

  getAll(): Shape[] {
    return Array.from(this.shapes.values());
  }

  find(specification: Specification<Shape>): Shape[] {
    return this.getAll().filter((shape) => specification.isSatisfiedBy(shape));
  }

  size(): number {
    return this.shapes.size;
  }

  clear(): void {
    this.shapes.clear();
    this.notify();
  }


  exists(id: string): boolean {
    return this.shapes.has(id);
  }

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    this.shapes.forEach((shape) => {
      this.observers.forEach((observer) => observer.update(shape.id));
    });
  }
}
