# 🏗️ App Split Strategy: Client App + CS Portal

**Document Version**: 1.0  
**Created**: December 29, 2025  
**Status**: Planning - To be implemented after critical fixes  
**Estimated Effort**: 9-14 hours  

---

## 📋 Executive Summary

This document outlines the strategy for splitting the current monolithic YouConnect Discovery application into two separate applications:
1. **Client App** - Self-service onboarding for bank users
2. **CS Portal** - Internal management tool for RealWired CS agents

**Approach**: Monorepo with pnpm Workspaces + Shared UI Package

---

## 🎯 Why Split Into Two Apps?

### Client Requirements (Ed, Dec 19, 2025):
> "It's going to be two separate things."

### Business Reasons:

1. **Different User Bases**
   - **Client App**: Bank admins, loan officers, job managers
   - **CS Portal**: RealWired CS agents, account managers

2. **Different Security Models**
   - **Client App**: Single-tenant (one bank sees only their data)
   - **CS Portal**: Multi-tenant (agents see all banks)

3. **Different Deployment**
   - **Client App**: Bank-specific subdomains (`unionbank.youconnect.com`)
   - **CS Portal**: Single internal portal (`portal.realwired.com`)

4. **Independent Scaling**
   - Apps can scale independently based on usage
   - Different feature velocity for each app

5. **Handoff to InnoStacks**
   - Clear separation of concerns
   - Easier for dev team to understand
   - Can work on both simultaneously

---

## 🏗️ Recommended Architecture: Monorepo

### Structure Overview

```
youconnect-monorepo/
├── packages/
│   ├── client-app/              # Bank user onboarding app
│   │   ├── app/
│   │   │   ├── hub/
│   │   │   ├── organization-setup/
│   │   │   ├── definitions/
│   │   │   ├── users/
│   │   │   ├── vendors/
│   │   │   ├── routing-setup/
│   │   │   ├── general-settings/
│   │   │   ├── it-checklist/
│   │   │   └── test-order/
│   │   ├── components/          # Client-specific components
│   │   ├── lib/
│   │   │   ├── onboarding-context.tsx
│   │   │   ├── field-templates.ts
│   │   │   └── sample-data.ts
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── README.md
│   │
│   ├── cs-portal/               # CS agent portal app
│   │   ├── app/
│   │   │   ├── page.tsx         # Client list (was /cs-portal)
│   │   │   ├── clients/
│   │   │   │   ├── [clientId]/
│   │   │   │   │   ├── page.tsx      # Edit client
│   │   │   │   │   └── onboarding/   # View progress
│   │   │   ├── tickets/
│   │   │   └── notifications/
│   │   ├── components/          # CS-specific components
│   │   ├── lib/
│   │   │   └── cs-portal-context.tsx
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── README.md
│   │
│   └── shared-ui/               # Shared component library
│       ├── components/
│       │   ├── ui/              # Accordion, Button, Input, Modal, etc.
│       │   ├── layout/          # MainLayout, Breadcrumbs, Footer
│       │   ├── property-config/ # FormFieldPreview, EditConfigModal
│       │   ├── edit-config/     # Section components
│       │   └── general-settings/# SettingItem, Toggle
│       ├── lib/
│       │   ├── utils.ts
│       │   └── types.ts
│       ├── styles/
│       │   └── globals.css
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── docs/                        # Documentation
│   ├── patterns/
│   ├── features/
│   └── handoff/
│       ├── GETTING-STARTED.md
│       ├── ARCHITECTURE.md
│       └── API-INTEGRATION.md
│
├── package.json                 # Root package.json with workspaces
├── pnpm-workspace.yaml          # Workspace configuration
├── tsconfig.json                # Root TypeScript config
└── README.md                    # Main documentation
```

---

## 📦 Package Details

### Package 1: Client App

**Name**: `client-app`  
**Port**: 3000  
**Purpose**: Self-service onboarding for bank users

#### Routes:
- `/` → Hub with 3 tabs (Onboarding/Products/CS Team)
- `/organization-setup/*` → Module 1: Organization Setup
- `/definitions/*` → Module 2: Definitions
- `/users/*` → Module 3: Users & Lending Groups
- `/vendors/*` → Module 4: Vendors
- `/routing-setup/*` → Module 5: Routing
- `/general-settings/*` → Module 6: General Settings
- `/it-checklist/*` → Module 7: IT Checklist
- `/test-order` → Test order creation

