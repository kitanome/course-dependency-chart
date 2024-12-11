# course-dependency-chart
  Built for students who would like to see course planning in a more visual way.

## Demo


## Features
  - Canvas that shows courses in the order of prerequisites, as a top-down directed graph
  (currently limited to CS Major courses offered in Spring 2025)
  - Sidebar that displays course information upon clicking node:
    - Description
    - Credits
    - Prerequisites
    - Instructors
  - Search filter bar that highlights course names that match
  - User authentication system, with persistence that saves session on website reload
  - Comments section that users can add reviews on each course
  - A toggle for user to save courses of interest
  - (Unfinished) A toggle that refreshes the graph to contain only user-selected courses

## Stack
  - Frontend:
    - JavaScript UI, organized into components.
    - Graph generation done using [dagre-d3](https://github.com/dagrejs/dagre-d3)
      - Note : Library has very little documentation and not actively maintained (took us a lot longer to figure it out than we had hoped)
  - Backend:
    - Backend application using [express.js](https://www.passportjs.org)
    - Course data obtained from [Daniel Melanson's SPIRE API](https://spire-api.melanson.dev/), combined with text scraped from [UMass Spring 2025 Course Descriptions](https://content.cs.umass.edu/content/spring-2025-course-descriptions?_gl=1*1bpqesh*_gcl_au*MTI1MzYxNjE3MS4xNzMwMjU0Mjkw*_ga*MTM1NzU4NTkxNi4xNzMwMjU0Mjkx*_ga_21RLS0L7EB*MTczMzg4ODk4Mi40OC4wLjE3MzM4ODg5ODIuMC4wLjA.)
    - Scraping scripts written in Python
    - SQLite Database for Courses and Users, set up using Sequelize
    - User Authentication backend using [passport.js](https://www.passportjs.org)
