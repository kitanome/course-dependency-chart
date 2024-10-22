# Application Data

## Overview

### 1. User Profile

- **Description**: Contains personal information about the user.
- **Attributes**:
  - `user_id` (string): A unique identifier for each user.
  - `name` (string): The user's full name.
  - `email` (string): The user's email address.
  - `password` (string): A hashed version of the user's password.
  - `student_id` (int): The user's preferred currency (e.g., USD, EUR).
- **Data Source**: User-input data when registering or updating their profile.

### 2. Course Data

- **Description**: Contains information about courses offered at UMass.
- **Attributes**:
  - `course_id` (string): A unique identifier for each course.
  - `name` (string): The course's name.
  - `description` (string): The course's description.
  - `prerequisites` (string array): A list of all course prerequisites in form of course_id.
  - `corequisites` (string array): A list of all course corequisites in form of course_id.
  - `credits` (int): How many credits are rewarded upon completion.
  - `professors` (string array): A list of professors offering the course in form of prof_id.
- **Data Source**: Scraping/ Unofficial Spire API.

### 3. Professor Data

- **Description**: Contains information about professors teaching at UMass.
- **Attributes**:
  - `prof_id` (string): A unique identifier for each professor.
  - `name` (string): The professor's name.
  - `rating` (float): The professor's rating.
- **Data Source**: Scraping of RateMyTeacher.

### 4. User Course Data

- **Description**: Courses that the user wishes to take, represented by a graph.
- **Attributes**:
  - `courses` (string[][] array): All courses marked with interest in form of course_id, organized by semester.
- **Data Source**: User input.

## Data Relationships

- **User to User Course Data**: One-to-one relationship
- **Course Data to Professor Data**: One-to-many relationship
- **User Course Data to Course Data**: One-to-many relationship

## Data Sources

- **User-Input Data**: User input is responsible for some data in the user profile, and user course data.
- **System-Generated Data**: Unique identifiers will be system generated.
- **Scraped Data**: Information on professors and courses will be scraped from Spire and RateMyTeacher.