#### State Management:
- `lib/onboarding-context.tsx` - Single bank's onboarding data
- `lib/field-templates.ts` - Property and request templates
- `lib/sample-properties.ts` - Sample data for preview
- `lib/sample-requests.ts` - Sample data for preview

#### Authentication:
- Bank user login (SSO or standard)
- Single-tenant: Only sees their bank's data

#### Deployment:
- Bank-specific subdomains: `{bank-name}.youconnect.com`
- Example: `unionbank.youconnect.com`

---

### Package 2: CS Portal

**Name**: `cs-portal`  
**Port**: 3001  
**Purpose**: Internal tool for RealWired CS agents

#### Routes:
- `/` → Client list (all banks)
- `/clients` → Client list with filters/search
- `/clients/[clientId]` → Edit client configuration
- `/clients/[clientId]/onboarding` → View client's onboarding progress
- `/clients/[clientId]/modules/[moduleId]` → Module-specific view
- `/tickets` → Ticket management dashboard
- `/notifications` → Notification center

#### State Management:
- `lib/cs-portal-context.tsx` - Multi-tenant data (all banks)
- Client selection context
- Ticket system context

#### Authentication:
- RealWired agent login
- Multi-tenant: Sees all banks
- Role-based access (agent, manager, admin)

#### Deployment:
- Single internal portal: `portal.realwired.com`
- Or: `cs.youconnect.com`

---

### Package 3: Shared UI

**Name**: `@youconnect/shared-ui`  
**Purpose**: Shared component library for consistent UI

#### Components:

**UI Components** (`components/ui/`):
- Accordion.tsx
- Breadcrumbs.tsx
- Button.tsx
- Card.tsx
- Checkbox.tsx
- Input.tsx
- Modal.tsx
- Select.tsx
- Tabs.tsx
- Textarea.tsx
- Toast.tsx
- VideoModal.tsx
- HelpModal.tsx
- RoutingVisualizerModal.tsx
- WorkbookUploadModal.tsx

**Layout Components** (`components/layout/`):
- MainLayout.tsx
- StickyFooterNav.tsx

**Property Config Components** (`components/property-config/`):
- FormFieldPreview.tsx
- TemplatePreviewModal.tsx
- FieldCard.tsx
- FieldSettingsDrawer.tsx

**Edit Config Components** (`components/edit-config/`):
- EditConfigModal.tsx
- PropertyOverviewSection.tsx
- PropertyAdvancedSection.tsx
- RequestFormSection.tsx

**General Settings Components** (`components/general-settings/`):
- SettingItem.tsx
- Toggle.tsx

**Bid Panel Components** (`components/bid-panel-config/`):
- BidPanelSelector.tsx

#### Utilities (`lib/`):
- utils.ts - Helper functions
- types.ts - Shared TypeScript types
- constants.ts - Shared constants

#### Styles:
- globals.css - Global styles
- tailwind.config.js - Tailwind configuration

---

## 🛠️ Implementation Plan

### Phase 1: Monorepo Setup (2-3 hours)

#### Step 1.1: Install Monorepo Tool
```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Create new directory
mkdir youconnect-monorepo
cd youconnect-monorepo

# Initialize root package.json
pnpm init
```

#### Step 1.2: Create Workspace Configuration

**Create `pnpm-workspace.yaml`:**
```yaml
packages:
  - 'packages/*'
```

