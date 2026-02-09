# UserManagementDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Overview
This project showcases a complete user management workflow including listing users, searching, filtering, viewing details, routing, and error handling.  
It follows **Angular standalone architecture**, **strict TypeScript**, and **clean service-based design**.

---

## Features
- User list (card & table views)
- Search by name or email (debounced)
- City-based filtering
- User detail page with full information
- Pagination (6 users per page)
- Dark mode with persistence
- Loading & error handling
- Responsive design
- In-memory caching
- Accessible & semantic HTML

---

## Tech Stack
- Angular 19
- TypeScript 5.6
- RxJS 7.8
- Angular Router
- HttpClient
- CSS Variables
- JSONPlaceholder API

---

## Installation & Run
```bash
git clone https://github.com/your-username/user-management-dashboard.git
cd user-management-dashboard
npm install
npm start
```

App runs at: http://localhost:4200

---

## Project Structure
```
src/
├── app/components (user-list, user-detail)
├── app/services (user.service.ts)
├── app/models (user.ts)
├── app.routes.ts
├── styles.css
└── main.ts
```

---

## Key Highlights
- Standalone Angular components
- RxJS-based debounced search
- Service-based API architecture
- Strict TypeScript (no `any`)
- Clean routing & state handling

---

## Build
```bash
ng build --configuration production
```


## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
