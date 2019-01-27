



var width = 500;
var height = 500;

var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var minX = _(data).orderBy('x').first().x;
var maxX = _(data).orderBy('x').last().x;

x.domain([minX - 500, maxX + 500]);
y.domain([0, 100]);

var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

var svg = d3
        .select("#d3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + 0 + "," + height / 2 + ")")
        .call(xAxis);

svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width / 2 + "," + 0 + ")")
        .call(yAxis)
        .append("text");

svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) {
            return d.r;
        })
        .attr("cx", function (d) {
            return x(d.x);
        })
        .attr("cy", function (d) {
            return y(d.y);
        })
        .style("fill", function (d) {
            return d.c;
        });
