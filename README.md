# NestJS LogStack

[![npm version](https://img.shields.io/npm/v/@samofprog/nestjs-logstack.svg)](https://www.npmjs.com/package/@samofprog/nestjs-logstack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A configurable Winston logger for NestJS with daily file rotation and console output.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)
  - [Basic Setup](#basic-setup)
  - [Global Logger Configuration](#global-logger-configuration)
  - [Using the Logger](#using-the-logger)
  - [Advanced Configuration](#advanced-configuration)
- [Configuration Options](#configuration-options)
- [Log Structure](#log-structure)
- [License](#license)

## Features

- 📊 Seamless integration with NestJS
- 📅 Daily log rotation with configurable retention
- 📁 Automatic log file organization by log level (info, warn, error)
- 🗜️ Compressed archive support for older logs
- 🎨 Colorized console output for development
- 🔄 JSON formatted logs for production environments

## Installation

```bash
# with npm
npm install @samofprog/nestjs-logstack

# or with yarn
yarn add @samofprog/nestjs-logstack
```

> Note: Ensure you also have `winston`, `winston-daily-rotate-file`, and `@nestjs/common` as dependencies.

## Example

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createNestLoggerService } from '@samofprog/nestjs-logstack';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createNestLoggerService(),
  });
  await app.listen(3000);
}
bootstrap();
```

You can also customize the max size and number of days logs are kept:

```ts
logger: createNestLoggerService("10m", "7d");
```