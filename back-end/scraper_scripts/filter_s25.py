import json

# Load the JSON file with course data
with open('formatted_courses.json', 'r') as file:
    courses = json.load(file)

# Load the JSON file with course IDs
with open('course_id_s25.json', 'r') as file:
    allowed_course_ids = [course_id.strip() for course_id in json.load(file)['courses']]

# Filter the courses based on the allowed course IDs
filtered_courses = [course for course in courses if course['course_id'] in allowed_course_ids]

# Write the filtered courses to a new JSON file
with open('filtered_s25_courses.json', 'w') as file:
    json.dump(filtered_courses, file, indent=2)

print("Filtered courses have been exported to filtered_courses.json")
