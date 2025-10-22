# YouConnect Onboarding Application

A modern, modular onboarding experience for YouConnect built with Next.js 15, React 19, and TypeScript.

## Overview

This application provides a streamlined 6-module onboarding flow that guides users through setting up your YouConnect account. Each module is independent, features celebration animations, and returns to a central hub for flexible navigation. After all modules are complete, the hub offers CTAs to schedule a meeting and create a Test Order.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application. The home page will automatically redirect to the first module.

### Build for Production

```bash
npm run build
npm start
```

## Application Structure

### The 6 Modules

1. **Organization Setup** (~10 min)
   - Configure services offered
   - Select request processes
   - Define operating regions and locations

2. **Definitions** (~18 min)
   - Define property categories
   - Configure request types
   - Customize property and request form fields

3. **Team & Groups** (~12 min)
   - Add team members with roles
   - Create lending groups
   - Import users via workbook

4. **Routing** (~12 min)
   - Configure smart routing rules
   - Set up priority-based assignment
   - Define logical routing conditions

5. **General Settings** (~8 min)
   - Configure workflow timers
   - Set notification preferences
   - Review bid engagement settings

6. **IT Readiness Checklist** (~2 min)
   - Confirm email domains are allowlisted
   - Verify platform URL access from your network
   - Ensure users can receive notifications and access the app

### Key Features

- ✨ **Modular Design**: Complete modules in any order (after Module 1)
- 🎉 **Celebration Moments**: Confetti animations after each completion
- 🎯 **Hub Navigation**: Central dashboard showing progress across all modules
 - 🧪 **Post-completion Test Order**: Create a sample order from the hub to validate routing
- 💾 **State Persistence**: React Context preserves all configuration choices
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile
- ♿ **Accessible**: WCAG AA compliant with proper ARIA labels
- 🚀 **No Backend Required**: Fully simulated data for prototyping

## Tech Stack

- **Framework**: Next.js 15.5.5 (App Router)
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Context API
- **Linting**: ESLint with Next.js config

## Project Structure

```
youconnect-discovery/
├── app/                              # Next.js 15 App Router pages
│   ├── page.tsx                      # Home (auto-redirects to Module 1)
│   ├── hub/                          # Central navigation hub
│   ├── organization-setup/           # Module 1
│   ├── organization-setup-intro/     # Module 1 entry
│   ├── definitions/                  # Module 2
│   ├── definitions-intro/            # Module 2 entry
│   ├── users/                        # Module 3
│   ├── users-intro/                  # Module 3 entry
│   ├── routing-setup/                # Module 4
│   ├── routing-intro/                # Module 4 entry
│   ├── general-settings/             # Module 5
│   ├── general-settings-intro/       # Module 5 entry
│   ├── it-checklist/                 # Module 6
│   ├── it-checklist-intro/           # Module 6 entry
│   ├── test-order/                   # Post-completion Test Order page
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── components/
│   ├── layout/
│   │   └── MainLayout.tsx            # Main page wrapper
│   └── ui/
│       ├── HelpModal.tsx             # Support modal
│       ├── VideoModal.tsx            # Video walkthrough modal
│       ├── RoutingVisualizerModal.tsx# Routing visualization
│       └── WorkbookUploadModal.tsx   # File upload modal
├── lib/
│   ├── onboarding-context.tsx        # Global state management
│   ├── sample-properties.ts          # Sample property data
│   ├── sample-requests.ts            # Sample request data
│   └── utils.ts                      # Utility functions
├── context/                          # Documentation and PRDs
├── documents/                        # Reference materials
├── public/                           # Static assets
└── package.json                      # Dependencies

```

## State Management

The application uses React Context (`OnboardingProvider`) to manage global state across all modules:

- **Company Setup**: Services, regions, locations
- **Definitions**: Request types, properties, form configurations
- **Users**: Team members, roles, lending groups
- **Routing**: Rules, priorities, assignments
- **General Settings**: Timers, notifications, bid panels
- **IT Checklist**: Technical setup verification

All state is preserved throughout the onboarding journey and can be accessed from any module.

## Development Guidelines

### Adding a New Module

1. Create module entry page: `app/[module-name]-intro/page.tsx`
2. Create main config page: `app/[module-name]/page.tsx`
3. Create completion page: `app/[module-name]/complete/page.tsx`
4. Update `OnboardingModule` type in `lib/onboarding-context.tsx`
5. Add state interface and update methods in context
6. Update hub page to include new module

### Styling Conventions

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing (mb-6, gap-4, etc.)
- Use brand color: `#9F2E2B` (burgundy)
- Educational panels: blue gradient background

### Accessibility

- Always include ARIA labels
- Maintain keyboard navigation
- Use semantic HTML elements
- Provide alternative text for images
- Test with screen readers

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Documentation

- **ROUTES-SUMMARY.md**: Complete route documentation and navigation flows
- **context/features/**: Feature-specific PRDs
- **documents/**: Onboarding materials and reference docs

## Testing

The application uses simulated data with setTimeout delays to mimic backend operations. No actual API calls are made, making it perfect for prototyping and user testing.

To test the full flow:
1. Start at http://localhost:3000
2. Complete Module 1 (Organization Setup)
3. See the Hub for the first time
4. Complete remaining modules (Definitions, Team & Groups, Routing, General Settings, IT Checklist)
5. View hub "All Complete" celebration
6. From the hub, choose "Create Test Order" to simulate routing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a prototype application. For production deployment, consider:
- Connecting to a real backend API
- Adding authentication and authorization
- Implementing data persistence (database)
- Adding comprehensive test coverage
- Setting up CI/CD pipelines

## License

Proprietary - All rights reserved

## Contact

For questions or support, contact the YouConnect team.
