import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
export class GraphComponent extends BaseComponent {
  #container = null;
  #graph = null;

  constructor(graphData = {}) {
    super();
    this.graphData = graphData;
    this.loadCSS("GraphComponent");
  }

  render() {
    if (this.#container) {
      return this.#container;
    }
    this.#createContainer();
    // this.#attachEventListeners();

    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("graph-component");
    this.#container.id = "graph-component";
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    return `
        <svg id="graph" width="1920" height="1080"><g/></svg>
        `;
  }

  async getClassData() {
    let link = "http://localhost:3000/api/courses";
    try {
      console.log("Fetching course data...");
      let response = await fetch(link, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching course data:", error);
      throw new Error("Error fetching course data", error);
    }
  }

  #attachEventListeners() {
    //subscribe the nodes to a 'filter' event
    const hub = EventHub.getInstance();
    hub.subscribe("filter", (term) => this.#handleFilter(term));

    //publish a 'courseSelect' event when a node is clicked
    d3.selectAll("g.node")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        // Updated event handler signature
        // Get the clicked element
        this.#handleSelect(event);
      });
  }

  async generateGraph(classData=null) {
    let classList = classData ? classData : await this.getClassData();
    classList.sort((a, b) => a.course_id.localeCompare(b.course_id)); // Sort by course ID
    const IDList = classList.map((course) => course.course_id);

    //convert names to set to remove duplicates
    const uniqueIDList = new Set(IDList);

    this.#graph = new dagreD3.graphlib.Graph()
      .setGraph({
        edgesep: 70,
        ranksep: 150,
        nodesep: 10,
        rankdir: "TB",
        ranker: "longest-path",
      })
      .setDefaultEdgeLabel(function () {
        return {};
      });
    // Add nodes to the graph, and connect them to prerequisites.

    classList.forEach((e) => {
      if (uniqueIDList.has(e.course_id)) {
        let name = e.course_id + "\n" + this.#wrapText(e.name, 20);

        this.#graph.setNode(e.course_id, {
          label: name,
          height: 90,
          width: 120,
          style: "node node:hover",
          courseData: e,
        });
      }
    });

    classList.forEach((e) => {
      if (e.prerequisites.length > 0) {
        e.prerequisites.forEach((prereq) => {
          if (!uniqueIDList.has(prereq)) {
            // Skip if the prereq is not in the known courses list
            return;
          }
          this.#graph.setEdge(prereq, e.course_id);
        });
      }
    });

    this.#graph.nodes().forEach((v) => {
      var node = this.#graph.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 25;
    });

    // Layout the graph
    const render = new dagreD3.render();

    const svg = d3.select("#graph");
    const inner = svg.append("g");

    inner.selectAll("g.node").attr("id", (d) => d);

    // Render the graph into the SVG
    render(inner, this.#graph);

    //Style the edges to be more transparent and not clogging up the page
    inner
      .selectAll(".edgePath path")
      .style("stroke", "rgba(0, 0, 0, 0.1)") // Adjust the RGBA value to control transparency
      .style("stroke-width", "2px");

    let xCenterOffset = 200;
    let yCenterOffset = 100;
    inner.attr(
      "transform",
      "translate(" + xCenterOffset + ", " + yCenterOffset + ")"
    );

    svg
      .attr("height", this.#graph.graph().height + 2 * yCenterOffset)
      .attr("width", this.#graph.graph().width + 2 * xCenterOffset);

    // Scroll to the center of the graph to display the CS110 course when page loads
    const graphContainer = document.getElementById("graph-component");
    graphContainer.scrollTo({
      left: (graphContainer.scrollWidth - graphContainer.clientWidth) / 2,
    });


    this.#attachEventListeners();
  }

  #handleFilter(term) {
    let svg = document.getElementById("graph");
    const textNodes = svg.querySelectorAll("text");
    textNodes.forEach((text) => {
      console.log(text.textContent);
      if (text.textContent.toLowerCase().includes(term.toLowerCase()) && term) {
        // Highlight matching text
        text.setAttribute("fill", "yellow"); // Change text color
        text.setAttribute("stroke", "yellow"); // Add an outline
        console.log(text);
      } else {
        // Reset styling for non-matching text
        text.setAttribute("fill", "black"); // Default text color
        text.setAttribute("stroke", "none"); // Remove outline
      }
    });
  }

  #handleSelect(event) {
    const clickedElement = d3.select(event.currentTarget);
    // Extract the node id from the element
    console.log("extracting");
    const input = clickedElement.select("text").text();
    console.log(input);
    const match = input.match(/^\S+\s\d+/); // Matches from start to the last digit
    console.log(match);
    const nodeId = match ? match[0] : null;
    console.log(nodeId);
    // Get the node data using the extracted id
    const nodeData = this.#graph.node(nodeId);
    // Call showCourseDetails with the stored course data
    if (nodeData && nodeData.courseData) {
      this.#publishNewTask("courseSelect", nodeData.courseData);
    }
  }

  #publishNewTask(task, course) {
    const hub = EventHub.getInstance();
    hub.publish(task, course);
  }

  #wrapText(text, maxLength) {
    let result = "";
    let lineLength = 0;

    text.split(" ").forEach((word) => {
      if (lineLength + word.length + 1 > maxLength) {
        result += "\n";
        lineLength = 0;
      }
      result += (lineLength === 0 ? "" : " ") + word;
      lineLength += word.length + 1;
    });

    return result;
  }
}
