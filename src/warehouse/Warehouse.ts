export class Warehouse {
  private static instance: Warehouse;
  private metrics: Map<string, ShapeMetrics>;

  private constructor() {
    this.metrics = new Map();
  }

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  saveMetrics(shapeId: string, metrics: ShapeMetrics): void {
    this.metrics.set(shapeId, metrics);
  }


  getMetrics(shapeId: string): ShapeMetrics | undefined {
    return this.metrics.get(shapeId);
  }


  removeMetrics(shapeId: string): void {
    this.metrics.delete(shapeId);
  }


  getAllMetrics(): Map<string, ShapeMetrics> {
    return new Map(this.metrics);
  }


  clear(): void {
    this.metrics.clear();
  }

  size(): number {
    return this.metrics.size;
  }
}


export interface ShapeMetrics {
  area?: number;
  perimeter?: number;
  volume?: number;
  surfaceArea?: number;
}
