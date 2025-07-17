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
# .env (required for development)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
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
**Current State**: Fully integrated with Supabase and Prisma
- **Mock Data**: Located in `src/data/` - Used for fallback and testing
- **Supabase Integration**: Complete with Prisma ORM for type-safe database operations
- **Database Models**: 
  - Core: `User`, `Team`, `Consultant` with role-based access
  - Performance: `DailyStats`, `WeeklyStats`, `Evaluation`, `CategoryScore`
  - Quality Control: `RiskAlert`, `Inspection`, `Feedback`
  - AI Analysis: `analysis_results`, `counselor_evaluations` (legacy tables)
  - Evaluation System: `EvaluationCategory` with weighted scoring

#### 3. AI Analysis Pipeline
1. **Upload**: Audio files uploaded via `/consultant/upload`
2. **Processing**: Replicate API analyzes audio for conversation quality metrics
3. **Webhook**: Real-time results received at `/api/webhook`
4. **Storage**: Results stored in `analysis_results` and `counselor_evaluations` tables
5. **Integration**: New evaluations created in `Evaluation` model with linked `CategoryScore`
6. **Display**: Comprehensive evaluation displayed in performance dashboards with real-time updates

#### 4. Component Architecture
- **Layout Components**: `Header`, `Sidebar`, `DashboardLayout` - Consistent navigation
- **UI System**: `src/components/ui/` - Reusable Button, Card, Badge, Select components with Radix UI
- **Feature Components**: `src/components/features/` - Domain-specific components
- **Performance Components**: `src/components/features/performance/` - Evaluation charts, conversation details
- **Charts**: `src/components/charts/` - RadarChart for performance visualization
- **Animations**: Framer Motion integration for smooth transitions

#### 5. State Management Pattern
- **Context Providers**: 
  - `SidebarContext` (navigation state)
  - `AnalysisResultContext` (AI results)
  - `DateRangeContext` (date filtering)
- **Custom Hooks**: 
  - Data fetching: `useConsultants`, `usePerformance`
  - UI state: `useModal`, `usePagination`, `useFilters`
- **Server Components**: Preferred for data fetching where possible
- **Client Components**: Used for interactive components with state

### Key Design Patterns

#### TypeScript Integration
- Path aliases: `@/*` maps to `src/*`
- Strict type checking enabled
- Comprehensive type definitions in `src/types/index.ts`
- Prisma-generated types for database models
- Custom utility types for component props and API responses

#### Styling System
- **Primary**: Tailwind CSS with custom LG font family (`LGEIText`, `LGEIHeadline`)
- **Components**: Class-based styling with consistent design tokens
- **Responsive**: Mobile-first responsive design throughout
- **Utilities**: Custom CSS utilities in `src/styles/` for animations, base styles, and themes
- **Component Variants**: Tailwind-based component variants for buttons, badges, and cards

#### Database Integration
- **ORM**: Prisma with PostgreSQL (Supabase)
- **Schema**: Comprehensive models with proper relationships and constraints
- **Seeding**: Database seeding available via `npm run db:seed` using TypeScript
- **Migrations**: Schema changes managed through Prisma migrations
- **Type Safety**: Full type safety from database to UI components

## Development Notes

### Active Development
Reference `REFACTORING_PLAN.md` for ongoing code quality improvements:
- Centralizing types and constants ✅
- Extracting reusable UI components ✅
- Implementing custom hooks for state management ✅
- Moving from mock data to Supabase integration ✅
- Performance optimization and caching strategies
- Enhanced error handling and loading states

### Backend Integration Status
Reference `backend-connect.md` and `supabase-frontend-mapping.md` for integration details:
- ✅ Supabase client configuration complete
- ✅ Database schema fully defined and seeded
- ✅ API routes implemented for data operations
- ✅ Type consistency maintained between database and frontend
- 🔄 Ongoing: Performance optimization and real-time features

### AI Integration
- **Replicate Platform**: Used for voice analysis with webhook-based result delivery
- **Analysis Metrics**: 
  - Politeness, empathy, problem-solving, emotional stability scores
  - Conversation flow and overall session quality
  - GPT-4 generated feedback and coaching recommendations
- **Real-time Updates**: Webhook endpoint handles analysis completion notifications
- **API Endpoints**: `/api/webhook`, `/api/predictions/[id]`, `/api/analyze-url`

### Role-Based Access
- **User Roles**: `ADMIN`, `QC_MANAGER`, `CONSULTANT`, `TEAM_LEAD`
- **Navigation**: `Sidebar` component dynamically renders based on user role
- **Route Protection**: Pages under `/consultant` vs `/qc` serve different user types
- **Data Filtering**: Performance data filtered by user role and permissions
- **Database-Level**: Role-based data access enforced through Prisma relations