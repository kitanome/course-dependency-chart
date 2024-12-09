import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
export class GraphComponent extends BaseComponent{
    #container = null;
    #graph = null;

    constructor() {
        super();
        this.loadCSS('GraphComponent');
    }
    
    
    render(){
        if (this.#container){
            return this.#container;
        }
        this.#createContainer(); 
        // this.#attachEventListeners();

        return this.#container;
    }

    
    #createContainer(){
        this.#container = document.createElement('div');
        this.#container.classList.add("graph-component");
        this.#container.innerHTML = this.#getTemplate();
    }

    #getTemplate(){
        return `
        <svg id="graph" width="1920" height="1080"><g/></svg>
        `;
    }
    
    async #getClassData(){
        let link = './src/sample.json';
        let promiseResult = await fetch(link)
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

        return promiseResult;
    }

    #attachEventListeners(){
        //subscribe the nodes to a 'filter' event
        const hub = EventHub.getInstance();
        hub.subscribe('filter',term => this.#handleFilter(term));

        //publish a 'courseSelect' event when a node is clicked
        d3.selectAll("g.node")
        .style("cursor", "pointer")
        .on("click", (event, d) => {
            // Updated event handler signature
            // Get the clicked element
            this.#handleSelect(event);
        });
    }

    #handleFilter(term){
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

    #handleSelect(event){
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
            this.#publishNewTask('courseSelect',nodeData.courseData);
            }
    }

    #publishNewTask(task,course){
        const hub = EventHub.getInstance();
        hub.publish(task,course)
    }
    
    async generateGraph(){
        let classList = await this.#getClassData();
        this.#graph = new dagreD3.graphlib.Graph()
        .setGraph({})
        .setDefaultEdgeLabel(function () {
        return {};
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
              this.#graph.setEdge(classes, e.course_id);
            });
          }
        });
        
        this.#graph.nodes().forEach((v)=>{
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

        let xCenterOffset = (svg.attr("width") - this.#graph.graph().width) / 2;
        inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
        svg.attr("height", this.#graph.graph().height + 40).attr("width", this.#graph.graph().width + 1000);
        this.#attachEventListeners();
    }

}