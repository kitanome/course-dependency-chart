let g = new dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(function() {return {};});

g.setNode("cs101", {label: "CS101", width: 200, height:150});
g.setNode("cs201", {label: "CS201", width: 200, height:150});
g.setNode("cs230", {label: "CS230", width: 200, height:150});
g.setNode("cs326", {label: "CS236", width: 200, height:150});
g.setNode("math210", {label: "MATH210", width: 200, height:150});
g.setNode("cs410", {label: "CS410", width: 200, height:150});
g.setNode("cs320", {label: "CS320", width: 200, height:150});
g.setNode("cs240", {label: "CS240", width: 200, height:150});
g.setNode("cs450", {label: "CS450", width: 200, height:150});
g.setNode("cs370", {label: "CS370", width: 200, height:150});

g.setEdge("cs101","cs201");
g.setEdge("cs101","cs230");
g.setEdge("cs201","cs326");

g.setEdge("cs201","cs410");
g.setEdge("math210","cs410");

g.setEdge("cs201","cs320");
g.setEdge("cs230","cs320");

g.setEdge("cs201","cs240");

g.setEdge("cs410","cs450");
g.setEdge("math210","cs450");

g.setEdge("cs230","cs370");

let cy = cytoscape({
    container: document.getElementById('cy')
})

dagre.layout(g).run();