**Update root `package.json`:**
```json
{
  "name": "youconnect-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev:client": "pnpm --filter client-app dev",
    "dev:portal": "pnpm --filter cs-portal dev",
    "dev:all": "pnpm --parallel --filter client-app --filter cs-portal dev",
    "build:client": "pnpm --filter client-app build",
    "build:portal": "pnpm --filter cs-portal build",
    "build:all": "pnpm --filter client-app --filter cs-portal build",
    "lint": "pnpm --recursive lint",
    "type-check": "pnpm --recursive type-check"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

#### Step 1.3: Create Package Directories
```bash
mkdir -p packages/client-app
mkdir -p packages/cs-portal
mkdir -p packages/shared-ui
```

---

### Phase 2: Shared UI Package Setup (1-2 hours)

#### Step 2.1: Create Shared UI Package.json

**File: `packages/shared-ui/package.json`**
```json
{
  "name": "@youconnect/shared-ui",
  "version": "1.0.0",
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    ".": "./index.ts",
    "./components/ui": "./components/ui/index.ts",
    "./components/layout": "./components/layout/index.ts",
    "./components/property-config": "./components/property-config/index.ts",
    "./components/edit-config": "./components/edit-config/index.ts",
    "./components/general-settings": "./components/general-settings/index.ts",
    "./lib/utils": "./lib/utils.ts",
    "./lib/types": "./lib/types.ts"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next": "^15.5.5",
    "lucide-react": "^0.344.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

#### Step 2.2: Move Shared Components

**Copy these from current `components/` to `packages/shared-ui/components/`:**

```bash
# UI components
components/ui/Accordion.tsx
components/ui/Breadcrumbs.tsx
components/ui/HelpModal.tsx
components/ui/VideoModal.tsx
components/ui/RoutingVisualizerModal.tsx
components/ui/WorkbookUploadModal.tsx
components/ui/StickyFooterNav.tsx
# ... all other UI components

# Layout components
components/layout/MainLayout.tsx

# Property config components
components/property-config/FormFieldPreview.tsx
components/property-config/TemplatePreviewModal.tsx
components/property-config/FieldCard.tsx
components/property-config/FieldSettingsDrawer.tsx

# Edit config components
components/edit-config/EditConfigModal.tsx
components/edit-config/PropertyOverviewSection.tsx
components/edit-config/PropertyAdvancedSection.tsx
components/edit-config/RequestFormSection.tsx

# General settings components
components/general-settings/SettingItem.tsx
components/general-settings/Toggle.tsx

# Bid panel components
components/bid-panel-config/BidPanelSelector.tsx
```

#### Step 2.3: Create Barrel Exports

**File: `packages/shared-ui/index.ts`**
```typescript
// Main barrel export
export * from './components/ui';
export * from './components/layout';
export * from './components/property-config';
export * from './components/edit-config';
export * from './components/general-settings';
export * from './lib/utils';
export * from './lib/types';
```

**File: `packages/shared-ui/components/ui/index.ts`**
```typescript
export { Accordion, AccordionItem } from './Accordion';
export { Breadcrumbs } from './Breadcrumbs';
export { HelpModal } from './HelpModal';
export { VideoModal } from './VideoModal';
export { RoutingVisualizerModal } from './RoutingVisualizerModal';
export { WorkbookUploadModal } from './WorkbookUploadModal';
export { StickyFooterNav } from './StickyFooterNav';
// ... other exports
```

#### Step 2.4: Create TypeScript Config

**File: `packages/shared-ui/tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

---

### Phase 3: Client App Package Setup (1-2 hours)

#### Step 3.1: Create Client App Package.json

**File: `packages/client-app/package.json`**
```json
{
  "name": "client-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start --port 3000",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@youconnect/shared-ui": "workspace:*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next": "^15.5.5",
    "lucide-react": "^0.344.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.5.5"
  }
}
```

#### Step 3.2: Move Client-Specific Code

**Copy these from current `app/` to `packages/client-app/app/`:**

```bash
app/hub/
app/organization-setup/
app/organization-setup-intro/
app/definitions/
app/definitions-intro/
app/users/
app/users-intro/
app/vendors/
app/vendors-intro/
app/routing-setup/
app/routing-intro/
app/general-settings/
app/general-settings-intro/
app/it-checklist/
app/it-checklist-intro/
app/test-order/
app/welcome/
app/layout.tsx
app/page.tsx
app/globals.css
app/favicon.ico
```

**Copy client-specific lib files:**
```bash
lib/onboarding-context.tsx
lib/field-templates.ts
lib/sample-properties.ts
lib/sample-requests.ts
```

#### Step 3.3: Update Imports in Client App

**Find and replace across client-app:**

```typescript
// OLD imports
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

