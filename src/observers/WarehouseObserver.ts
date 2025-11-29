import { Observer } from './Observer';
import { Warehouse, ShapeMetrics } from '../warehouse/Warehouse';

export class WarehouseObserver implements Observer {
  private warehouse: Warehouse;
  private metricsCalculator: (shapeId: string) => ShapeMetrics;

  constructor(metricsCalculator: (shapeId: string) => ShapeMetrics) {
    this.warehouse = Warehouse.getInstance();
    this.metricsCalculator = metricsCalculator;
  }

  update(shapeId: string): void {
    const metrics = this.metricsCalculator(shapeId);
    this.warehouse.saveMetrics(shapeId, metrics);
  }
}
