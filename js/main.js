/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE 
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.
**/

/**
Global variables
**/
var xLabel, yLabel;

/**
This function is passed the variables to initially draw graph
**/

function draw(){	
	
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 550 - margin.top - margin.bottom;
	
	var x = d3.scale.linear()
	    .range([0, width]);
		
	var y = d3.scale.linear()
		.range([height,0]);
		
	var color = d3.scale.category10();
		
	var	xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom")
			.ticks(10,"");

	var	yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
			.ticks(10,"");
	
	var canvas = d3.select('#vis')
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				/**.style("background-color", "gray")**/
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	d3.csv("data/data.csv", function(error, data) {
		data.forEach(function(d) {
			d.kernelLength = +d[xLabel];
			d.kernelWidth = +d[yLabel];
		});	
		
	    x.domain(d3.extent(data, function(d) { return d[xLabel]; })).nice();
	    y.domain(d3.extent(data, function(d) { return d[yLabel]; })).nice();
				
		canvas.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text(xLabel);

		canvas.append("g")
			.attr("class", "y axis")
				.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text(yLabel);
			
		 canvas.selectAll(".dot")
		    .data(data)
		    .enter().append("circle")
		    .attr("class", "dot")
		    .attr("r", 3.5)
		    .attr("cx", function(d) { return x(d.kernelLength); })
		    .attr("cy", function(d) { return y(d.kernelWidth); })
		    .style("fill", function(d) { return color(d.variety); });
			
		 var legend = canvas.selectAll(".legend")
		    .data(color.domain())
		    .enter().append("g")
		    .attr("class", "legend")
		    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		 legend.append("rect")
		    .attr("x", width - 18)
		    .attr("width", 18)
		    .attr("height", 18)
		    .style("fill", color);

		 legend.append("text")
		    .attr("x", width - 24)
		    .attr("y", 9)
		    .attr("dy", ".35em")
		    .style("text-anchor", "end")
		    .text(function(d) { return d; });
		
	});	
	
}

/**
var text = function(d){
	d.compactness = +d.compactness;
}
**/
/**
This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxis, yAxis){
	xLabel = xAxis;
	yLabel = yAxis;
	draw();
	
}

/**
## onXAxisChange(value)
This function is called whenever the menu for the variable to display on the
x axis changes. It is passed the variable name that has been selected, such as
"compactness". Populate this function to update the scatterplot accordingly.
**/
function onXAxisChange(value){
	d3.select("svg").remove();
	xLabel = value;
	draw();
}

/**
## onYAxisChange(value)
This function is called whenever the menu for the variable to display on the
y axis changes. It is passed the variable name that has been selected, such as
"Asymmetry Coefficient". Populate this function to update the scatterplot 
accordingly.
**/
function onYAxisChange(value){
	d3.select("svg").remove();
	yLabel = value;
	draw();
}

/**
## showDetails(string)
This function will display details in the "details" box on the page. Pass in 
a string and it will be displayed. For example, 
    showDetails("Variety: " + item.variety);
**/
function showDetails(string){
    d3.select('#details').html(string);
}