// NEW imports
import { MainLayout, Button, Accordion } from "@youconnect/shared-ui";
```

**OR with granular imports:**
```typescript
import { MainLayout } from "@youconnect/shared-ui/components/layout";
import { Button } from "@youconnect/shared-ui/components/ui";
import { Accordion } from "@youconnect/shared-ui/components/ui";
```

#### Step 3.4: Create Client App Next Config

**File: `packages/client-app/next.config.ts`**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@youconnect/shared-ui"],
  experimental: {
    optimizePackageImports: ["@youconnect/shared-ui"],
  },
};

export default nextConfig;
```

#### Step 3.5: Create Client App TypeScript Config

**File: `packages/client-app/tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@youconnect/shared-ui": ["../shared-ui"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### Phase 4: CS Portal Package Setup (1-2 hours)

#### Step 4.1: Create CS Portal Package.json

**File: `packages/cs-portal/package.json`**
```json
{
  "name": "cs-portal",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start --port 3001",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@youconnect/shared-ui": "workspace:*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next": "^15.5.5",
    "lucide-react": "^0.344.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.5.5"
  }
}
```

#### Step 4.2: Move CS Portal Code

**Copy these from current `app/cs-portal/` to `packages/cs-portal/app/`:**

```bash
# Client list becomes root page
app/cs-portal/page.tsx → packages/cs-portal/app/page.tsx

# Edit client
app/cs-portal/edit-client/ → packages/cs-portal/app/clients/[clientId]/

# Client onboarding view
app/cs-portal/client-onboarding/ → packages/cs-portal/app/clients/[clientId]/onboarding/
```

**Reorganize CS Portal Routes:**

```
packages/cs-portal/app/
├── page.tsx                              # Client list (main page)
├── clients/
│   └── [clientId]/
│       ├── page.tsx                      # Edit client (tabs view)
│       ├── onboarding/
│       │   └── page.tsx                  # Onboarding progress view
│       └── modules/
│           └── [moduleId]/
│               └── page.tsx              # Module-specific view
├── tickets/
│   └── page.tsx                          # Ticket management
├── notifications/
│   └── page.tsx                          # Notification center
├── layout.tsx
└── globals.css
```

#### Step 4.3: Create CS Portal Context

**File: `packages/cs-portal/lib/cs-portal-context.tsx`**
```typescript
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Client {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  targetDate?: string;
  modules: Record<string, { completed: boolean; targetDate?: string }>;
}

interface Ticket {
  id: string;
  clientId: string;
  title: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface CSPortalContextType {
  clients: Client[];
  selectedClient: Client | null;
  selectClient: (clientId: string) => void;
  tickets: Ticket[];
  // ... other CS portal state
}

const CSPortalContext = createContext<CSPortalContextType | undefined>(undefined);

export function CSPortalProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const selectClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client || null);
  };

  return (
    <CSPortalContext.Provider value={{
      clients,
      selectedClient,
      selectClient,
      tickets,
    }}>
      {children}
    </CSPortalContext.Provider>
  );
}

export function useCSPortal() {
  const context = useContext(CSPortalContext);
  if (!context) {
    throw new Error('useCSPortal must be used within CSPortalProvider');
  }
  return context;
}
```

#### Step 4.4: Update CS Portal Imports

Same as client app - update all imports to use `@youconnect/shared-ui`.

#### Step 4.5: Create CS Portal Next Config

**File: `packages/cs-portal/next.config.ts`**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@youconnect/shared-ui"],
  experimental: {
    optimizePackageImports: ["@youconnect/shared-ui"],
  },
};

export default nextConfig;
```

#### Step 4.6: Create CS Portal TypeScript Config

**File: `packages/cs-portal/tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@youconnect/shared-ui": ["../shared-ui"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### Phase 5: Testing & Verification (1-2 hours)

#### Step 5.1: Install All Dependencies

```bash
# From root of monorepo
pnpm install
```

This will:
- Install all dependencies for all packages
- Create symlinks between packages (workspace:* dependencies)
- Set up the monorepo structure

#### Step 5.2: Test Client App

```bash
# Terminal 1: Run client app
pnpm dev:client

