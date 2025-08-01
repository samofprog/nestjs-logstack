# NestJS LogStack

[![npm version](https://img.shields.io/npm/v/@samofprog/nestjs-logstack.svg)](https://www.npmjs.com/package/@samofprog/nestjs-logstack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful Winston-based logging solution for NestJS applications with daily file rotation, automatic log organization by level, and colorized console output.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Configuration Options](#configuration-options)
- [API Reference](#api-reference)
- [Log File Structure](#log-file-structure)
- [License](#license)

## Features

- 🚀 **Easy NestJS Integration**: Drop-in replacement for default NestJS logger
- 📅 **Daily Log Rotation**: Automatic file rotation with configurable retention periods
- 📁 **Level-based Organization**: Separate log files for info, warn, and error levels
- 🗜️ **Archive Compression**: Automatic compression of old log files to save space
- 🎨 **Development-friendly Console**: Colorized output with timestamps and context
- 📄 **JSON File Format**: Structured JSON logs for easy parsing and analysis
- ⚡ **TypeScript Support**: Full TypeScript definitions included
- 🔧 **Configurable**: Customizable file sizes and retention periods

## Installation

```bash
# with npm
npm install @samofprog/nestjs-logstack

# or with yarn
yarn add @samofprog/nestjs-logstack
```

The package includes all necessary dependencies (`winston`, `winston-daily-rotate-file`, `nest-winston`) so no additional installation is required.

## Usage

### Basic Setup

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerUtils } from '@samofprog/nestjs-logstack';

async function bootstrap() {
  const loggerUtils = new LoggerUtils();
  const app = await NestFactory.create(AppModule, {
    logger: loggerUtils.buildLogger(),
  });
  await app.listen(3000);
}
bootstrap();
```

### Configuration Options

Customize log file size and retention period:

```typescript
// Custom configuration
const loggerUtils = new LoggerUtils();
const logger = loggerUtils.buildLogger("10m", "7d"); // 10MB max size, 7 days retention

// Default configuration (20MB, 14 days)
const logger = loggerUtils.buildLogger();
```

**Parameters:**
- `maxSize` (string): Maximum size per log file (default: "20m")
- `maxFiles` (string): Retention period for log files (default: "14d")

## API Reference

### LoggerUtils Class

#### `buildLogger(maxSize?: string, maxFiles?: string)`

Creates a Winston logger instance configured for NestJS.

**Parameters:**
- `maxSize` (optional): Maximum file size before rotation (e.g., "20m", "100k")
- `maxFiles` (optional): Number of days to retain log files (e.g., "14d", "30d")

**Returns:** NestJS-compatible logger instance

## Log File Structure

Logs are automatically organized in a `logs/` directory at your project root:

```
logs/
├── info-2024-07-16.log      # Info level logs
├── warn-2024-07-16.log      # Warning level logs
├── error-2024-07-16.log     # Error level logs
└── archived/                # Compressed old logs
    ├── info-2024-07-15.log.gz
    └── warn-2024-07-15.log.gz
```

### Log Format

**Console Output (Development):**
```
2024-07-16T10:30:45.123Z info: [AppController] Application started successfully
```

**File Output (JSON):**
```json
{
  "timestamp": "2024-07-16T10:30:45.123Z",
  "level": "info",
  "message": "Application started successfully",
  "context": "AppController"
}
```