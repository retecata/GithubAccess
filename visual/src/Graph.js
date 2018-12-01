import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3';
import { select } from 'd3-selection'

class Graph extends Component{
  constructor(props){
    super(props)
    this.createGraph = this.createGraph.bind(this)
  }
  componentDidMount(){
    this.createGraph()
  }
  componentDidUpdate(){
    this.createGraph()
  }

  createGraph(){
    const node = this.node
    var width =460;
    var height = 400;
    const {data} = this.props
    var nodes = [];
    for (var i = 0; i < data.length; i++) {
         nodes[i] = {node:data[i]};
    }

    var links = [];
    for ( i = 1;i<data.length;i++){
      links[i-1] ={source:0,target:i};
    }

    console.log(links)

   /*var simulation = d3.forceSimulation(nodes)
          .force('charge', d3.forceManyBody().strength(-100))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('link', d3.forceLink().links(links));
    /*var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));*/

    var force = d3.layout.force()
              .nodes(d3.values(nodes))
              .links(links)
              .size([width, height])
              .linkDistance(60)
              .charge(-300)
              .on("tick", tick)
              .start()

  var drag = force.drag()
             .on("dragstart", dragstart);

   select(node)
      .selectAll('path')
      .data(force.links())
      .enter()
      .append('path')
      .attr('fill','none')
      .attr('stroke','#666')
      .attr('stroke-width', '1.5px')

    select(node)
       .selectAll('circle')
       .data(force.nodes())
       .enter()
       .append('circle')
       .attr("r", 12)

    d3.selectAll('circle').call(drag);

       function dragstart(d) {
         d.fixed = true;
        }
       function tick() {
         select(node)
            .selectAll('path')
            .data(force.links())
            .attr("d", linkArc)

         select(node)
            .selectAll('circle')
            .data(force.nodes())
            .attr("transform", transform);
        }

       function linkArc(d) {
         var dx = d.target.x - d.source.x,
             dy = d.target.y - d.source.y,
             dr = Math.sqrt(dx * dx + dy * dy);
         return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
       }

         function transform(d) {
           return "translate(" + d.x + "," + d.y + ")";
         }
     }
  render() {
        console.log(this.props.data)
        return <svg ref={node => this.node = node}
        width={window.innerWidth} height={window.innerHeight}>
        </svg>
     }
}
export default Graph