# Visit http://localhost:3000
# Test all 7 modules
# Verify all imports work
# Check that shared components render correctly
```

**Checklist:**
- [ ] Hub loads correctly
- [ ] Organization Setup module works
- [ ] Definitions module works
- [ ] All preview pages show sample data
- [ ] Edit modals open and function
- [ ] Footer navigation works
- [ ] Breadcrumbs work
- [ ] No import errors in console

#### Step 5.3: Test CS Portal

```bash
# Terminal 2: Run CS portal
pnpm dev:portal

# Visit http://localhost:3001
# Test client list
# Test edit client
# Verify all imports work
```

**Checklist:**
- [ ] Client list loads
- [ ] Can navigate to edit client
- [ ] Shared components work
- [ ] No import errors in console

#### Step 5.4: Test Both Apps Simultaneously

```bash
# Run both apps at once
pnpm dev:all

# Verify both run on different ports
# Client app: http://localhost:3000
# CS portal: http://localhost:3001
```

#### Step 5.5: Build Test

```bash
# Build both apps
pnpm build:all

# Verify both build successfully
# Check for any TypeScript errors
# Check for any build warnings
```

---

### Phase 6: Documentation (2-3 hours)

#### Step 6.1: Create Main README

**File: `README.md` (root)**
```markdown
# YouConnect Monorepo

Monorepo containing the YouConnect Client App and CS Portal.

## Structure

- `packages/client-app` - Bank user onboarding application
- `packages/cs-portal` - CS agent portal for managing clients
- `packages/shared-ui` - Shared UI component library

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+ (Install: `npm install -g pnpm`)

### Installation
```bash
pnpm install
```

### Development
```bash
# Run client app only
pnpm dev:client        # http://localhost:3000

# Run CS portal only
pnpm dev:portal        # http://localhost:3001

# Run both simultaneously
pnpm dev:all
```

### Building
```bash
# Build both apps
pnpm build:all

# Build specific app
pnpm build:client
pnpm build:portal
```

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Client App README](./packages/client-app/README.md)
- [CS Portal README](./packages/cs-portal/README.md)
- [Shared UI README](./packages/shared-ui/README.md)
```

#### Step 6.2: Create Architecture Documentation

**File: `docs/ARCHITECTURE.md`**

```markdown
# Architecture Overview

## Why Monorepo?

This project uses a monorepo structure to:
1. Share UI components between client app and CS portal
2. Maintain consistency across both applications
3. Simplify development workflow
4. Enable easier handoff to development team

## Package Structure

### Client App (`packages/client-app`)
- Self-service onboarding for bank users
- 7 onboarding modules
- Single-tenant architecture
- Deployed per bank: `{bank}.youconnect.com`

### CS Portal (`packages/cs-portal`)
- Internal tool for CS agents
- Multi-tenant client management
- Ticket system
- Progress monitoring
- Deployed centrally: `portal.realwired.com`

### Shared UI (`packages/shared-ui`)
- Component library used by both apps
- Ensures UI consistency
- Includes layout, form, and configuration components

## State Management

### Client App State
- `onboarding-context.tsx` - Single bank's onboarding data
- Persists across modules
- Local state only (no backend yet)

### CS Portal State
- `cs-portal-context.tsx` - Multi-tenant data
- Manages multiple clients
- Ticket and notification state

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Monorepo Tool**: pnpm workspaces
- **Build Tool**: Next.js built-in bundler

## Deployment Strategy

### Client App
- Static export or server-side rendering
- Deploy to Vercel, AWS, or custom infrastructure
- Each bank gets subdomain
- Environment variables per deployment

### CS Portal
- Single deployment
- Authentication required
- Internal access only
- Can be behind VPN

## Future Scaling

### Phase 1: MVP (Current)
- Mock data
- No authentication
- Local state management

### Phase 2: Backend Integration
- Connect to API
- Database persistence
- Real authentication
- Multi-tenancy

### Phase 3: Production
- Full feature set
- Monitoring and analytics
- Error tracking
- Performance optimization
```

#### Step 6.3: Create Development Guide

**File: `docs/DEVELOPMENT.md`**

```markdown
# Development Guide

## Setup

1. **Install pnpm**
   ```bash
   npm install -g pnpm
   ```

