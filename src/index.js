import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
const appController = new AppControllerComponent();
const appContainer = document.getElementById("app");
appContainer.appendChild(appController.render());

let classList = await fetch("./sample.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP Error`);
    }
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    throw new Error("Error obtaining json file", error);
  });

let g = new dagreD3.graphlib.Graph()
  .setGraph({})
  .setDefaultEdgeLabel(function () {
    return {};
  });

// Add nodes to the graph
classList.forEach((e) => {
  let name = e.course_id + "\n" + e.name;

  g.setNode(e.course_id, {
    label: name,
    height: 80,
    width: 200,
    style: "node node:hover",
    courseData: e,
  });
});

classList.forEach((e) => {
  if (e.prerequisites.length > 0) {
    e.prerequisites.forEach((classes) => {
      g.setEdge(classes, e.course_id);
    });
  }
});

g.nodes().forEach(function (v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 25;
});

// Layout the graph
const render = new dagreD3.render();
const svg = d3.select("svg");
const inner = svg.append("g");

inner.selectAll("g.node").attr("id", (d) => d);

// Render the graph into the SVG
render(inner, g);

d3.selectAll("g.node")
  .style("cursor", "pointer")
  .on("click", (event, d) => {
    // Updated event handler signature
    // Get the clicked element
    const clickedElement = d3.select(event.currentTarget);
    // Extract the node id from the element
    console.log("extracting");
    const input = clickedElement.select("text").text();
    const match = input.match(/^[A-Za-z]*\d+/); // Matches from start to the last digit
    const nodeId = match ? match[0] : null;
    console.log(nodeId);
    // Get the node data using the extracted id
    const nodeData = g.node(nodeId);
    // Call showCourseDetails with the stored course data
    if (nodeData && nodeData.courseData) {
      showCourseDetails(nodeData.courseData);
    }
  });

function showCourseDetails(course) {
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

// function redirectUrl()
// svg.selectAll("g.node").on("click", redirectUrl);

let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40).attr("width", g.graph().width + 1000);
