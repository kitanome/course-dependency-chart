import { FilterComponent } from "./components/FilterComponent/FilterComponent.js";
import { GraphComponent } from "./components/GraphComponent/GraphComponent.js";
import { SidebarComponent } from "./components/SidebarComponent/SidebarComponent.js";

const app = document.getElementById("app");

const filter = new FilterComponent();
const graph = new GraphComponent();
const sidebar = new SidebarComponent();

app.appendChild(filter.render());
app.appendChild(graph.render());
graph.generateGraph();

app.appendChild(sidebar.render());

