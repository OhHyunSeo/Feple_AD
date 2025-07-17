# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Development server with Turbopack
npm run dev

# Production build and start
npm run build
npm start

# Linting
npm run lint

# Database operations
npm run db:seed          # Seed database with test data
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes to database
npx prisma studio        # Open Prisma Studio for database inspection
```

### Required Environment Variables
```bash
# .env.local (required for development)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
REPLICATE_API_TOKEN=your_replicate_token
```

## Architecture Overview

### Project Purpose
Feple Dashboard is an AI-powered voice consultation analysis system for evaluating and managing customer service representatives. It provides role-based dashboards for consultants (individual performance) and QC managers (team oversight).

### Core Technical Architecture

#### 1. Role-Based Application Flow
- **Entry Point**: `/` - Role selection page (consultant vs QC team)
- **Consultant Flow**: `/consultant/*` - Individual performance dashboards, file upload
- **QC Manager Flow**: `/qc/*` - Team oversight, risk monitoring, evaluation management
- **API Integration**: `/api/*` - Replicate AI analysis, webhook handling, predictions

#### 2. Data Layer Architecture
**Current State**: Transitioning from mock data to Supabase integration
- **Mock Data**: Located in `src/data/` - Currently used for UI development
- **Supabase Integration**: Prisma schema defines production data models
- **Database Models**: Users, Teams, Consultants, Evaluations, Risk Alerts, Daily/Weekly Stats

#### 3. AI Analysis Pipeline
1. **Upload**: Audio files uploaded via `/consultant/upload`
2. **Processing**: Replicate API analyzes audio for conversation quality metrics
3. **Webhook**: Real-time results received at `/api/webhook`
4. **Storage**: Results stored in `analysis_results` and `counselor_evaluations` tables
5. **Display**: Comprehensive evaluation displayed in performance dashboards

#### 4. Component Architecture
- **Layout Components**: `Header`, `Sidebar`, `DashboardLayout` - Consistent navigation
- **UI System**: `src/components/ui/` - Reusable Button, Card, Badge, Select components  
- **Feature Components**: `src/components/features/` - Domain-specific components
- **Performance Components**: `src/components/features/performance/` - Evaluation charts, conversation details

#### 5. State Management Pattern
- **Context Providers**: `SidebarContext` (navigation), `AnalysisResultContext` (AI results)
- **Custom Hooks**: Data fetching (`useConsultants`, `usePerformance`), UI state (`useModal`, `usePagination`, `useFilters`)
- **Server Components**: Preferred for data fetching where possible

### Key Design Patterns

#### TypeScript Integration
- Path aliases: `@/*` maps to `src/*`
- Strict type checking enabled
- Comprehensive type definitions in `src/types/`

#### Styling System
- **Primary**: Tailwind CSS with custom LG font family (`LGEIText`, `LGEIHeadline`)
- **Components**: Class-based styling with consistent design tokens
- **Responsive**: Mobile-first responsive design throughout

#### Database Integration
- **ORM**: Prisma with PostgreSQL (Supabase)
- **Schema**: Well-defined models for consultants, evaluations, teams, and performance metrics
- **Seeding**: Database seeding available via `npm run db:seed`

## Development Notes

### Active Refactoring
Reference `REFACTORING_PLAN.md` for ongoing code quality improvements:
- Centralizing types and constants
- Extracting reusable UI components  
- Implementing custom hooks for state management
- Moving from mock data to Supabase integration

### Mock Data to Database Transition
Reference `backend-connect.md` for Supabase integration progress:
- Replace mock imports with API calls
- Implement proper error handling and loading states
- Ensure type consistency between mock and database schemas

### AI Integration
- **Replicate Platform**: Used for voice analysis with webhook-based result delivery
- **Analysis Metrics**: Politeness, empathy, problem-solving, emotional stability scores
- **Real-time Updates**: Webhook endpoint handles analysis completion notifications

### Role-Based Access
- **Navigation**: `Sidebar` component dynamically renders based on user role
- **Route Protection**: Pages under `/consultant` vs `/qc` serve different user types
- **Data Filtering**: Performance data filtered by user role and permissions