import { readFileSync } from 'fs';
import { join } from 'path';
import { FileReadException } from '../exceptions/FileReadException';
import { logger } from './Logger';

export class FileReader {

  static readLines(relativePath: string): string[] {
    try {
      const fullPath = join(process.cwd(), relativePath);
      const content = readFileSync(fullPath, 'utf-8');
      logger.info(`File ${relativePath} successfully read`);
      return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error reading file ${relativePath}: ${errorMessage}`);
      throw new FileReadException(`Failed to read file: ${errorMessage}`);
    }
  }
}
