// Helper function to get course level
function getCourseLevel(courseId) {
  const match = courseId.match(/\d+/);
  if (!match) return 0;
  const number = parseInt(match[0]);
  if (number < 200) return 0;
  if (number < 300) return 1;
  if (number < 330) return 2;
  if (number < 360) return 3;
  if (number < 400) return 4;
  if (number < 430) return 5;
  if (number < 460) return 6;
  return 7;
}

// Create graph layout
function createLayout() {
  const containerWidth = document.getElementById("graph-container").clientWidth;
  const containerHeight =
    document.getElementById("graph-container").clientHeight;
  const levels = [[], [], [], [], [], [], [], []];

  // Group courses by level
  courses.forEach((course) => {
    const level = getCourseLevel(course.course_id);
    levels[level].push(course);
  });

  // Position nodes
  const levelHeight = containerHeight / 7; // Leave some margin
  const positions = new Map();

  levels.forEach((levelCourses, levelIndex) => {
    const courseWidth = 300;
    const totalWidth = levelCourses.length * courseWidth;
    const startX = containerWidth / 10

    levelCourses.forEach((course, courseIndex) => {
      positions.set(course.course_id, {
        x: startX + courseIndex * courseWidth,
        y: levelHeight * (levelIndex + 1),
        width: 180,
        height: 60,
      });
    });
  });

  return positions; // returns a map of index to a {x, y} map
}

// Create course nodes
function createNodes(positions) {
  const container = document.getElementById("graph-container");

  courses.forEach((course) => {
    const pos = positions.get(course.course_id);
    const node = document.createElement("div");
    node.className = "course-node";
    node.id = `node-${course.course_id}`;
    node.innerHTML = `
            <div class="course-id">${course.course_id}</div>
            <div class="course-name">${course.name}</div>
        `;
    node.style.left = `${pos.x}px`;
    node.style.top = `${pos.y}px`;

    node.addEventListener("click", () => showCourseDetails(course));
    container.appendChild(node);
  });
}

// Draw arrows
function drawArrows(positions) {
  const svg = document.getElementById("arrows");

  courses.forEach((course) => {
    const targetPos = positions.get(course.course_id);

    course.prerequisites.forEach((prereqId) => {
      const sourcePos = positions.get(prereqId);
      if (!sourcePos || !targetPos) return;

      // Calculate path
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.classList.add("arrow");

      const sourceX = sourcePos.x + sourcePos.width / 2;
      const sourceY = sourcePos.y + sourcePos.height;
      const targetX = targetPos.x + targetPos.width / 2;
      const targetY = targetPos.y;

      // Create curved path
      const controlPointY = (sourceY + targetY) / 2;
      const d = `M ${sourceX} ${sourceY}
                      C ${sourceX} ${controlPointY},
                        ${targetX} ${controlPointY},
                        ${targetX} ${targetY}`;

      path.setAttribute("d", d);
      svg.appendChild(path);
    });
  });
}

// Show course details in sidebar
function showCourseDetails(course) {
  // Remove previous selection
  document.querySelectorAll(".course-node").forEach((node) => {
    node.classList.remove("selected");
  });

  // Add selection to current node
  document.getElementById(`node-${course.course_id}`).classList.add("selected");

  const prerequisites =
    course.prerequisites.length > 0 ? course.prerequisites.join(", ") : "None";

  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
        <h2>${course.name}</h2>
        <p><strong>Course ID:</strong> ${course.course_id}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Prerequisites:</strong> ${prerequisites}</p>
        <p><strong>Professors:</strong></p>
        <ul>
            ${course.professors.map((prof) => `<li>${prof}</li>`).join("")}
        </ul>
    `;
}

// Initialize the graph
function initializeGraph() {
  const positions = createLayout();
  createNodes(positions);
  drawArrows(positions);
}

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Clear existing graph
    document.querySelectorAll(".course-node").forEach((node) => node.remove());
    document.querySelectorAll(".arrow").forEach((arrow) => arrow.remove());

    // Recreate graph with new dimensions
    initializeGraph();
  }, 250);
});

// Initialize when the page loads
initializeGraph();
