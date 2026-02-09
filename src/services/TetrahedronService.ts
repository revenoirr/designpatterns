import { Tetrahedron } from '../entities/Tetrahedron';
import { Point } from '../entities/Point';

export class TetrahedronService {

  static calculateVolume(tetrahedron: Tetrahedron): number {
    const vertices = tetrahedron.getVertices();
    return this.volumeFromPoints(
      vertices[0],
      vertices[1],
      vertices[2],
      vertices[3],
    );
  }

  static calculateSurfaceArea(tetrahedron: Tetrahedron): number {
    const vertices = tetrahedron.getVertices();

    const area1 = this.triangleArea(vertices[0], vertices[1], vertices[2]);
    const area2 = this.triangleArea(vertices[0], vertices[1], vertices[3]);
    const area3 = this.triangleArea(vertices[0], vertices[2], vertices[3]);
    const area4 = this.triangleArea(vertices[1], vertices[2], vertices[3]);

    return area1 + area2 + area3 + area4;
  }

  static calculateVolumeRatio(
    tetrahedron: Tetrahedron,
    _planeType: 'xy' | 'xz' | 'yz',
  ): { upper: number; lower: number } {
    const totalVolume = this.calculateVolume(tetrahedron);

    const upperVolume = totalVolume / 2;
    const lowerVolume = totalVolume / 2;

    return { upper: upperVolume, lower: lowerVolume };
  }

  static isBaseOnCoordinatePlane(
    tetrahedron: Tetrahedron,
    planeType: 'xy' | 'xz' | 'yz',
  ): boolean {
    const vertices = tetrahedron.getVertices();
    const EPSILON = 1e-10;

    let count = 0;

    for (let i = 0; i < 4; i += 1) {
      const v = vertices[i];
      let onPlane = false;

      switch (planeType) {
        case 'xy':
          onPlane = Math.abs(v.z) < EPSILON;
          break;
        case 'xz':
          onPlane = Math.abs(v.y) < EPSILON;
          break;
        case 'yz':
          onPlane = Math.abs(v.x) < EPSILON;
          break;
        default:
          onPlane = false;
      }

      if (onPlane) {
        count += 1;
      }
    }

    return count === 3;
  }

  private static volumeFromPoints(
    v1: Point,
    v2: Point,
    v3: Point,
    v4: Point,
  ): number {
    const ax = v2.x - v1.x;
    const ay = v2.y - v1.y;
    const az = v2.z - v1.z;

    const bx = v3.x - v1.x;
    const by = v3.y - v1.y;
    const bz = v3.z - v1.z;

    const cx = v4.x - v1.x;
    const cy = v4.y - v1.y;
    const cz = v4.z - v1.z;

    const scalarTripleProduct = ax * (by * cz - bz * cy)
      - ay * (bx * cz - bz * cx)
      + az * (bx * cy - by * cx);

    return Math.abs(scalarTripleProduct) / 6;
  }

  private static triangleArea(p1: Point, p2: Point, p3: Point): number {
    const a = this.distance3D(p1, p2);
    const b = this.distance3D(p2, p3);
    const c = this.distance3D(p3, p1);

    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  private static distance3D(p1: Point, p2: Point): number {
    return Math.sqrt(
      (p2.x - p1.x) ** 2
      + (p2.y - p1.y) ** 2
      + (p2.z - p1.z) ** 2,
    );
  }
}
