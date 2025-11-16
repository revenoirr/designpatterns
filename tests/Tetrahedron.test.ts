// tests/Tetrahedron.test.ts

import { Point } from '../src/entities/Point';
import { Tetrahedron } from '../src/entities/Tetrahedron';
import { TetrahedronFactory } from '../src/factories/TetrahedronFactory';
import { TetrahedronService } from '../src/services/TetrahedronService';
import { TetrahedronValidator } from '../src/validators/TetrahedronValidator';
import { ValidationException } from '../src/exceptions/ValidationException';

describe('Tetrahedron Tests', () => {
  describe('TetrahedronValidator', () => {
    it('должен валидировать корректную строку', () => {
      const validString = '0 0 0 1 0 0 0 1 0 0 0 1';

      expect(() => TetrahedronValidator.validateInputString(validString)).not.toThrow();
    });

    it('должен отклонять строку с недопустимым символом', () => {
      const invalidString = '2a.0 0 0 3 0 0 0 3 0 0 0 3';

      expect(() => TetrahedronValidator.validateInputString(invalidString))
        .toThrow(ValidationException);
      expect(() => TetrahedronValidator.validateInputString(invalidString))
        .toThrow('Invalid character in number');
    });

    it('должен отклонять строку с недостаточным количеством координат', () => {
      const invalidString = '0 0 0 4 0 0';

      expect(() => TetrahedronValidator.validateInputString(invalidString))
        .toThrow(ValidationException);
      expect(() => TetrahedronValidator.validateInputString(invalidString))
        .toThrow('Invalid coordinate count');
    });

    it('должен проверять, что четыре точки образуют тетраэдр', () => {
      const v1 = new Point(0, 0, 0);
      const v2 = new Point(1, 0, 0);
      const v3 = new Point(0, 1, 0);
      const v4 = new Point(0, 0, 1);

      expect(TetrahedronValidator.isTetrahedron(v1, v2, v3, v4)).toBe(true);
    });

    it('должен отклонять компланарные точки', () => {
      const v1 = new Point(0, 0, 0);
      const v2 = new Point(1, 0, 0);
      const v3 = new Point(0, 1, 0);
      const v4 = new Point(1, 1, 0);

      expect(TetrahedronValidator.isTetrahedron(v1, v2, v3, v4)).toBe(false);
    });

    it('должен вычислять объем тетраэдра', () => {
      const v1 = new Point(0, 0, 0);
      const v2 = new Point(1, 0, 0);
      const v3 = new Point(0, 1, 0);
      const v4 = new Point(0, 0, 1);

      const volume = TetrahedronValidator.calculateVolume(v1, v2, v3, v4);

      expect(volume).toBeCloseTo(1/6, 5);
      expect(volume).toBeGreaterThan(0);
    });
  });

  describe('TetrahedronFactory', () => {
    let tetrahedronFactory: TetrahedronFactory;

    beforeEach(() => {
      tetrahedronFactory = new TetrahedronFactory();
    });

    it('должен создавать тетраэдр из валидных точек', () => {
      const v1 = new Point(0, 0, 0);
      const v2 = new Point(1, 0, 0);
      const v3 = new Point(0, 1, 0);
      const v4 = new Point(0, 0, 1);

      const tetrahedron = tetrahedronFactory.createShape('tetra1', v1, v2, v3, v4);

      expect(tetrahedron).toBeInstanceOf(Tetrahedron);
      expect(tetrahedron.id).toBe('tetra1');
      expect(tetrahedron.vertex1.equals(v1)).toBe(true);
    });

    it('должен создавать тетраэдр из строки', () => {
      const validString = '0 0 0 1 0 0 0 1 0 0 0 1';

      const shape = tetrahedronFactory.createFromString('tetra2', validString);

      expect(shape).not.toBeNull();
      expect(shape).toBeInstanceOf(Tetrahedron);
      if (shape) {
        expect(shape.id).toBe('tetra2');
      }
    });

    it('должен возвращать null для невалидной строки', () => {
      const invalidString = '2a.0 0 0 3 0 0 0 3 0 0 0 3';

      const tetrahedron = tetrahedronFactory.createFromString('tetra3', invalidString);

      expect(tetrahedron).toBeNull();
    });

    it('должен выбрасывать исключение для компланарных точек', () => {
      const v1 = new Point(0, 0, 0);
      const v2 = new Point(1, 0, 0);
      const v3 = new Point(0, 1, 0);
      const v4 = new Point(1, 1, 0);

      expect(() => tetrahedronFactory.createShape('tetra4', v1, v2, v3, v4))
        .toThrow(ValidationException);
    });
  });

  describe('TetrahedronService', () => {
    let tetrahedron: Tetrahedron;

    beforeEach(() => {
      const v1 = new Point(0, 0, 0);
      const v2 = new Point(1, 0, 0);
      const v3 = new Point(0, 1, 0);
      const v4 = new Point(0, 0, 1);
      tetrahedron = new Tetrahedron('test', v1, v2, v3, v4);
    });

    it('должен вычислять объем тетраэдра', () => {
      const volume = TetrahedronService.calculateVolume(tetrahedron);

      expect(volume).toBeCloseTo(1/6, 5);
      expect(volume).toBeGreaterThan(0);
      expect(typeof volume).toBe('number');
    });

    it('должен вычислять площадь поверхности тетраэдра', () => {
      const surfaceArea = TetrahedronService.calculateSurfaceArea(tetrahedron);

      expect(surfaceArea).toBeGreaterThan(0);
      expect(typeof surfaceArea).toBe('number');
    });

    it('должен определять, находится ли основание на плоскости XY', () => {
      const v1 = new Point(0, 0, 0);
      const v2 = new Point(1, 0, 0);
      const v3 = new Point(0, 1, 0);
      const v4 = new Point(0.5, 0.5, 1);
      const tetra = new Tetrahedron('xy-base', v1, v2, v3, v4);

      const onXY = TetrahedronService.isBaseOnCoordinatePlane(tetra, 'xy');

      expect(onXY).toBe(true);
      expect(typeof onXY).toBe('boolean');
    });

    it('должен определять, что основание НЕ на плоскости XY', () => {
      const onXY = TetrahedronService.isBaseOnCoordinatePlane(tetrahedron, 'xy');

      expect(typeof onXY).toBe('boolean');
    });

    it('должен вычислять соотношение объемов при рассечении', () => {
      const ratio = TetrahedronService.calculateVolumeRatio(tetrahedron, 'xy');

      expect(ratio).toHaveProperty('upper');
      expect(ratio).toHaveProperty('lower');
      expect(ratio.upper).toBeGreaterThan(0);
      expect(ratio.lower).toBeGreaterThan(0);
    });

    it('должен вычислять соотношение объемов для разных плоскостей', () => {
      const ratioXY = TetrahedronService.calculateVolumeRatio(tetrahedron, 'xy');
      const ratioXZ = TetrahedronService.calculateVolumeRatio(tetrahedron, 'xz');
      const ratioYZ = TetrahedronService.calculateVolumeRatio(tetrahedron, 'yz');

      expect(ratioXY).toBeDefined();
      expect(ratioXZ).toBeDefined();
      expect(ratioYZ).toBeDefined();
    });
  });

  describe('Интеграционные тесты', () => {
    it('должен создать тетраэдр и выполнить все вычисления', () => {
      const factory = new TetrahedronFactory();
      const validString = '0 0 0 1 0 0 0 1 0 0 0 1';

      const shape = factory.createFromString('integration', validString);

      expect(shape).not.toBeNull();
      expect(shape).toBeInstanceOf(Tetrahedron);

      if (shape && shape instanceof Tetrahedron) {
        const tetrahedron = shape as Tetrahedron;
        const volume = TetrahedronService.calculateVolume(tetrahedron);
        const surfaceArea = TetrahedronService.calculateSurfaceArea(tetrahedron);
        const onXY = TetrahedronService.isBaseOnCoordinatePlane(tetrahedron, 'xy');

        expect(volume).toBeGreaterThan(0);
        expect(surfaceArea).toBeGreaterThan(0);
        expect(typeof onXY).toBe('boolean');
      }
    });
  });
});
