import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { SidebarComponent } from "./components/SidebarComponent/SidebarComponent.js";

const appController = new AppControllerComponent();
const appContainer = document.getElementById("app");

// Initialize sidebar
const sidebar = new SidebarComponent();

/*
Render components.
*/
appContainer.appendChild(appController.render());
document.body.appendChild(sidebar.render());


/* obtains the classList as a list of Objects.
* each class has the object format:
class {
  'course_id' : String,
  'name' : String,
  'description' : String,
  'prerequisites' : [String], // list of course_id
  'corequisites' : [String] // list of course_id
  'credits' : number,
  'professors' : [String] . // list of prof_id
}
*/

let classList = await fetch("./components/GraphComponent/sample.json")
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



/*Create a new graph layout. */

let g = new dagreD3.graphlib.Graph()
  .setGraph({})
  .setDefaultEdgeLabel(function () {
    return {};
  });

// Add nodes to the graph, and connect them to prerequisites.
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


/*
This is a very makeshift attempt at a event handler.
! Current problem is that I cannot access the bind data by clicking on the node so I have to infer the content from the label.
 */
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
      sidebar.showCourseDetails(nodeData.courseData);
    }
  });


/*
! Right now the code is taking professors name as plain text and not by prof_id as proposed in data.md. Need discussion on how to proceed.
*/


// Function now in SidebarComponent.js

/*
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
*/

// function redirectUrl()
// svg.selectAll("g.node").on("click", redirectUrl);

let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40).attr("width", g.graph().width + 1000);
