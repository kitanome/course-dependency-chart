import json
import re

def parse_markdown_courses(markdown_file):
    """
    Parse a markdown file containing course information.
    """
    courses = {}

    with open(markdown_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split the content into individual course blocks
    course_blocks = re.split(r'\n\n', content)

    for block in course_blocks:
        # Skip empty blocks
        if not block.strip():
            continue

        # Extract course code and name
        course_header = re.match(r'^([A-Z]+ \d+):\s*(.+)$', block, re.MULTILINE)
        if not course_header:
            continue

        course_id = course_header.group(1)
        name = course_header.group(2).strip()

        # Extract instructor(s)
        instructor_match = re.search(r'Instructor\(s\):\s*(.+?)(?:\n|$)', block)
        instructors = instructor_match.group(1).strip() if instructor_match else None

        # Improved description extraction
        # Extract everything between instructor line and prerequisites or credits
        desc_match = re.search(r'Instructor\(s\):.*\n(.*?)(?:\n*Prerequisite|(\d+)\s*credits\.)', block, re.DOTALL)

        if desc_match:
            # If first group (before prerequisites) exists, use it
            description = desc_match.group(1).strip().replace('\n', ' ') if desc_match.group(1) else None
        else:
            # Fallback if no match
            description = None

        # Extract credits
        credits_match = re.search(r'(\d+(?:\.\d+)?)\s*credits?\.', block)
        credits = float(credits_match.group(1)) if credits_match else None

        # Extract prerequisites (if available)
        prereq_match = re.search(r'Prerequisite\(s\):\s*(.+?)(?:\n|$)', block)
        prerequisites = []
        if prereq_match:
            # Get the full prerequisite text
            prereq_text = prereq_match.group(1).strip()

            # More comprehensive parsing of prerequisites
            # Remove 'with a grade of C or better'
            prereq_text = re.sub(r'with a grade of [A-Z]+ or better', '', prereq_text, flags=re.IGNORECASE)

            # Split prerequisites, handling various separators
            prerequisites = [p.strip() for p in re.split(r'[,;]\s*|\s+or\s+|\s+and\s+', prereq_text) if p.strip()]

        courses[course_id] = {
            'course_id': course_id,
            'name': name,
            'description': description,
            'credits': credits,
            'prerequisites': prerequisites,
            'instructors': instructors
        }

    return courses

def merge_course_data(markdown_file, json_file, output_file):
    """
    Merge course data from markdown and existing JSON files.
    Only include courses from the Markdown file.
    Merge prerequisites from both sources.
    """
    # Parse markdown courses
    markdown_courses = parse_markdown_courses(markdown_file)

    # Read existing JSON data
    with open(json_file, 'r', encoding='utf-8') as f:
        json_courses = json.load(f)

    # Merge data
    updated_courses = []

    for course_id, md_course in markdown_courses.items():
        # Find matching course in existing JSON (if exists)
        matching_json_course = next((c for c in json_courses if c.get('course_id') == course_id), None)

        if matching_json_course:
            # Merge prerequisites, removing duplicates while preserving order
            combined_prerequisites = md_course.get('prerequisites', [])
            json_prereqs = matching_json_course.get('prerequisites', [])

            # Add JSON prerequisites that aren't already in MD prerequisites
            for prereq in json_prereqs:
                if prereq not in combined_prerequisites:
                    combined_prerequisites.append(prereq)

            # Merge data, prioritizing Markdown data
            merged_course = {
                'course_id': course_id,
                'name': md_course.get('name', matching_json_course.get('name')),
                'description': md_course.get('description') or matching_json_course.get('description'),
                'credits': md_course.get('credits', matching_json_course.get('credits')),
                'prerequisites': combined_prerequisites,
                'instructors': md_course.get('instructors') or matching_json_course.get('instructors'),
                'comments': []
            }
        else:
            # Use Markdown course data as-is if no matching JSON course
            merged_course = md_course

        def is_likely_description(instructor_text, max_length=100):
            """
            Check if the instructor text is likely a description.
            """
            return instructor_text and len(str(instructor_text)) > max_length

        # Remove instructors if they look like descriptions
        if is_likely_description(merged_course.get('instructors')):
              merged_course['instructors'] = None

        updated_courses.append(merged_course)

    # Write updated data
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(updated_courses, f, indent=4, ensure_ascii=False)

    print(f"Merged course data written to {output_file}")
    print(f"Total courses in output: {len(updated_courses)}")


# Example usage
if __name__ == "__main__":
    merge_course_data('course_description_s25_full.md', 'formatted_courses.json', 'uptodate_courses_s25_only.json')
