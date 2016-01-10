jQuery(function($){

  var rsvps = Bacon.fromBinder(function(sink) {
    must.Rsvps(sink);
    return $.noop;
  });

  /* Available Streams

  See http://www.meetup.com/meetup_api/docs/stream/2/rsvps for docs
  var comments = Bacon.fromBinder(function(sink) {
    must.Comments(sink);
    return $.noop;
  });

  var photos = Bacon.fromBinder(function(sink) {
    must.Photos(sink);
    return $.noop;
  });

  var checkins = Bacon.fromBinder(function() {
    must.Checkins(sink);
    return $.noop;
  });
  */

  var circles = Map.svg.selectAll("circle");
  var data = [];

  var draw = function(data){
    circles.data(data).enter().append("circle")
      .attr("cy", function(d){ return d[1] })
      .attr("cx", function(d) { return d[0] })
      .style("fill", "red")
      .attr("r", 3)
  };

  rsvps.filter(function(rsvp){
    return rsvp.group.country != "us";
  }).map(function(rsvp){
    console.log(rsvp.group);
    return [rsvp.group.group_lon, rsvp.group.group_lat];
    // Map.projection is a function that translates (lat,long) pairs into (x,y) pixels
  }).map(Map, "projection")
    .onValue(function(value){
    data.push(value);
    draw(data);
  });

});