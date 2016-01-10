var Map = (function(){
    // Map Projection example from http://bl.ocks.org/mbostock/4090848

    var width = 960,
      height = 500;

    var projection = d3.geo.albers()
        .rotate([96, 0])
        .center([-.6, 38.7])
        .parallels([29.5, 45.5])
        .scale(1070)
        .translate([width / 2, height / 2])
        .precision(.1);

    var path = d3.geo.path()
        .projection(projection);

    var graticule = d3.geo.graticule()
        .extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
        .step([5, 5]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

      svg.insert("path", ".graticule")
          .datum(topojson.feature(usTopo, usTopo.objects.land))
          .attr("class", "land")
          .attr("d", path);

      svg.insert("path", ".graticule")
          .datum(topojson.mesh(usTopo, usTopo.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
          .attr("class", "county-boundary")
          .attr("d", path);

      svg.insert("path", ".graticule")
          .datum(topojson.mesh(usTopo, usTopo.objects.states, function(a, b) { return a !== b; }))
          .attr("class", "state-boundary")
          .attr("d", path);

    d3.select(self.frameElement).style("height", height + "px");

    return {
      projection: projection,
      width: width,
      height: height,
      path: path,
      svg: svg
    };
})();