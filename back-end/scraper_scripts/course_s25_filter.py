import re
import json
import os

print()
with open(os.path.join(os.getcwd(), "course_description_s25_full.md"), "r") as file:
  courses = file.read()

# Extract course IDs with multiple prefixes
course_ids = list(set(re.findall(r'((?:CICS|COMPSCI|INFO) \d+)', courses)))

course_ids.sort()
# Create a dictionary with course IDs
courses_dict = {
    "courses": course_ids
}

# Write to a JSON file
with open('course_id_s25.json', 'w') as file:
    json.dump(courses_dict, file, indent=2)

print("Course IDs have been exported to course_ids.json")
