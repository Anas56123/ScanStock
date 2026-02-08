# ScanStock Project Sprints

This document tracks the iterative development of the ScanStock application.

## Sprint 1: Foundation & Core Infrastructure
**Focus:** Establishing the base architecture and backend connectivity.
**Key Deliverables:**
- Initialize Expo project with TypeScript and ESLint configuration.
- Setup Supabase client integration and environment variables.
- Configure global state management with Zustand.
- Establish the Design System using React Native Paper and custom themes.
- Establish the base Navigation Stack.

## Sprint 2: Product Identification & Scanning
**Focus:** Enabling the core "Scan" functionality and external data lookup.
**Key Deliverables:**
- Implement barcode/QR scanning using expo-camera.
- Integrate OpenFoodFacts API as a fallback for product metadata.
- Develop the ScanScreen UI with real-time feedback and overlays.
- Handle camera permissions and device haptics for scan confirmation.

## Sprint 3: Product Management & Data Layer
**Focus:** Building the persistence layer and product entry workflows.
**Key Deliverables:**
- Create Supabase database schema for Products and Sales.
- Implement Product CRUD operations (Create, Read, Update, Delete).
- Develop the "Add Product" form with Zod schema validation.
- Setup React Query for efficient data fetching and caching.

## Sprint 4: Sales Workflow & Product Details
**Focus:** Implementing the business logic for inventory updates.
**Key Deliverables:**
- Build the ProductDetails screen with stock information.
- Implement the "Sell Product" logic (decrementing quantity in database).
- Create Sales transaction records for history tracking.
- Implement quantity controls and price management.

## Sprint 5: Dashboard & UX Refinement
**Focus:** Polishing the user experience and final dashboard visuals.
**Key Deliverables:**
- Finalize HomeScreen dashboard with product listing and search.
- Add micro-animations using react-native-reanimated.
- Implement empty states, loading skeletons, and error handling.
- Optimization of image loading via expo-image and final assets polish.

## Sprint 6: Unified Authentication & User Roles
**Focus:** Securing the application and managing seller/customer access.
**Key Deliverables:**
- Implement complete Auth workflow: Login, Registration, and Password Reset.
- Setup Role-Based Access Control (RBAC) for 'seller' and 'customer' roles.
- Integrate Supabase Auth sessions with global state management.
- Develop polished Login/Signup UI with real-time validation.

## Sprint 7: Theming & Visual Excellence (Dark Mode)
**Focus:** Providing a premium, accessible UI with full theme support.
**Key Deliverables:**
- Implement dynamic Dark/Light theme switching mechanism in MainNavigator.
- Refactor core components (Input, Button, Card) to use persistent theme tokens.
- Enhance theme definitions with proper Surface and Text contrast (onSurfaceVariant).
- Fix hardcoded color issues in loaders, inputs, and FAB components for seamless dark mode.
