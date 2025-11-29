// tests/Repository.test.ts

import { ShapeRepository } from '../src/repository/ShapeRepository';
import { Rectangle } from '../src/entities/Rectangle';
import { Tetrahedron } from '../src/entities/Tetrahedron';
import { Point } from '../src/entities/Point';
import {
  IdSpecification,
  FirstQuadrantSpecification,
  AreaRangeSpecification,
  ShapeTypeSpecification,
} from '../src/repository/specifications/ShapeSpecifications';
import {
  IdComparator,
  FirstPointXComparator,
  ShapeSorter,
} from '../src/comparators/ShapeComparator';
import { Warehouse } from '../src/warehouse/Warehouse';
import { WarehouseObserver } from '../src/observers/WarehouseObserver';

describe('Repository Pattern Tests', () => {
  let repository: ShapeRepository;
  let warehouse: Warehouse;

  beforeEach(() => {
    repository = new ShapeRepository();
    warehouse = Warehouse.getInstance();
    warehouse.clear();
  });

  describe('ShapeRepository', () => {
    it('should add and retrieve shapes', () => {
      const rect = new Rectangle(
        'test1',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );

      repository.add(rect);

      expect(repository.size()).toBe(1);
      expect(repository.getById('test1')).toBe(rect);
    });

    it('should remove shapes', () => {
      const rect = new Rectangle(
        'test2',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );

      repository.add(rect);
      expect(repository.size()).toBe(1);

      const removed = repository.remove('test2');

      expect(removed).toBe(true);
      expect(repository.size()).toBe(0);
      expect(repository.getById('test2')).toBeUndefined();
    });

    it('should check if shape exists', () => {
      const rect = new Rectangle(
        'test3',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );

      repository.add(rect);

      expect(repository.exists('test3')).toBe(true);
      expect(repository.exists('nonexistent')).toBe(false);
    });

    it('should get all shapes', () => {
      const rect1 = new Rectangle(
        'rect1',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      const rect2 = new Rectangle(
        'rect2',
        new Point(1, 1),
        new Point(5, 1),
        new Point(5, 4),
        new Point(1, 4),
      );

      repository.add(rect1);
      repository.add(rect2);

      const all = repository.getAll();

      expect(all).toHaveLength(2);
      expect(all).toContain(rect1);
      expect(all).toContain(rect2);
    });

    it('should clear repository', () => {
      const rect = new Rectangle(
        'test4',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );

      repository.add(rect);
      expect(repository.size()).toBe(1);

      repository.clear();

      expect(repository.size()).toBe(0);
    });
  });

  describe('Specification Pattern', () => {
    beforeEach(() => {
      const rect1 = new Rectangle(
        'rect1',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      const rect2 = new Rectangle(
        'rect2',
        new Point(-1, -1),
        new Point(3, -1),
        new Point(3, 2),
        new Point(-1, 2),
      );

      repository.add(rect1);
      repository.add(rect2);

      warehouse.saveMetrics('rect1', { area: 12, perimeter: 14 });
      warehouse.saveMetrics('rect2', { area: 12, perimeter: 14 });
    });

    it('should find shapes by ID', () => {
      const spec = new IdSpecification('rect1');
      const found = repository.find(spec);

      expect(found).toHaveLength(1);
      expect(found[0].id).toBe('rect1');
    });

    it('should find shapes in first quadrant', () => {
      const spec = new FirstQuadrantSpecification();
      const found = repository.find(spec);

      expect(found).toHaveLength(1);
      expect(found[0].id).toBe('rect1');
    });

    it('should find shapes by area range', () => {
      const spec = new AreaRangeSpecification(10, 15);
      const found = repository.find(spec);

      expect(found).toHaveLength(2);
    });

    it('should combine specifications with AND', () => {
      const quadrantSpec = new FirstQuadrantSpecification();
      const areaSpec = new AreaRangeSpecification(10, 15);
      const combined = quadrantSpec.and(areaSpec);

      const found = repository.find(combined);

      expect(found).toHaveLength(1);
      expect(found[0].id).toBe('rect1');
    });

    it('should combine specifications with OR', () => {
      const spec1 = new IdSpecification('rect1');
      const spec2 = new IdSpecification('rect2');
      const combined = spec1.or(spec2);

      const found = repository.find(combined);

      expect(found).toHaveLength(2);
    });

    it('should negate specifications with NOT', () => {
      const spec = new IdSpecification('rect1');
      const notSpec = spec.not();

      const found = repository.find(notSpec);

      expect(found).toHaveLength(1);
      expect(found[0].id).toBe('rect2');
    });

    it('should find shapes by type', () => {
      const tetra = new Tetrahedron(
        'tetra1',
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(0, 1, 0),
        new Point(0, 0, 1),
      );

      repository.add(tetra);

      const spec = new ShapeTypeSpecification<Rectangle>(Rectangle);
      const found = repository.find(spec);

      expect(found).toHaveLength(2);
      expect(found.every((s) => s instanceof Rectangle)).toBe(true);
    });
  });

  describe('Comparator and Sorting', () => {
    beforeEach(() => {
      const rect1 = new Rectangle(
        'rect_c',
        new Point(3, 0),
        new Point(7, 0),
        new Point(7, 3),
        new Point(3, 3),
      );
      const rect2 = new Rectangle(
        'rect_a',
        new Point(1, 0),
        new Point(5, 0),
        new Point(5, 3),
        new Point(1, 3),
      );
      const rect3 = new Rectangle(
        'rect_b',
        new Point(2, 0),
        new Point(6, 0),
        new Point(6, 3),
        new Point(2, 3),
      );

      repository.add(rect1);
      repository.add(rect2);
      repository.add(rect3);

      warehouse.saveMetrics('rect_c', { area: 12 });
      warehouse.saveMetrics('rect_a', { area: 12 });
      warehouse.saveMetrics('rect_b', { area: 12 });
    });

    it('should sort shapes by ID', () => {
      const shapes = repository.getAll();
      const sorted = ShapeSorter.sort(shapes, new IdComparator());

      expect(sorted).toHaveLength(3);
      expect(sorted[0].id).toBe('rect_a');
      expect(sorted[1].id).toBe('rect_b');
      expect(sorted[2].id).toBe('rect_c');
    });

    it('should sort shapes by X coordinate', () => {
      const shapes = repository.getAll();
      const sorted = ShapeSorter.sort(shapes, new FirstPointXComparator());

      expect(sorted).toHaveLength(3);
      expect(sorted[0].id).toBe('rect_a');
      expect(sorted[1].id).toBe('rect_b');
      expect(sorted[2].id).toBe('rect_c');
    });
  });

  describe('Observer Pattern', () => {
    it('should update warehouse when shapes are added', () => {
      const observer = new WarehouseObserver((shapeId) => {
        const shape = repository.getById(shapeId);
        if (shape instanceof Rectangle) {
          return { area: 100, perimeter: 40 };
        }
        return {};
      });

      repository.attach(observer);

      const rect = new Rectangle(
        'observable',
        new Point(0, 0),
        new Point(10, 0),
        new Point(10, 10),
        new Point(0, 10),
      );

      repository.add(rect);

      const metrics = warehouse.getMetrics('observable');

      expect(metrics).toBeDefined();
      expect(metrics?.area).toBe(100);
      expect(metrics?.perimeter).toBe(40);
    });
  });

  describe('Warehouse Singleton', () => {
    it('should return same instance', () => {
      const instance1 = Warehouse.getInstance();
      const instance2 = Warehouse.getInstance();

      expect(instance1).toBe(instance2);
    });

    it('should save and retrieve metrics', () => {
      warehouse.saveMetrics('test', { area: 25, perimeter: 20 });

      const metrics = warehouse.getMetrics('test');

      expect(metrics).toBeDefined();
      expect(metrics?.area).toBe(25);
      expect(metrics?.perimeter).toBe(20);
    });

    it('should remove metrics', () => {
      warehouse.saveMetrics('test', { area: 25 });
      expect(warehouse.getMetrics('test')).toBeDefined();

      warehouse.removeMetrics('test');

      expect(warehouse.getMetrics('test')).toBeUndefined();
    });

    it('should get all metrics', () => {
      warehouse.saveMetrics('test1', { area: 10 });
      warehouse.saveMetrics('test2', { area: 20 });

      const allMetrics = warehouse.getAllMetrics();

      expect(allMetrics.size).toBe(2);
      expect(allMetrics.get('test1')?.area).toBe(10);
      expect(allMetrics.get('test2')?.area).toBe(20);
    });
  });
});
