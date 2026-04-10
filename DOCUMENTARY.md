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

## Key Features
- Skill search and selection UI
- Location search with an expanded EU city dataset
- Country-based bulk city selection
- Collapsible skill and location sections
- Selected items shown as removable tags

## Technology Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint

## Current Status
- Development version complete and validated with `npm run build`
- Project initialized as a Git repository and pushed to GitHub
- Documentation created in `DOCUMENTARY.md`

## Next Steps
- Add a backend API for job matching
- Integrate LinkedIn job feed or job scraping
- Add user authentication and saved filter profiles
- Create a dashboard for filtered job results
