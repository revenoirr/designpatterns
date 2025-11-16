// src/index.ts

import { RectangleFactory } from './factories/RectangleFactory';
import { TetrahedronFactory } from './factories/TetrahedronFactory';
import { FileReader } from './utils/FileReader';
import { RectangleService } from './services/RectangleService';
import { TetrahedronService } from './services/TetrahedronService';
import { logger } from './utils/Logger';
import { Rectangle } from './entities/Rectangle';
import { Tetrahedron } from './entities/Tetrahedron';

/**
 * Main application file
 */
function main(): void {
  logger.info('=== Application Start ===');

  // Process rectangles
  processRectangles();

  // Process tetrahedrons
  processTetrahedrons();

  logger.info('=== Application End ===');
}

function processRectangles(): void {
  logger.info('--- Processing Rectangles ---');

  try {
    const lines = FileReader.readLines('data/rectangles.txt');
    const factory = new RectangleFactory();
    const rectangles: Rectangle[] = [];

    lines.forEach((line, index) => {
      const rectangleId = `rect_${index + 1}`;

      try {
        const shape = factory.createFromString(rectangleId, line);

        if (shape && shape instanceof Rectangle) {
          const rectangle = shape as Rectangle;
          rectangles.push(rectangle);
          logger.info(`Created: ${rectangle.id}`);

          // Calculations
          const area = RectangleService.calculateArea(rectangle);
          const perimeter = RectangleService.calculatePerimeter(rectangle);
          const isSquare = RectangleService.isSquare(rectangle);
          const isConvex = RectangleService.isConvex(rectangle);
          const isRhombus = RectangleService.isRhombus(rectangle);
          const isTrapezoid = RectangleService.isTrapezoid(rectangle);

          logger.info(`  Area: ${area.toFixed(2)}`);
          logger.info(`  Perimeter: ${perimeter.toFixed(2)}`);
          logger.info(`  Is Square: ${isSquare}`);
          logger.info(`  Is Convex: ${isConvex}`);
          logger.info(`  Is Rhombus: ${isRhombus}`);
          logger.info(`  Is Trapezoid: ${isTrapezoid}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.warn(`Line ${index + 1} error: ${error.message}`);
        }
      }
    });

    logger.info(`Total rectangles created: ${rectangles.length}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Rectangle processing error: ${error.message}`);
    }
  }
}

function processTetrahedrons(): void {
  logger.info('--- Processing Tetrahedrons ---');

  try {
    const lines = FileReader.readLines('data/tetrahedrons.txt');
    const factory = new TetrahedronFactory();
    const tetrahedrons: Tetrahedron[] = [];

    lines.forEach((line, index) => {
      const tetrahedronId = `tetra_${index + 1}`;

      try {
        const shape = factory.createFromString(tetrahedronId, line);

        if (shape && shape instanceof Tetrahedron) {
          const tetrahedron = shape as Tetrahedron;
          tetrahedrons.push(tetrahedron);
          logger.info(`Created: ${tetrahedron.id}`);

          // Calculations
          const volume = TetrahedronService.calculateVolume(tetrahedron);
          const surfaceArea = TetrahedronService.calculateSurfaceArea(tetrahedron);
          const onXY = TetrahedronService.isBaseOnCoordinatePlane(tetrahedron, 'xy');
          const onXZ = TetrahedronService.isBaseOnCoordinatePlane(tetrahedron, 'xz');
          const onYZ = TetrahedronService.isBaseOnCoordinatePlane(tetrahedron, 'yz');

          logger.info(`  Volume: ${volume.toFixed(4)}`);
          logger.info(`  Surface Area: ${surfaceArea.toFixed(4)}`);
          logger.info(`  Base on XY plane: ${onXY}`);
          logger.info(`  Base on XZ plane: ${onXZ}`);
          logger.info(`  Base on YZ plane: ${onYZ}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.warn(`Line ${index + 1} error: ${error.message}`);
        }
      }
    });

    logger.info(`Total tetrahedrons created: ${tetrahedrons.length}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Tetrahedron processing error: ${error.message}`);
    }
  }
}

// Run application
main();
