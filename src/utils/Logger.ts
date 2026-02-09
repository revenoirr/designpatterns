import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

class SimpleLogger {
  private logFilePath: string;

  constructor() {
    const logsDir = join(process.cwd(), 'logs');
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true });
    }
    this.logFilePath = join(logsDir, 'app.log');
    writeFileSync(this.logFilePath, '');
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  private log(level: string, message: string): void {
    const formattedMessage = this.formatMessage(level, message);
    console.log(formattedMessage);
    try {
      appendFileSync(this.logFilePath, formattedMessage + '\n', 'utf8');
    } catch (error) {
      // ignore
    }
  }

  info(message: string): void {
    this.log('INFO', message);
  }

  warn(message: string): void {
    this.log('WARN', message);
  }

  error(message: string): void {
    this.log('ERROR', message);
  }

  debug(message: string): void {
    this.log('DEBUG', message);
  }
}

export const logger = new SimpleLogger();