2. **Clone repository**
   ```bash
   git clone <repo-url>
   cd youconnect-monorepo
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Run development servers**
   ```bash
   # Client app on :3000
   pnpm dev:client
   
   # CS portal on :3001
   pnpm dev:portal
   
   # Both apps
   pnpm dev:all
   ```

## Adding New Components

### Shared Component (Used by Both Apps)
1. Create in `packages/shared-ui/components/`
2. Export from appropriate barrel file
3. Use in client-app or cs-portal:
   ```typescript
   import { MyComponent } from '@youconnect/shared-ui';
   ```

### App-Specific Component
1. Create in `packages/client-app/components/` or `packages/cs-portal/components/`
2. Import with relative path:
   ```typescript
   import { MyComponent } from '@/components/MyComponent';
   ```

## Common Tasks

### Adding a New Package
```bash
mkdir packages/new-package
cd packages/new-package
pnpm init
```

### Adding Dependencies
```bash
# To specific package
pnpm --filter client-app add <package-name>
pnpm --filter cs-portal add <package-name>

# To shared-ui
pnpm --filter @youconnect/shared-ui add <package-name>

# To root (dev dependencies)
pnpm add -D -w <package-name>
```

### Type Checking
```bash
# All packages
pnpm type-check

# Specific package
pnpm --filter client-app type-check
```

### Linting
```bash
# All packages
pnpm lint

# Specific package
pnpm --filter client-app lint
```

## Troubleshooting

### Import Errors
If you see "Cannot find module '@youconnect/shared-ui'":
1. Run `pnpm install` from root
2. Check `next.config.ts` has `transpilePackages`
3. Check `tsconfig.json` has correct `paths` mapping

### Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in package.json
"dev": "next dev --port 3002"
```

### Dependency Issues
```bash
# Clean all node_modules
pnpm -r exec rm -rf node_modules
rm -rf node_modules

# Clean all build artifacts
pnpm -r exec rm -rf .next
pnpm -r exec rm -rf dist

# Reinstall
pnpm install
```

## Best Practices

1. **Keep shared-ui pure**: No business logic, only UI components
2. **Use TypeScript strictly**: No `any` types
3. **Test in both apps**: Changes to shared-ui affect both
4. **Document complex components**: Add JSDoc comments
5. **Follow naming conventions**: PascalCase for components, camelCase for functions
```

#### Step 6.4: Create Client App README

**File: `packages/client-app/README.md`**

```markdown
# Client App

Self-service onboarding application for bank users.

## Routes

- `/` - Hub with 3 tabs
- `/organization-setup/*` - Module 1
- `/definitions/*` - Module 2  
- `/users/*` - Module 3
- `/vendors/*` - Module 4
- `/routing-setup/*` - Module 5
- `/general-settings/*` - Module 6
- `/it-checklist/*` - Module 7
- `/test-order` - Test order creation

## Key Features

1. **7-Module Onboarding**: Complete configuration flow
2. **Template-First Approach**: Start with templates, customize later
3. **Preview Mode**: See configuration before applying
4. **Section-by-Section Editing**: Reduce cognitive load
5. **Progress Tracking**: Always know where you are

## State Management

`lib/onboarding-context.tsx` manages all onboarding state.

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Adding a New Module

1. Create intro page: `app/{module}-intro/page.tsx`
2. Create main page: `app/{module}/page.tsx`
3. Create complete page: `app/{module}/complete/page.tsx`
4. Update context types in `lib/onboarding-context.tsx`
5. Add to hub in `app/hub/page.tsx`
```

#### Step 6.5: Create CS Portal README

**File: `packages/cs-portal/README.md`**

```markdown
# CS Portal

Internal management portal for RealWired CS agents.

## Routes

- `/` - Client list (all banks)
- `/clients/[clientId]` - Edit client configuration
- `/clients/[clientId]/onboarding` - View onboarding progress
- `/tickets` - Ticket management
- `/notifications` - Notification center

## Key Features

1. **Multi-Tenant Client Management**: View all banks
2. **Progress Monitoring**: Track onboarding completion
3. **Ticket System**: Manage client issues
4. **Module Target Dates**: Set and track deadlines
5. **Configuration Editor**: Edit client settings

