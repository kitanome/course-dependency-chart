<!-- # Application Features Diagram

## Show map of courses

- Displays all applicable courses as connected nodes.

## Course Descriptions

- Clicking on a course node opens a window with:
  - Course description (SPIRE)
  - Dependencies
  - Possible bypasses
  - Special Info (Spring/Fall Only, Required for All, etc.)
  - Professor/Instructor Info
  - (Optional) Track affiliation (General Requirement, Robotics, etc.)

## Filter and Select

- Features:
  - Toggle filter for specific criteria
  - Local list for adding courses
  - "Show only selected courses" toggle
  - (Optional) Filter by tracks

## Adding Notes

- Users can submit notes under course descriptions for additional insights.

## Course Planning Function

- Selected courses can be arranged in a separate view as visual horizontal layers (semesters).

## (Optional) Written Guide

- Pop-up at the start to guide freshmen on course selection considerations. -->

```mermaid
flowchart TD
    A[Start] --> B[Show Map of Courses]
    B --> C[Course Descriptions]
    C --> D[Filter and Select]
    D --> E[Adding Notes]
    E --> F[Course Planning Function]
    F --> G[Written Guide]
    G --> H[End]
```

```mermaid
sequenceDiagram
    participant User
    participant System

    User->>System: Open Course Map
    System-->>User: Display courses as nodes
    User->>System: Click on a course node
    System-->>User: Show course description and details
    User->>System: Apply filters
    System-->>User: Update course list based on filters
    User->>System: Add courses to local list
    User->>System: Submit notes
    System-->>User: Confirm note submission
    User->>System: Arrange selected courses
    System-->>User: Display arranged courses by semester
    User->>System: Request written guide
    System-->>User: Show pop-up guide
```
