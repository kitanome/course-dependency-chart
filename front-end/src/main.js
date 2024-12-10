console.log("main.js is loading");

import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { SidebarComponent } from "./components/SidebarComponent/SidebarComponent.js";
import { FilterComponent } from "./components/FilterComponent/FilterComponent.js";
import { GraphComponent } from "./components/GraphComponent/GraphComponent.js";
import { LoginComponent } from "./components/LoginComponent/LoginComponent.js";

// Wait for DOM to be fully loaded
const loginComponent = new LoginComponent();
loginComponent.handlePersistence();
document.body.appendChild(loginComponent.render());

const app = new AppControllerComponent();
document.body.appendChild(app.render());

// const app = document.getElementById("app");

// const filter = new FilterComponent();
// const graph = new GraphComponent();
// const sidebar = new SidebarComponent();

// app.appendChild(filter.render());
// // ERROR: Double graph render
// app.appendChild(graph.render());
// graph.generateGraph();

// app.appendChild(sidebar.render());

