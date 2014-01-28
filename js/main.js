/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE 
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.
This function is passed the variables to initially draw on the x and y axes.
**/

var data,svg,x,y;

//Text to be displayed for the x and y axis
var xAxis_label,yAxis_label;


xAxis_label="Kernel Length";
yAxis_label="Kernel Width";

function draw(){

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    	width = 960 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
    	.range([0,width]);

	var y = d3.scale.linear()
    	.range([height, 0]);

	var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("bottom")
    	.ticks(10,"");

	var yAxis = d3.svg.axis()
    	.scale(y)
    	.orient("left")
    	.ticks(10, "%");

	var svg = d3.select("#vis").append("svg")
   		.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
        .append("text")
       	.attr("class", "label")
       	.attr("x", width)
       	.attr("y", -6)
       	.style("text-anchor", "end")
       	.text(xAxis_label);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yAxis_label);
}


var text= function(d){
		d.compactness = + d.compactness;
	};

function init(xAxis, yAxis){
	d3.csv("data/data.csv", text, function(error, data) {
  		console.log(data.csv);
  		data=data;
  		x.domain(data.map(function(d) { return d.letter; }));
  		y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
  	});
	draw();
}

/**
## onXAxisChange(value)
This function is called whenever the menu for the variable to display on the
x axis changes. It is passed the variable name that has been selected, such as
"compactness". Populate this function to update the scatterplot accordingly.
**/

function onXAxisChange(value){
	d3.select('svg').remove();
	xAxis_label=value;
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
	d3.select('svg').remove();
	yAxis_label=value;
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
