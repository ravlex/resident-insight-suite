# Dashboard Prototype for Utility Management System (LKV)

This plan outlines the creation of a clickable dashboard prototype for a Management Company (UK) / Resource Supplying Organization (RSO) portal. The goal is to visualize key "pain points" identified in the concept phase, such as collection rates, debt management, and resident interaction.

## UI/UX Design
- **Modern Minimalist Business Layout**: A professional sidebar navigation with a main content area.
- **Color Palette**: Clean white background with primary blue/indigo accents for a reliable, enterprise feel.
- **Key Modules**:
    - **Overview Dashboard**: High-level metrics (Collection %, Total Billed vs. Collected).
    - **Debt Management**: Segmentation of debtors and automation tools (PDF generation, tracking).
    - **Resident Interactions**: A dashboard for tracking requests and AI-assisted responses.
    - **Analytics**: Visual charts for billing trends.

## Technical Details
- **Framework**: TanStack Start (React 19) with Tailwind CSS v4.
- **Components**: Shadcn/UI for consistent, accessible interface elements.
- **Data Layer**: Mock data generated within the components to demonstrate functionality without a backend.
- **Navigation**: Sidebar with routes for Dashboard, Debtors, Requests, and Reports.

## Implementation Steps
1. **Layout Setup**: Update `src/routes/__root.tsx` to include a standard sidebar layout and a `<Toaster />` for notifications.
2. **Dashboard Route**: Implement `src/routes/index.tsx` as the main summary dashboard with metric cards and collection charts (using `recharts` or `lucide-react` icons).
3. **Debtors Module**: Create `src/routes/debtors.tsx` featuring a searchable table with status badges and action buttons for generating notices.
4. **Resident Requests**: Create `src/routes/requests.tsx` to showcase an "AI-assisted" workflow for managing resident tickets.
5. **Interactive Elements**: Add tooltips and simple state handling to simulate data filtering and report generation.
