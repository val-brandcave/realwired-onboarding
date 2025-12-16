# CS Agent Portal Feature

## Overview
Interface for Customer Success agents to manage multiple client onboarding projects, track progress, and handle support tickets.

## Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| **[CS-PORTAL-ACCORDION-UPDATE.md](CS-PORTAL-ACCORDION-UPDATE.md)** | Accordion UI updates | Developers, Designers |

## Quick Access

### Main Routes
- **Client List**: http://localhost:3000/cs-portal
- **Edit Client**: http://localhost:3000/cs-portal/edit-client
- **Client Onboarding**: http://localhost:3000/cs-portal/client-onboarding

### Key Features
1. **Client List View**
   - See all clients with progress indicators
   - Filter and sort clients
   - Quick access to edit each client

2. **Edit Client Page**
   - Module-by-module configuration
   - Set target completion dates (📅 calendar icons)
   - Track progress with donuts
   - Manage support tickets
   - View client notifications

3. **Client Onboarding View**
   - CS agent view of client's progress
   - Module tabs showing client status
   - Waiting indicators for client actions

## Related Features
- **Module Completion Dates**: See [../MODULE-DATES/](../MODULE-DATES/)
- **Fields Configuration**: See [../FIELDS/](../FIELDS/)

## Status
✅ Fully implemented with module dates feature integrated

## For More Information
See **[ROUTES-SUMMARY.md](../../../ROUTES-SUMMARY.md)** section on CS Agent Portal routes.

