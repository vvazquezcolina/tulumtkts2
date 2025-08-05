# TulumTkts - Tourism Experience Platform

## Overview

TulumTkts is a tourism experience booking platform built with React frontend and Express.js backend. The application appears to be designed for booking tours, experiences, and attractions in Tulum, featuring a modern UI with search functionality, favorites management, and newsletter signup capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern React application with TypeScript for type safety
- **Vite**: Build tool and development server for fast compilation and hot reloading
- **Shadcn/ui Components**: Comprehensive UI component library built on Radix UI primitives
- **TailwindCSS**: Utility-first CSS framework with custom design tokens and dark mode support
- **Wouter**: Lightweight client-side routing library
- **TanStack Query**: Data fetching and caching library for API interactions

### Backend Architecture
- **Express.js**: RESTful API server with TypeScript support
- **Middleware Pattern**: Custom logging middleware for API request tracking
- **Storage Interface**: Abstract storage layer with in-memory implementation for development
- **Session Management**: PostgreSQL-backed session storage using connect-pg-simple

### Data Storage Solutions
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Drizzle ORM**: Type-safe SQL query builder with schema-first approach
- **Schema Location**: Database schema defined in `shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Database migrations managed through Drizzle Kit

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **UUID Primary Keys**: Generated using PostgreSQL's `gen_random_uuid()` function
- **Zod Validation**: Runtime type validation using Drizzle-Zod integration

### Authentication and Authorization
- **Session-based Auth**: Server-side sessions stored in PostgreSQL
- **Password Storage**: Plain text passwords (development setup - needs security enhancement)
- **Protected Routes**: Query client configured for handling 401 unauthorized responses

### Build and Deployment
- **Development**: Concurrent frontend (Vite) and backend (tsx) development servers
- **Production Build**: Frontend builds to `dist/public`, backend bundles with esbuild
- **Module System**: ESM modules throughout the application
- **Environment Variables**: Database URL and other configuration through environment variables

### Development Tools
- **TypeScript**: Strict type checking across frontend, backend, and shared code
- **Path Aliases**: Clean imports using `@/` for client code and `@shared/` for shared utilities
- **Hot Reloading**: Vite HMR for frontend, tsx for backend development
- **Code Organization**: Monorepo structure with clear separation of concerns

### API Design
- **RESTful Structure**: API routes prefixed with `/api`
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request/response logging
- **Type Safety**: Shared types between frontend and backend through the `shared/` directory