## State Management

`lib/cs-portal-context.tsx` manages CS portal state.

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Adding New CS Features

1. Create page in `app/` directory
2. Add to navigation
3. Update context if needed
4. Use shared components from `@youconnect/shared-ui`
```

#### Step 6.6: Create Shared UI README

**File: `packages/shared-ui/README.md`**

```markdown
# Shared UI Library

Shared component library for YouConnect applications.

## Components

### UI Components
- Accordion - Expandable content sections
- Breadcrumbs - Navigation breadcrumbs
- Button - Standard button component
- Modal - Dialog/modal overlays
- Input, Select, Textarea - Form controls

### Layout Components
- MainLayout - Page wrapper with header/footer
- StickyFooterNav - Fixed footer navigation

### Configuration Components
- EditConfigModal - Full-screen section-by-section editor
- FormFieldPreview - Preview form fields with sample data
- PropertyOverviewSection - Property configuration section
- RequestFormSection - Request form configuration section

## Usage

```typescript
// Import from main package
import { MainLayout, Button, Accordion } from '@youconnect/shared-ui';

// Or granular imports
import { MainLayout } from '@youconnect/shared-ui/components/layout';
import { Button } from '@youconnect/shared-ui/components/ui';
```

## Adding New Components

1. Create component in appropriate directory
2. Export from barrel file (index.ts)
3. Add TypeScript types
4. Document props with JSDoc

Example:
```typescript
/**
 * Button component with consistent styling
 * @param variant - Visual style variant
 * @param size - Size variant
 * @param children - Button content
 */
export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children 
}: ButtonProps) {
  // ...
}
```

## Development

This package is consumed by client-app and cs-portal via workspace references.

Changes here immediately affect both apps in development.
```

#### Step 6.7: Create API Integration Guide

**File: `docs/handoff/API-INTEGRATION.md`**

```markdown
# API Integration Guide

Guide for connecting to backend API (for InnoStacks team).

## Current State

- **Mock Data**: All data is currently mocked in React Context
- **No Backend**: No API calls being made
- **Local State**: Everything is in-memory

## Where to Add API Calls

### Client App

#### Organization Setup
- **File**: `packages/client-app/lib/onboarding-context.tsx`
- **Function**: `updateCompanySetup()`
- **Action**: POST to `/api/onboarding/company-setup`

#### Definitions
- **Function**: `updateDefinitions()`
- **Action**: POST to `/api/onboarding/definitions`

#### Save Progress
- **Function**: `markModuleComplete()`
- **Action**: PATCH to `/api/onboarding/modules/{moduleId}`

### CS Portal

#### Get Client List
- **File**: `packages/cs-portal/lib/cs-portal-context.tsx`
- **Function**: `fetchClients()`
- **Action**: GET from `/api/cs/clients`

#### Update Client
- **Function**: `updateClient()`
- **Action**: PATCH to `/api/cs/clients/{clientId}`

## Recommended API Structure

```
/api/
  /auth/
    POST /login
    POST /logout
    GET /me
  
  /client/                    # Client app endpoints
    /onboarding/
      GET /progress           # Get current progress
      POST /company-setup     # Save company setup
      POST /definitions       # Save definitions
      PATCH /modules/:id      # Update module status
    
  /cs/                        # CS portal endpoints
    /clients/
      GET /                   # List all clients
      GET /:clientId          # Get client details
      PATCH /:clientId        # Update client
      POST /                  # Create new client
    /tickets/
      GET /                   # List tickets
      POST /                  # Create ticket
      PATCH /:ticketId        # Update ticket
```

## Authentication

### Client App
```typescript
// Add auth to onboarding context
const [user, setUser] = useState<User | null>(null);

async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const { token, user } = await response.json();
  localStorage.setItem('auth_token', token);
  setUser(user);
}
```

### CS Portal
```typescript
// Similar auth pattern with CS agent permissions
async function loginAgent(email: string, password: string) {
  // ...
}
```

## Error Handling

```typescript
async function saveProgress() {
  try {
    const response = await fetch('/api/onboarding/save', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Save failed:', error);
    // Show error toast to user
    showErrorToast('Failed to save progress');
  }
}
```

