import { BaseComponent } from "../BaseComponent/BaseComponent";
export class GraphComponent extends BaseComponent{
    #container = null;
    #graph = null;

    constructor(graphData = {}) {
        super();
        this.graphData = graphData;
        this.loadCSS('GraphComponent');
    }

    
    render(){
        link = "./sample.json";

        this.#createContainer();

        return this.#container;
    }

    #createContainer(){
        this.#container = document.createElement('div');
        this.#container.classList.add("graph-container");
        this.#container.innerHTML = this.#getTemplate();

        this.#graph = new dagreD3.graphlib.Graph()
          .setGraph({})
          .setDefaultEdgeLabel(function () {
            return {};
          });
        this.#generateGraph();
        this.#attachEventListeners();
    }

    #getTemplate(){
        return `
        <svg id="graph" width="1920" height="1080"><g/></svg>
        `
    }

    #attachEventListeners(){
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
            const nodeData = this.#graph.node(nodeId);
            // Call showCourseDetails with the stored course data
            if (nodeData && nodeData.courseData) {
            showCourseDetails(nodeData.courseData);
            }
        });
    }

    async #generateGraph(link){
        let classList = await fetch(link)
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
        
        // Add nodes to the graph, and connect them to prerequisites.
        classList.forEach((e) => {
          let name = e.course_id + "\n" + e.name;
        
          this.#graph.setNode(e.course_id, {
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
        
        this.#graph.nodes().forEach(function (v) {
          var node = this.#graph.node(v);
          // Round the corners of the nodes
          node.rx = node.ry = 25;
        });
        
        // Layout the graph
        const render = new dagreD3.render();
        const svg = d3.select("svg");
        const inner = svg.append("g");
        
        inner.selectAll("g.node").attr("id", (d) => d);
        
        // Render the graph into the SVG
        render(inner, this.#graph);

        let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
        svg.attr("height", g.graph().height + 40).attr("width", g.graph().width + 1000);
        
    }

}