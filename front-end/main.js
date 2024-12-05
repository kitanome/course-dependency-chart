import { FilterComponent } from "./src/components/FilterComponent/FilterComponent.js";
import { GraphComponent } from "./src/components/GraphComponent/GraphComponent.js";

const app = document.getElementById("app");

const filter = new FilterComponent();
const graph = new GraphComponent();

app.appendChild(filter.render());
app.appendChild(graph.render());