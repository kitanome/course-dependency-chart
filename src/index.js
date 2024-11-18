
import { AppControllerComponent } from './components/AppControllerComponent/AppControllerComponent.js';

const appController = new AppControllerComponent();
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());

let classList = await fetch('./sample.json')
.then((res)=>{
    if (!res.ok){
        throw new Error(`HTTP Error`);
    }
    return res.json();
})
.then((data)=>{return data})
.catch((error)=>{throw new Error("Error obtaining json file",error)});

let g = new dagreD3.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(function() {return {};});


// g.setNode("cs101", {label: "CS101", width: 100, height:100, style: "node"});
// g.setNode("cs201", {label: "CS201", width: 100, height:100, style: "node"});
// g.setNode("cs230", {label: "CS230", width: 100, height:100, style: "node"});
// g.setNode("cs326", {label: "CS236", width: 100, height:100, style: "node"});
// g.setNode("math210", {label: "MATH210", width: 100, height:100, style: "node"});
// g.setNode("cs410", {label: "CS410", width: 100, height:100, style: "node"});
// g.setNode("cs320", {label: "CS320", width: 100, height:100, style: "node"});
// g.setNode("cs240", {label: "CS240", width: 100, height:100, style: "node"});
// g.setNode("cs450", {label: "CS450", width: 100, height:100, style: "node"});
// g.setNode("cs370", {label: "CS370", width: 100, height:100, style: "node"});

// g.setEdge("cs101","cs201");
// g.setEdge("cs101","cs230");
// g.setEdge("cs201","cs326");

// g.setEdge("cs201","cs410");
// g.setEdge("math210","cs410");

// g.setEdge("cs201","cs320");
// g.setEdge("cs230","cs320");

// g.setEdge("cs201","cs240");

// g.setEdge("cs410","cs450");
// g.setEdge("math210","cs450");

// g.setEdge("cs230","cs370");

classList.forEach((e)=>
    {   
        let name = e.course_id+"\n"+e.name;
        name.replace(e.course_id,'<b>'+e.course_id+'</b>');
        g.setNode(e.course_id,{label:name,height:80,width:200,style:"node node:hover"});
    }
);

classList.forEach((e)=>
    {   
        if (e.prerequisites.length > 0) e.prerequisites.forEach((classes)=>
        {
            g.setEdge(classes,e.course_id);
        })
    }
);

g.nodes().forEach(function(v) {
    var node = g.node(v);
    // Round the corners of the nodes
    node.rx = node.ry = 25;
  });

let render = new dagreD3.render();
let svg = d3.select("svg"),svgGroup = svg.append("g");
d3.select("svg g").call(render,g);

// function redirectUrl()
// svg.selectAll("g.node").on("click", redirectUrl);

let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);

