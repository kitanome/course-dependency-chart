import { FilterComponent } from "./src/components/FilterComponent/FilterComponent";
import { GraphComponent } from "./src/components/GraphComponent/GraphComponent";

const app = document.getElementById("app");

const filter = new FilterComponent();
const graph = new GraphComponent();

app.appendChild(filter.render());
app.appendChild(graph.render());