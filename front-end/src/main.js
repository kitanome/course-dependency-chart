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
async function createGraph() {
  try {
    // Fetch the JSON data for classList
    const courseList = await fetch("./src/filtered_s25_courses.json").then(
      (res) => {
        if (!res.ok) {
          throw new Error("HTTP Error fetching filtered_s25_courses.json");
        }
        return res.json();
      }
    );

    // Fetch the JSON data for classIDList
    const courseIDList = await fetch("./src/course_id_s25.json").then((res) => {
      if (!res.ok) {
        throw new Error("HTTP Error fetching course_id_s25.json");
      }
      return res.json();
    });
    console.log(courseList);

    // Convert classIDList to a Set for efficient lookups
    const courseIDSet = new Set(courseIDList.courses);

    // Create a new graph layout
    const g = new dagreD3.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}));

    // Add nodes to the graph
    const validCourseID = [];
    courseList.forEach((e) => {
      if (courseIDSet.has(e.course_id)) {
        const name = `${e.course_id}\n${e.name}`;
        g.setNode(e.course_id, {
          label: name,
          height: 80,
          width: 200,
          style: "node node:hover",
          courseData: e,
        });
        validCourseID.push(e.course_id);
      }
    });
    const validCourseIDSet = new Set(validCourseID);

    // Add edges to the graph
    courseList.forEach((e) => {
      if (e.prerequisites.length > 0) {
        e.prerequisites.forEach((prereq) => {
          if (validCourseIDSet.has(prereq)) {
            g.setEdge(prereq, e.course_id); //!Issue is creating more nodes over here.
            console.log("1 edge set");
          }
        });
      }
    });

    console.log("Nodes:", g.nodes());

    // Set rounded corners for the nodes
    g.nodes().forEach((v) => {
      const node = g.node(v);
      node.rx = node.ry = 25; // Round the corners
    });

    // Layout the graph using dagreD3
    const render = new dagreD3.render();
    const svg = d3.select("svg");
    const inner = svg.append("g");

    inner.selectAll("g.node").attr("id", (d) => d);

    // Render the graph into the SVG
    render(inner, g);

    // Attach event listeners to nodes
    d3.selectAll("g.node")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        const clickedElement = d3.select(event.currentTarget);
        const input = clickedElement.select("text").text();
        const match = input.match(/^[A-Za-z]* \d+/); // Matches from start to the last digit
        const nodeId = match ? match[0] : null;
        console.log("Node ID:", nodeId);

        const nodeData = g.node(nodeId);
        if (nodeData && nodeData.courseData) {
          sidebar.showCourseDetails(nodeData.courseData);
        }
      });

    // Center the graph in the SVG container
    const xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
    inner.attr("transform", `translate(${xCenterOffset}, 20)`);
    svg
      .attr("height", g.graph().height + 40)
      .attr("width", g.graph().width + 1000);

    console.log("Graph successfully rendered!");
  } catch (error) {
    console.error("Error creating graph:", error.message);
  }
}

// Call the async function
createGraph();
