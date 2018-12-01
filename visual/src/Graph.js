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
              .linkDistance(100)
              .charge(-500)
              .on("tick", tick)
              .start()

  var drag = force.drag()
             .on("dragstart", dragstart);

  var path = select(node).append('g').selectAll('path')
              .data(force.links())
              .enter()
              .append('path')
              .attr('fill','none')
              .attr('stroke','#666')
              .attr('stroke-width', '1.5px')




  var circles = select(node).append('g').selectAll('circle')
               .data(force.nodes())
               .enter()
               .append('circle')
               .attr("r",function(d){
                 if(d.node>2000) return 20;
                 if(d.node>1000) return 15;
                 if(d.node>500)  return 10;
                 return 5;
               })
              .on("mouseover", function(d){

              text_element.attr('x',d.x+30)
                          .attr('y',d.y)
                          .attr('opacity','1')
                          .style("text-anchor","middle")
                          .text(d.node)
              var bbox = text_element.node().getBBox();
              rectangle.attr('x',bbox.x-2.5)
                       .attr('y',bbox.y-5)
                       .attr("width", bbox.width+10)
                       .attr("height", bbox.height+10)
                       .attr('opacity','1')
                       .attr("rx", 5)         // set the x corner curve radius
                       .attr("ry", 5)       // set the y corner curve radius
                       .style("fill", "lightsteelblue")
                       .style("fill-opacity", ".8")
                       .style("stroke", "#666")
                        .style("stroke-width", "1.5px")

              })
              .on("mouseout", function(d){
                text_element.attr('opacity','0')
                rectangle.attr('opacity','0')
              })

       var rectangle = select(node).append('rect')
                        .attr('opacity','0')
      var text_element = select(node).append('text')
                        .attr('opacity','0')

               /*.on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0)
                        .text(d.node)
                        .attr('x', 8)
                        .attr('y', '.91em')
                })*/




  /*var text =   select(node).append('g').selectAll('text')
                .data(force.nodes())
                .enter()
                .append('text')
                .attr('x', 8)
                .attr('y', '.91em')
                .attr("opacity", "0")
                .text(function(d) { return d.node; });*/


    d3.selectAll('circle').call(drag);


       function dragstart(d) {
         d.fixed = true;
        }
       function tick() {
         path.attr("d", linkArc);
         circles.attr("transform", transform);
        // text.attr("transform", transform);
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