## Data Persistence

Currently in React Context. Move to:
1. API calls on change
2. Optimistic updates (update UI immediately, rollback on error)
3. Debounce frequent updates (auto-save)

## Next Steps

1. Set up backend API (Node.js/Express, Python/Django, etc.)
2. Define database schema
3. Replace Context updates with API calls
4. Add loading states
5. Add error handling
6. Add offline support (optional)
```

---

## 📅 Implementation Timeline

| Phase | Duration | Dependencies | Can Start After |
|-------|----------|--------------|-----------------|
| **Phase 1**: Monorepo Setup | 2-3h | None | Anytime |
| **Phase 2**: Shared UI Setup | 1-2h | Phase 1 | Phase 1 complete |
| **Phase 3**: Client App Setup | 1-2h | Phase 2 | Phase 2 complete |
| **Phase 4**: CS Portal Setup | 1-2h | Phase 2 | Phase 2 complete |
| **Phase 5**: Testing | 1-2h | Phases 3 & 4 | All setup complete |
| **Phase 6**: Documentation | 2-3h | Phase 5 | Testing complete |

**Total Duration**: 9-14 hours

**Recommended Schedule**:
- **After** completing Sprint 1 (Dec 19 critical fixes)
- Can be done in 2-3 days
- Or spread across a week

---

## ✅ Pre-Implementation Checklist

Before starting the split, ensure:

- [ ] All critical Dec 19 fixes are complete
- [ ] Current app is working correctly
- [ ] All tests pass (if any)
- [ ] No pending PRs or unstaged changes
- [ ] Backup/commit current state
- [ ] pnpm installed globally
- [ ] Node.js 18+ installed
- [ ] Sufficient disk space (~2GB)

---

## 🎁 Handoff Checklist

When ready to hand off to InnoStacks:

- [ ] Both apps run successfully
- [ ] All documentation created
- [ ] README files comprehensive
- [ ] Example .env files provided
- [ ] CI/CD configuration (if needed)
- [ ] Deployment instructions
- [ ] API integration guide
- [ ] Component library documented
- [ ] Code comments added
- [ ] No TODOs in critical paths
- [ ] TypeScript errors resolved
- [ ] Linter warnings addressed

---

## 🔮 Future Considerations

### If You Need to Split Further (Later)

**Extract Shared UI to NPM Package**:
```bash
cd packages/shared-ui
npm publish @youconnect/ui
```

Then update client-app and cs-portal:
```json
{
  "dependencies": {
    "@youconnect/ui": "^1.0.0"  // Instead of workspace:*
  }
}
```

### If You Need Separate Repos (Later)

1. Create three repos:
   - `youconnect-client`
   - `youconnect-cs-portal`
   - `youconnect-ui`

2. Move each package to its repo

3. Publish `youconnect-ui` to npm

4. Update dependencies in client and portal

---

## 📞 Questions & Decisions Needed

Before implementation, decide:

1. **Monorepo Tool**:
   - ✅ pnpm workspaces (recommended)
   - ⚠️ yarn workspaces
   - ⚠️ npm workspaces

2. **Repository Hosting**:
   - GitHub
   - GitLab
   - Bitbucket

3. **Deployment**:
   - Vercel (easiest for Next.js)
   - AWS Amplify
   - Netlify
   - Custom infrastructure

4. **Domain Structure**:
   - Client: `{bank}.youconnect.com`
   - CS Portal: `portal.realwired.com` or `cs.youconnect.com`

5. **Authentication**:
   - Will InnoStacks handle?
   - Need placeholders?
   - OAuth/SAML/Custom?

---

## 📚 Reference Links

- [pnpm Workspaces Documentation](https://pnpm.io/workspaces)
- [Next.js Monorepo Guide](https://nextjs.org/docs/app/building-your-application/configuring/multi-zone)
- [TypeScript Monorepo Best Practices](https://www.typescriptlang.org/docs/handbook/project-references.html)

---

## 📝 Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2025-12-29 | 1.0 | Initial document created |

---

**Status**: Ready for implementation after critical fixes complete  
**Next Step**: Complete Sprint 1 (Dec 19 fixes), then begin Phase 1 of split

