import { FilterComponent } from "./components/FilterComponent/FilterComponent.js";
import { GraphComponent } from "./components/GraphComponent/GraphComponent.js";

const app = document.getElementById("app");

const filter = new FilterComponent();
const graph = new GraphComponent();

app.appendChild(filter.render());
app.appendChild(graph.render());
graph.generateGraph();

