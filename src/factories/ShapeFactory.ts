import { Shape } from '../entities/Shape';

export abstract class ShapeFactory {
  abstract createShape(id: string, ...params: any[]): Shape;

  createFromString(id: string, input: string): Shape | null {
    try {
      return this.parseAndCreate(id, input);
    } catch (error) {
      return null;
    }
  }

  protected abstract parseAndCreate(id: string, input: string): Shape;
}
