// src/index.ts

import { RectangleFactory } from './factories/RectangleFactory';
import { TetrahedronFactory } from './factories/TetrahedronFactory';
import { FileReader } from './utils/FileReader';
import { RectangleService } from './services/RectangleService';
import { TetrahedronService } from './services/TetrahedronService';
import { logger } from './utils/Logger';
import { Rectangle } from './entities/Rectangle';
import { Tetrahedron } from './entities/Tetrahedron';
import { ShapeRepository } from './repository/ShapeRepository';
import { Warehouse } from './warehouse/Warehouse';
import { WarehouseObserver } from './observers/WarehouseObserver';
import {
  IdSpecification,
  FirstQuadrantSpecification,
  AreaRangeSpecification,
  VolumeRangeSpecification,
  DistanceFromOriginSpecification,
} from './repository/specifications/ShapeSpecifications';
import {
  IdComparator,
  FirstPointXComparator,
  AreaComparator,
  ShapeSorter,
} from './comparators/ShapeComparator';

/**
 * Main application
 */
function main(): void {
  logger.info('=== Application Start ===');

  // Create repository
  const repository = new ShapeRepository();
  const warehouse = Warehouse.getInstance();

  // Create observer for automatic metrics updates
  const warehouseObserver = new WarehouseObserver((shapeId) => {
    const shape = repository.getById(shapeId);
    if (!shape) {
      return {};
    }

    if (shape instanceof Rectangle) {
      return {
        area: RectangleService.calculateArea(shape),
        perimeter: RectangleService.calculatePerimeter(shape),
      };
    }

    if (shape instanceof Tetrahedron) {
      return {
        volume: TetrahedronService.calculateVolume(shape),
        surfaceArea: TetrahedronService.calculateSurfaceArea(shape),
      };
    }

    return {};
  });

  // Attach observer to repository
  repository.attach(warehouseObserver);

  // Process shapes
  processRectangles(repository);
  processTetrahedrons(repository);

  // Demonstrate features
  demonstrateRepositoryFeatures(repository);
  demonstrateSpecifications(repository);
  demonstrateSorting(repository);
  demonstrateWarehouse(warehouse);

  logger.info('=== Application End ===');
}

function processRectangles(repository: ShapeRepository): void {
  logger.info('--- Processing Rectangles ---');

  try {
    const lines = FileReader.readLines('data/rectangles.txt');
    const factory = new RectangleFactory();

    lines.forEach((line, index) => {
      const rectangleId = `rect_${index + 1}`;

      try {
        const shape = factory.createFromString(rectangleId, line);

        if (shape && shape instanceof Rectangle) {
          repository.add(shape);
          logger.info(`Created and added: ${shape.id}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.warn(`Line ${index + 1} error: ${error.message}`);
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Rectangle processing error: ${error.message}`);
    }
  }
}

function processTetrahedrons(repository: ShapeRepository): void {
  logger.info('--- Processing Tetrahedrons ---');

  try {
    const lines = FileReader.readLines('data/tetrahedrons.txt');
    const factory = new TetrahedronFactory();

    lines.forEach((line, index) => {
      const tetrahedronId = `tetra_${index + 1}`;

      try {
        const shape = factory.createFromString(tetrahedronId, line);

        if (shape && shape instanceof Tetrahedron) {
          repository.add(shape);
          logger.info(`Created and added: ${shape.id}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.warn(`Line ${index + 1} error: ${error.message}`);
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Tetrahedron processing error: ${error.message}`);
    }
  }
}

function demonstrateRepositoryFeatures(repository: ShapeRepository): void {
  logger.info('--- Repository Features ---');

  const totalShapes = repository.size();
  logger.info(`Total shapes in repository: ${totalShapes}`);

  // Get by ID
  const shape = repository.getById('rect_1');
  if (shape) {
    logger.info(`Found shape by ID 'rect_1': ${shape.id}`);
  }

  // Check existence
  const exists = repository.exists('rect_1');
  logger.info(`Shape 'rect_1' exists: ${exists}`);
}

function demonstrateSpecifications(repository: ShapeRepository): void {
  logger.info('--- Specification Pattern Demo ---');

  // Find by ID
  const idSpec = new IdSpecification('rect_1');
  const byId = repository.find(idSpec);
  logger.info(`Shapes with ID 'rect_1': ${byId.length}`);

  // Find in first quadrant
  const firstQuadrantSpec = new FirstQuadrantSpecification();
  const inFirstQuadrant = repository.find(firstQuadrantSpec);
  logger.info(`Shapes in first quadrant: ${inFirstQuadrant.length}`);

  // Find by area range
  const areaSpec = new AreaRangeSpecification(10, 15);
  const byArea = repository.find(areaSpec);
  logger.info(`Shapes with area 10-15: ${byArea.length}`);

  // Find by volume range
  const volumeSpec = new VolumeRangeSpecification(0, 1);
  const byVolume = repository.find(volumeSpec);
  logger.info(`Shapes with volume 0-1: ${byVolume.length}`);

  // Combined search (AND)
  const combinedSpec = firstQuadrantSpec.and(areaSpec);
  const combined = repository.find(combinedSpec);
  logger.info(`Shapes in first quadrant AND area 10-15: ${combined.length}`);

  // Find by distance from origin
  const distanceSpec = new DistanceFromOriginSpecification(0, 5);
  const byDistance = repository.find(distanceSpec);
  logger.info(`Shapes with distance from origin 0-5: ${byDistance.length}`);
}

function demonstrateSorting(repository: ShapeRepository): void {
  logger.info('--- Sorting Demo ---');

  const allShapes = repository.getAll();

  // Sort by ID
  const sortedById = ShapeSorter.sort(allShapes, new IdComparator());
  logger.info(`Sorted by ID (first 3): ${sortedById.slice(0, 3).map((s) => s.id).join(', ')}`);

  // Sort by X coordinate
  const sortedByX = ShapeSorter.sort(allShapes, new FirstPointXComparator());
  logger.info(`Sorted by X (first 3): ${sortedByX.slice(0, 3).map((s) => s.id).join(', ')}`);

  // Sort by area
  const sortedByArea = ShapeSorter.sort(allShapes, new AreaComparator());
  logger.info(`Sorted by area (first 3): ${sortedByArea.slice(0, 3).map((s) => s.id).join(', ')}`);
}

function demonstrateWarehouse(warehouse: Warehouse): void {
  logger.info('--- Warehouse (Singleton) Demo ---');

  logger.info(`Total metrics stored: ${warehouse.size()}`);

  // Show some metrics
  const allMetrics = warehouse.getAllMetrics();
  let count = 0;

  allMetrics.forEach((metrics, shapeId) => {
    if (count < 3) {
      logger.info(`Metrics for ${shapeId}:`);
      if (metrics.area !== undefined) {
        logger.info(`  Area: ${metrics.area.toFixed(2)}`);
      }
      if (metrics.perimeter !== undefined) {
        logger.info(`  Perimeter: ${metrics.perimeter.toFixed(2)}`);
      }
      if (metrics.volume !== undefined) {
        logger.info(`  Volume: ${metrics.volume.toFixed(4)}`);
      }
      if (metrics.surfaceArea !== undefined) {
        logger.info(`  Surface Area: ${metrics.surfaceArea.toFixed(4)}`);
      }
      count += 1;
    }
  });
}

// Run application
main();
