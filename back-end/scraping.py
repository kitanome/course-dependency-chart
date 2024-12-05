import requests
import json
import time
import re

# Fetch JSON from a URL and handle errors


def fetch(url):
    print(f"fetching {url}")
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

# Reformat the JSON data for a course


def reformat_course(data):
    # Safely handle enrollment information, details and units
    enrollment_info = data.get("enrollment_information") or {}
    details = data.get("details") or {}
    units = details.get("units") or {}

    # Get the prerequisites field and default to empty string if not present
    prerequisites = enrollment_info.get("enrollment_requirement", "")

    pattern = r'([A-Z]+ \d{3}[A-Za-z]*)'

    # Find all matches in the prerequisites string
    matches = re.findall(pattern, prerequisites)

    # If no matches, set prerequisites to an empty list
    if matches:
        reformatted_prerequisites = matches
    else:
        reformatted_prerequisites = []

    reformatted = {
        "course_id": data.get("id"),
        "name": data.get("title"),
        "description": data.get("description"),
        "credits": units.get("base", ""),
        "prerequisites": reformatted_prerequisites
    }

    return reformatted

# Fetches initial data and saves results


def main():
    # Fetch the initial data
    url = "https://spire-api.melanson.dev/subjects/?format=json&search=COMPSCI"
    data = fetch(url)
    if not data:
        print("Failed to fetch initial subject data.")
        return

    # Get the course URLs from the JSON
    course_urls = [course["url"]
                   for course in data.get("results", [])[0].get("courses", [])]

    reformatted_courses = []

    # Fetch and reformat data for each course
    for course_url in course_urls:
        try:
            # Fetch course data
            course_data = fetch(course_url)

            if not course_data:
                print(f"Failed to fetch data for course: {course_url}")
                continue

            # Reformat course data
            formatted_course = reformat_course(course_data)
            reformatted_courses.append(formatted_course)

            # Delay so we dont get ratelimited
            time.sleep(0.8)

        except Exception as e:
            print(f"Error processing {course_url}: {e}")

    # Save the reformatted courses to a file
    with open("formatted_courses.json", "w") as file:
        json.dump(reformatted_courses, file, indent=4)

    print("Complete")


if __name__ == "__main__":
    main()
