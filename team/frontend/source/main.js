let g = new dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(function() {return {};});

g.setNode("cs101", {label: "Introduction to Programming", width: 200, height:150});
g.setNode("cs201", {label: "Data Structures and Algorithms", width: 200, height:150});
g.setNode("cs230", {label: "Computer Systems Principles", width: 200, height:150});
g.setNode("cs326", {label: "Web Programming", width: 200, height:150});
g.setNode("math210", {label: "Discrete Mathematics", width: 200, height:150});
g.setNode("cs410", {label: "Artificial Intelligence", width: 200, height:150});
g.setNode("cs320", {label: "Operating Systems", width: 200, height:150});
g.setNode("cs240", {label: "Reasoning Under Certainty", width: 200, height:150});
g.setNode("cs450", {label: "Introduction to Machine Learning", width: 200, height:150});
g.setNode("cs370", {label: "Computer Networks", width: 200, height:150});

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

let render = new dagreD3.render();
let svg = d3.select("svg"), svgGroup = svg.append(g);

render(d3.select("svg g"),g)

var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);
