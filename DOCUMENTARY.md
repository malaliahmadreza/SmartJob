# SmartJob Project Documentary

## Overview
SmartJob is a lightweight Next.js application built to support smarter job search and filtering for LinkedIn-style roles. The current version focuses on skill selection and European location filtering.

## What’s Included
- `app/page.tsx`: Home landing page with SmartJob branding and navigation to the filter planner.
- `app/filter/page.tsx`: Interactive filter page allowing users to:
  - search and select up to 10 skills
  - search European cities and countries
  - choose all cities for a selected country
  - toggle visibility for skill and location sections
  - view and remove selected skills and cities
  - filter jobs by posting time (Last 1hr to Last 30 days)
  - view filtered job results with AND logic for skills matching

## Key Features
- Skill search and selection UI (max 10 skills)
- Location search with an expanded EU city dataset
- Country-based bulk city selection
- Collapsible skill and location sections
- Time-based job posting filters
- Job results display with skill matching (AND logic)
- **Clickable job results** that open original LinkedIn job ads in new tabs
- Selected items shown as removable tags
- Minimized filters when results are shown

## Technology Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint

## Current Status
- Development version complete and validated with `npm run build`
- Project initialized as a Git repository and pushed to GitHub
- Documentation created in `DOCUMENTARY.md`
- Latest update: Implemented complete job search functionality with mock data, time-based filtering, AND logic for skills, and results display with proper styling

## Next Steps
- Add a backend API for job matching
- Integrate LinkedIn job feed or job scraping
- Add user authentication and saved filter profiles
- Create a dashboard for filtered job results
