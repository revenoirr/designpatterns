# Geometric Shapes Calculator

A TypeScript application for working with geometric shapes (Rectangle and Tetrahedron) using design patterns, data validation, and comprehensive testing.

## Features

- **Rectangle (2D)**: Calculate area, perimeter, check if square/rhombus/trapezoid
- **Tetrahedron (3D)**: Calculate volume, surface area, check base position on coordinate planes
- Factory Method pattern for shape creation
- Input validation with error handling
- Logging to console and file
- Full test coverage with Jest

## Quick Start

```bash
# Install dependencies
npm install

# Build project
npm run build

# Run application
npm start

# Run tests
npm test
```

## Project Structure

```
project/
├── src/
│   ├── entities/       # Data classes (Point, Shape, Rectangle, Tetrahedron)
│   ├── factories/      # Factory Method pattern
│   ├── services/       # Business logic (calculations)
│   ├── validators/     # Input validation
│   ├── exceptions/     # Custom exceptions
│   └── utils/          # Logger, FileReader
├── data/               # Input data files
├── tests/              # Unit tests
└── logs/               # Application logs
```

## Input Format

### Rectangles (data/rectangles.txt)
Each line: `x1 y1 x2 y2 x3 y3 x4 y4`

```
0 0 4 0 4 3 0 3          # Valid rectangle
2a.0 2.0 6.0 2.0 ...    # Invalid: bad character
0 0 2 0 2 2             # Invalid: not enough coordinates
```

### Tetrahedrons (data/tetrahedrons.txt)
Each line: `x1 y1 z1 x2 y2 z2 x3 y3 z3 x4 y4 z4`

```
0 0 0 1 0 0 0 1 0 0 0 1   # Valid tetrahedron
2a.0 0 0 3 0 0 ...        # Invalid: bad character
```

## Usage Example

```typescript
import { Point } from './entities/Point';
import { RectangleFactory } from './factories/RectangleFactory';
import { RectangleService } from './services/RectangleService';

// Create rectangle
const factory = new RectangleFactory();
const p1 = new Point(0, 0);
const p2 = new Point(4, 0);
const p3 = new Point(4, 3);
const p4 = new Point(0, 3);
const rectangle = factory.createShape('rect1', p1, p2, p3, p4);

// Calculate
const area = RectangleService.calculateArea(rectangle);
const perimeter = RectangleService.calculatePerimeter(rectangle);
console.log(`Area: ${area}, Perimeter: ${perimeter}`);
```

## Testing

```bash
npm test              # Run all tests
npm run test:coverage # With coverage report
npm run test:watch    # Watch mode
```

**Test Results:** 36 tests passed ✓

## Scripts

```bash
npm run build      # Compile TypeScript
npm start          # Run application
npm run dev        # Run without compilation
npm test           # Run tests
npm run lint       # Check code style
npm run lint:fix   # Auto-fix code style
```

## Technologies

- TypeScript 5.0
- Node.js 16+
- Jest 29.5
- ESLint
- Design Patterns: Factory Method, Separation of Concerns

## Architecture

- **Entities**: Data only, no business logic
- **Validators**: Input validation
- **Services**: Business logic (calculations)
- **Factories**: Object creation using Factory Method pattern
- **Utils**: Helper functions (logging, file reading)

## License

MIT