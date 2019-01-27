var svgWidth = 960;
var svgHeight = 600;

var margin = {
    top: 50,
    right: 40,
    bottom: 90,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Initialize default axis Parameters
var chosenXAxis = "poverty";
var chosenYAxis = "obesity"

d3.csv("assets/data/data.csv")
  .then(function(data) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.abbr = data.abbr;
      data.state = data.state;
      console.log(data.healthcare);
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".8")
  


    var gdots =  chartGroup.selectAll("g.dot")
            .data(data)
            .enter().append('g');

    gdots.append("circle")
            .attr("class", "dot")
            .attr("r", function (d) {
                return d.r;
            })
            .attr("cx", function (d) {
                return x(d.xLinearScale);
            })
            .attr("cy", function (d) {
                return y(d.yLinearScale);
            })
            .style("fill", function (d) {
                return d.c;
            });
            
    gdots.append("text").text(function(d){
                return d.abbr;
            })
            .attr("x", function (d) {
                return x(d.xLinearScale);
            })
            .attr("y", function (d) {
                return y(d.yLinearScale);
            });

    // Step 6: Initialize tool tip
    // ==============================
  //  var toolTip = d3.tip()
    //  .attr("class", "tooltip")
     // .offset([25, 0])
     // .html(function(d) {
     //   return (`${d.abbr}`);
     // });

    // Step 7: Create tooltip in the chart
    // ==============================
    // chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    //circlesGroup.on("click", function(data) {
    //  toolTip.show(data, this);
   // })
      // onmouseout event
      //.on("mouseout", function(data, index) {
      //  toolTip.hide(data);
     // });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top })`)
      .attr("class", "axisText")
      .text("Poverty (%)");
  });

